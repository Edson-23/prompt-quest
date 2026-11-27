import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';
import { readFile } from 'node:fs/promises';

const ids = ['rol', 'contexto', 'objetivo', 'formato', 'restricciones', 'ejemplo'];
const evaluation = {
  criterios: Object.fromEntries(ids.map(id => [id, true])),
  comentarios: Object.fromEntries(ids.map(id => [id, `Cumple ${id}.`])),
  retroalimentacion: 'Has dado instrucciones claras.',
};
const body = { prompt: 'Actúa como chef. Crea un menú semanal en una tabla.', mision: { id: 'menu-semanal' } };
function request(data = body, options = {}) {
  return new Request('https://quest.example/api/evaluar', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.1' },
    body: JSON.stringify(data), ...options,
  });
}
function environment(overrides = {}) {
  return { GEMINI_API_KEY: 'test-only-placeholder', GEMINI_MODEL: 'test-model',
    EVALUATION_LIMITER: { limit: async () => ({ success: true }) }, ...overrides };
}
function upstream(result = evaluation, finishReason = 'STOP') {
  return Response.json({ candidates: [{ finishReason, content: { parts: [{ text: JSON.stringify(result) }] } }] });
}

test('las otras rutas se delegan al binding de assets, incluso sin secretos', async () => {
  for (const path of ['/', '/index.html', '/inexistente', '/api/otra-ruta']) {
    const incoming = new Request(`https://quest.example${path}`);
    const response = await worker.fetch(incoming, { ASSETS: { fetch: async value => {
      assert.equal(value, incoming);
      return new Response('asset', { status: path === '/inexistente' ? 404 : 200 });
    } } });
    assert.equal(await response.text(), 'asset');
    assert.equal(response.status, path === '/inexistente' ? 404 : 200);
  }
});

test('el endpoint permite solo POST', async () => {
  const result = await worker.fetch(new Request('https://quest.example/api/evaluar'), {});
  assert.equal(result.status, 405);
  assert.equal(result.headers.get('Allow'), 'POST');
});

test('valida JSON, tamaño, prompt y misión antes de llamar al proveedor', async t => {
  t.mock.method(globalThis, 'fetch', () => { throw new Error('No debe llamar a Gemini'); });
  for (const prompt of ['', '   ', 'x'.repeat(1501), null, 23]) {
    assert.equal((await worker.fetch(request({ ...body, prompt }), environment())).status, 400);
  }
  assert.equal((await worker.fetch(request(null), environment())).status, 400);
  assert.equal((await worker.fetch(request({ ...body, mision: { id: 'otra' } }), environment())).status, 400);
  assert.equal((await worker.fetch(request(body, { body: '{' }), environment())).status, 400);
  assert.equal((await worker.fetch(request(body, { body: 'x'.repeat(8193) }), environment())).status, 413);
  assert.equal((await worker.fetch(request(body, { headers: { 'Content-Type': 'text/plain' } }), environment())).status, 415);
  assert.equal((await worker.fetch(request(body, { headers: { 'Content-Type': 'application/json', Origin: 'https://otro.example' } }), environment())).status, 403);
});

test('sin clave, modelo o binding responde 503 sin llamar a Gemini', async t => {
  const fetchMock = t.mock.method(globalThis, 'fetch', () => { throw new Error('No debe llamar'); });
  for (const name of ['GEMINI_API_KEY', 'GEMINI_MODEL', 'EVALUATION_LIMITER']) {
    assert.equal((await worker.fetch(request(), environment({ [name]: undefined }))).status, 503);
  }
  assert.equal(fetchMock.mock.callCount(), 0);
});

test('límite de cuota rechaza antes del proveedor', async t => {
  const fetchMock = t.mock.method(globalThis, 'fetch', () => { throw new Error('No debe llamar'); });
  const env = environment({ EVALUATION_LIMITER: { limit: async ({ key }) => {
    assert.equal(key, 'evaluar:192.0.2.1');
    return { success: false };
  } } });
  const response = await worker.fetch(request(), env);
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('Retry-After'), '60');
  assert.equal(fetchMock.mock.callCount(), 0);
});

test('usa clave en header, modelo configurado y encargo de confianza', async t => {
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://generativelanguage.googleapis.com/v1beta/models/test-model:generateContent');
    assert.equal(options.headers['x-goog-api-key'], 'test-only-placeholder');
    const sent = JSON.parse(options.body);
    assert.equal(sent.generationConfig.responseMimeType, 'application/json');
    assert.match(sent.systemInstruction.parts[0].text, /La Esquina/);
    assert.doesNotMatch(sent.systemInstruction.parts[0].text, /ENCARGO MANIPULADO/);
    assert.equal(JSON.parse(sent.contents[0].parts[0].text).prompt, body.prompt);
    return upstream();
  });
  const response = await worker.fetch(request({ ...body, mision: { ...body.mision, encargo: 'ENCARGO MANIPULADO', obligatorios: [] } }), environment());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.deepEqual(await response.json(), evaluation);
});

test('acepta 1500 caracteres y elimina campos ajenos al contrato', async t => {
  t.mock.method(globalThis, 'fetch', async () => upstream({ ...evaluation, extra: 'No reenviar' }));
  const response = await worker.fetch(request({ ...body, prompt: 'x'.repeat(1500) }), environment());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), evaluation);
});

test('errores, JSON inválido, respuestas incompletas y tipos erróneos activan el respaldo', async t => {
  for (const reply of [
    () => new Response('detalle privado del proveedor', { status: 429 }),
    () => upstream({ ...evaluation, criterios: { rol: 'true' } }),
    () => upstream({ ...evaluation, comentarios: {} }),
    () => upstream(evaluation, 'MAX_TOKENS'),
    () => Response.json({ candidates: [] }),
    () => new Response('JSON roto'),
    () => { throw new Error('detalle privado'); },
  ]) {
    const mocked = t.mock.method(globalThis, 'fetch', async () => reply());
    const response = await worker.fetch(request(), environment());
    assert.ok(response.status >= 500);
    assert.doesNotMatch(await response.text(), /privado|test-only-placeholder/);
    mocked.mock.restore();
  }
});

test('aborta una llamada que no responde', async t => {
  const schedule = globalThis.setTimeout;
  t.mock.method(globalThis, 'setTimeout', callback => schedule(callback, 1));
  t.mock.method(globalThis, 'fetch', async (_, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => reject(new Error('timeout')), { once: true });
  }));
  assert.equal((await worker.fetch(request(), environment())).status, 503);
});

test('solo el juego y el personaje se permiten como assets y la API ejecuta el Worker primero', async () => {
  const config = JSON.parse(await readFile(new URL('../wrangler.jsonc', import.meta.url), 'utf8'));
  assert.equal(config.main, 'src/index.js');
  assert.equal(config.assets.directory, '.');
  assert.equal(config.assets.binding, 'ASSETS');
  assert.equal(config.keep_vars, true);
  assert.deepEqual(config.assets.run_worker_first, ['/api/*']);
  const rules = (await readFile(new URL('../.assetsignore', import.meta.url), 'utf8')).split('\n').filter(line => line && !line.startsWith('#'));
  assert.deepEqual(rules, ['*', '!index.html', '!assets/', 'assets/*', '!assets/epson_ia_mapache.png']);
});
