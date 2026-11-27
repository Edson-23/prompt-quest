import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { createHash } from 'node:crypto';

const html = await readFile(new URL('../index.html',import.meta.url),'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const logic = script.split('document.querySelectorAll')[0];
function setup() {
  const context = vm.createContext({location:{protocol:'file:'}});
  vm.runInContext(logic,context);
  return code=>vm.runInContext(code,context);
}

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

test('portafolio usa texto literal y la imagen original está íntegra',async()=>{
  const render=script.slice(script.indexOf('function renderPortfolio'),script.indexOf('function showPortfolio'));
  assert.doesNotMatch(render,/innerHTML|insertAdjacentHTML/);
  assert.match(render,/content.textContent = text/);
  const installed=await readFile(new URL('../assets/originales/epson_ia_mapache.png',import.meta.url));
  assert.equal(createHash('sha256').update(installed).digest('hex'), 'ce73e888e524bdcd9084ce19f1c2855a02cdd5eabd6228a14181d73dba532e9b');
});
