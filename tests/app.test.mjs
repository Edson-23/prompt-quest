import test from 'node:test';
import assert from 'node:assert/strict';
import { startApp } from '../js/app.js';
import { CONTENT } from '../js/contenido.js';
import { createDocument } from './helpers/dom.mjs';
import { prompts } from './helpers/prompts.mjs';
for (const desktop of [false,true]) test(`módulos conectados: bienvenida, Claridad y Contexto completos, mapa y portafolio (${desktop ? 'laptop' : 'celular'})`,async()=>{
  const dom = createDocument({ desktop });
  let calls = 0;
  const app = startApp({ ...dom, fetch:async()=>{ calls++; return new Response('',{status:503}); } });
  const $ = id => dom.nodes.get(id), click = id => $(id).emit('click');
  await click('start-day');
  for (const message of CONTENT.es.welcome) {
    assert.equal($('welcome-message').textContent,message); await click('welcome-next');
  }
  assert.equal(dom.document.body.classList.contains('in-game'),true);
  for (let index=0;index<6;index++) {
    if (desktop || index===0) await click('mail-notification');
    await click('new-mail');
    if (!desktop && index===0) await click('read-client');
    assert.equal($('brief').textContent,CONTENT.es.missions[index].brief);
    await click('start-prompt');
    if (index===0) {
      $('prompt').value='Dame comida'; await $('prompt').emit('input'); await $('prompt-form').emit('submit');
      assert.equal($('next-mission').hidden,true);
      await click('result-hint'); assert.equal($('hint').children.length,1);
      await click('retry-prompt'); assert.equal($('prompt').value,'Dame comida');
    }
    $('prompt').value=prompts[index]; await $('prompt').emit('input'); await $('prompt-form').emit('submit');
    assert.equal(app.game.state.completed.size,index+1);
    assert.equal($('response-text').textContent,CONTENT.es.missions[index].reference);
    assert.equal(dom.document.body.dataset.missionScreen,'results');
    await click('open-portfolio'); assert.equal($('portfolio-items').children.length,index+1);
    await click('return-game'); assert.equal(dom.document.body.dataset.missionScreen,'results');
    if (index<5) {
      await click('next-mission');
      if (index===2) {
        assert.equal($('level-map-screen').hidden,false);
        assert.equal(app.mapa.openMission(3),true);
      }
    }
  }
  assert.equal($('view-graduation').hidden,true);
  assert.equal($('next-mission').hidden,false);
  await click('open-portfolio'); await click('open-map');
  assert.equal($('level-map-screen').hidden,false);
  assert.equal(app.mapa.openMission(6),false);
  assert.equal(app.mapa.openMission(8),false);
  await click('map-back'); assert.equal($('portfolio-screen').hidden,false);
  assert.equal(calls,5);
});

test('el mapa anuncia los bloqueos y sus botones no permiten saltar misiones',async()=>{
 const dom=createDocument(), app=startApp({...dom,fetch:async()=>new Response('',{status:503})});
 app.mapa.showMap();
 const list=dom.nodes.get('level-map-list');
 const buttonAt=(level,index)=>list.children[level].children[1].children[index].children[0];
 assert.equal(buttonAt(0,1).getAttribute('aria-disabled'),'true');
 assert.equal(buttonAt(1,0).getAttribute('aria-disabled'),'true');
 assert.ok(buttonAt(0,1).getAttribute('aria-describedby'));
 await buttonAt(0,1).emit('click');
 assert.equal(app.game.state.missionIndex,0);
 assert.equal(dom.nodes.get('level-map-screen').hidden,false);
 app.game.state.completed.add('menu-semanal'); app.mapa.renderMap();
 assert.equal(buttonAt(0,1).getAttribute('aria-disabled'),'false');
 await buttonAt(0,1).emit('click');
 assert.equal(app.game.mission.id,'1.2');
 assert.equal(dom.nodes.get('level-map-screen').hidden,true);
});
