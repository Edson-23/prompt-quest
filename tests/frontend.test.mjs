import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

import { createTestSession } from './helpers/session.mjs';
const html = await readFile(new URL('../index.html',import.meta.url),'utf8');
const sources = await Promise.all(['app','contenido','evaluacion','historia','misiones','portafolio'].map(name => readFile(new URL('../js/'+name+'.js',import.meta.url),'utf8')));
const prompt = 'Actúa como chef. Crea un menú semanal en una tabla.';
const ids = ['rol', 'contexto', 'objetivo', 'formato', 'restricciones', 'ejemplo'];
const data = {
  criterios: Object.fromEntries(ids.map(id => [id, true])),
  comentarios: Object.fromEntries(ids.map(id => [id, 'Buen trabajo.'])),
  retroalimentacion: 'Instrucciones completas.',
};
function setup(fetch, protocol = 'https:', overrides = {}) {
  const session = createTestSession({ fetch, protocol, ...overrides });
  return { run: () => session.evaluate(prompt), context:session.context };
}

test('la sintaxis del juego es válida y no usa almacenamiento persistente', () => {
  assert.match(html, /<script type="module" src="js\/app.js"><\/script>/);
  for (const source of sources) assert.doesNotMatch(source, /localStorage|sessionStorage/);
});

test('archivo local usa reglas sin ninguna llamada de red', async () => {
  const { run } = setup(() => { throw new Error('No debe llamar'); }, 'file:');
  const result = await run();
  assert.equal(result.passed, true);
  assert.equal(result.ai, false);
  assert.match(result.mode, /Simulación/);
});

test('conecta con el endpoint y reutiliza la evaluación en memoria', async () => {
  let calls = 0;
  const { run } = setup(async (url, options) => {
    calls += 1;
    assert.equal(url, '/api/evaluar');
    assert.equal(options.method, 'POST');
    assert.equal(JSON.parse(options.body).mision.id, 'menu-semanal');
    return Response.json(data);
  });
  const first = await run();
  assert.equal(first.ai, true);
  assert.equal(first.results.length, 6);
  assert.equal(first.results[0].feedback, 'Buen trabajo.');
  assert.match((await run()).mode, /Reutilizada/);
  assert.equal(calls, 1);
});

test('la IA no aprueba cuando falta un criterio obligatorio', async () => {
  const { run } = setup(async () => Response.json({ ...data, criterios: { ...data.criterios, formato: false } }));
  assert.equal((await run()).passed, false);
});

test('errores y contrato inválido vuelven a reglas, sin guardar fallos en caché', async () => {
  for (const fetch of [
    async () => { throw new Error('offline'); },
    async () => new Response('', { status: 503 }),
    async () => Response.json({}),
    async () => Response.json({ ...data, criterios: { ...data.criterios, rol: 'true' } }),
  ]) {
    const { run, context } = setup(fetch);
    const result = await run();
    assert.equal(result.ai, false);
    assert.equal(result.passed, true);
    assert.match(result.mode, /sin IA/);
    assert.equal(vm.runInContext('state.cache.size', context), 0);
  }
});

test('limita a cinco intentos por minuto y sigue jugando por reglas', async () => {
  let calls = 0;
  const { run } = setup(async () => { calls += 1; return new Response('', { status: 429 }); });
  for (let index = 0; index < 6; index += 1) assert.equal((await run()).ai, false);
  assert.equal(calls, 5);
});

test('el límite de espera del navegador vuelve a la simulación', async () => {
  const { run } = setup(async (_, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => reject(new Error('timeout')), { once: true });
  }), 'https:', { setTimeout: callback => setTimeout(callback, 1) });
  assert.equal((await run()).ai, false);
});
