import test from 'node:test';
import assert from 'node:assert/strict';
import { startApp } from '../js/app.js';
import { CONTENT } from '../js/contenido.js';
import { createDocument } from './helpers/dom.mjs';
import { prompts } from './helpers/prompts.mjs';
for (const desktop of [false,true]) test(`módulos conectados: bienvenida, cinco misiones, portafolio y graduación (${desktop ? 'laptop' : 'celular'})`,async()=>{
  const dom = createDocument({ desktop });
  let calls = 0;
  const app = startApp({ ...dom, fetch:async()=>{ calls++; return new Response('',{status:503}); } });
  const $ = id => dom.nodes.get(id), click = id => $(id).emit('click');
  await click('start-day');
  for (const message of CONTENT.es.welcome) {
    assert.equal($('welcome-message').textContent,message); await click('welcome-next');
  }
  assert.equal(dom.document.body.classList.contains('in-game'),true);
  for (let index=0;index<CONTENT.es.missions.length;index++) {
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
    if (index<CONTENT.es.missions.length-1) await click('next-mission');
  }
  await click('view-graduation');
  assert.equal($('portfolio-screen').hidden,false);
  assert.equal($('graduation-message').hidden,false);
  assert.equal($('portfolio-title').textContent,CONTENT.es.ui.graduationTitle);
  assert.equal(calls,5);
});
