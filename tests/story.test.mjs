import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

import { createTestSession } from './helpers/session.mjs';
const script = await readFile(new URL('../js/portafolio.js',import.meta.url),'utf8');
function setup() { return createTestSession({ protocol:'file:' }).run; }

test('el portafolio conserva solo trabajos aprobados, sin duplicar ni reemplazar con fallos',()=>{
  const run=setup();
  run("recordWork('fallido', {passed:false})");
  assert.equal(run('state.portfolio.size'),0);
  run("recordWork('<script>texto del jugador</script>', {passed:true,results:[{passed:true},{passed:false}]})");
  assert.equal(run("state.portfolio.get(mission.id).prompt"),'<script>texto del jugador</script>');
  assert.equal(run("state.portfolio.get(mission.id).response"),run('mission.reference'));
  run("recordWork('nuevo aprobado', {passed:true,results:[{passed:true}]})");
  run("recordWork('nuevo fallo', {passed:false})");
  assert.equal(run('state.portfolio.size'),1);
  assert.equal(run('state.portfolio.get(mission.id).prompt'),'nuevo aprobado');
  run('state.completed.add(mission.id); selectMission(1)');
  run("recordWork('correo aprobado', {passed:true,results:[{passed:true}]})");
  assert.equal(run('state.portfolio.size'),2);
  assert.equal(setup()('state.portfolio.size'),0);
});

test('portafolio usa texto literal y la imagen web está íntegra',async()=>{
  const render=script.slice(script.indexOf('function renderPortfolio'),script.indexOf('function showPortfolio'));
  assert.doesNotMatch(render,/innerHTML|insertAdjacentHTML/);
  assert.match(render,/content.textContent = text/);
  const installed=await readFile(new URL('../assets/epson_ia_mapache.png',import.meta.url));
  assert.equal(createHash('sha256').update(installed).digest('hex'), '2e7897fec8c56ef35ca3be3243c10f9cd7889989e08c4ac8e397a706617ffa12');
});
