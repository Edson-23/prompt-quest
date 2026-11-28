import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
test('las hojas externas conservan el orden y separan los estilos laptop', async () => {
  assert.doesNotMatch(html, /<style\b|\sstyle=/);
  const sheets = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)].map(match => match[1]);
  assert.deepEqual(sheets, ['styles/base.css','styles/historia.css','styles/misiones.css','styles/escritorio.css']);
  const css = await Promise.all(sheets.map(file => readFile(new URL(file, root), 'utf8')));
  assert.match(css[0], /--bg:#0d1117/);
  assert.match(css[1], /\.story-screen/);
  assert.match(css[2], /notification-in 400ms/);
  assert.match(css[3].replace(/\/\*[\s\S]*?\*\//g, '').trimStart(), /^@media \(min-width:768px\)/);
});
