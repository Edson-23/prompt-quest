import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';
import { CONTENT, getMissionCriteria } from '../js/contenido.js';
import { prompts as good } from './helpers/prompts.mjs';

import { createTestSession } from './helpers/session.mjs';
const missionCases = CONTENT.es.missions.filter(m => m.available !== false);
const missionIds = missionCases.map(m => m.id);
const weak = ['Dame comida.','Ayúdame.','Hola.','Ayúdame.','Dime algo.'];
const required = missionCases.map(m => m.required);
function setup(index = 0, { protocol = 'file:', fetch = () => { throw Error('Sin conexión'); } } = {}) {
  const { run, game } = createTestSession({ protocol, fetch });
  game.mission = missionCases[index];
  game.state.missionIndex = CONTENT.es.missions.indexOf(game.mission);
  game.criteria = getMissionCriteria(game.mission);
  return { run, evaluate: prompt => run(`evaluateWithFallback(${JSON.stringify(prompt)})`) };
}

for (let index = 0; index < missionIds.length; index++) {
  test(`misión ${index + 1}: prompt flojo y bueno sin red; obligatorios propios`, async () => {
    const { run, evaluate } = setup(index);
    assert.equal(run('mission.id'), missionIds[index]);
    assert.deepEqual(Array.from(run('mission.required')), required[index]);
    assert.equal((await evaluate(weak[index])).passed, false);
    const passed = await evaluate(good[index]);
    assert.equal(passed.passed, true);
    assert.equal(passed.ai, false);
    for (const id of required[index]) assert.equal(passed.results.find(result => result.id === id).passed, true, id);
  });
  test(`misión ${index + 1}: error de red, cuota y servidor mantienen evaluación`, async () => {
    for (const fetch of [async () => { throw Error('offline'); }, async () => new Response('',{status:429}), async () => new Response('',{status:503})]) {
      const { evaluate } = setup(index, { protocol:'https:', fetch });
      assert.equal((await evaluate(weak[index])).passed, false);
      const result = await evaluate(good[index]);
      assert.equal(result.passed, true);
      assert.equal(result.ai, false);
    }
  });
  test(`misión ${index + 1}: Gemini respeta todos y solo sus obligatorios`, async () => {
    for (const missing of [null, ...getMissionCriteria(missionCases[index]).map(c=>c.id)]) {
      const ids = getMissionCriteria(missionCases[index]).map(c=>c.id);
      const data = { criterios:Object.fromEntries(ids.map(id => [id,id !== missing])), comentarios:Object.fromEntries(ids.map(id => [id,'Explicación del criterio.'])), retroalimentacion:'Revisa los criterios.' };
      const { evaluate } = setup(index, { protocol:'https:', fetch:async (_,options) => {
        const body = JSON.parse(options.body);
        assert.equal(body.mision.id, missionIds[index]);
        assert.deepEqual(body.mision.obligatorios, required[index]);
        return Response.json(data);
      } });
      const result = await evaluate(good[index]);
      assert.equal(result.ai,true);
      assert.equal(result.passed, !required[index].includes(missing));
    }
  });
}

test('cada criterio reconoce al menos tres expresiones españolas en cada misión', () => {
  const variants = [
    [ ['Actúa como chef','Eres un cocinero','Asume el papel de chef'], ['La Esquina','Restaurante pequeño','Negocio de comida'], ['Crea un menú','Elabora un menú','Prepara un menú'], ['Tabla','Lista','Columnas'], ['Sin gluten','Económico','Bajo costo'], ['Por ejemplo: arroz','Ejemplo: lunes','Como muestra: sopa'] ],
    [ ['Actúa como agente','Eres una asesora','Asume el rol de agente'], ['Tienda de ropa','Comercio electrónico','Vendemos ropa'], ['Redacta un correo','Contesta consultas','Necesito una respuesta'], ['Correo','Saludo y despedida','Párrafos'], ['Máximo 80 palabras','Sin inventar plazos','Evita promesas'], ['Por ejemplo: gracias','Ejemplo: hola','Como muestra: saludos'] ],
    [ ['Actúa como profesor','Eres una tutora','Asume el papel de historiador'], ['Revolución Industrial','Examen de historia','Apuntes de historia'], ['Haz un resumen','Resume mis apuntes','Sintetiza el texto'], ['Viñetas','Tabla','Esquema'], ['Máximo 200 palabras','Sin añadir datos','Solo mis apuntes'], ['Por ejemplo: causas, carbón','Ejemplo: tecnología, vapor','Como muestra: cambios, fábricas'] ],
  ];
  variants.forEach((groups,index) => {
    const actualIndex = [0,3,4][index];
    const ids = getMissionCriteria(missionCases[actualIndex]).map(c=>c.id);
    const { run } = setup(actualIndex);
    groups.forEach((phrases,criterion) => phrases.forEach(phrase => {
      assert.equal(run(`evaluatePrompt(${JSON.stringify(phrase)}).results[${criterion}].passed`),true, `${index+1}: ${ids[criterion]}: ${phrase}`);
    }));
  });
});

test('progresión secuencial: 1.2 y 1.3 requieren la misión anterior', () => {
  const { run } = setup();
  assert.equal(run('selectMission(1)'),false); assert.equal(run('selectMission(2)'),false);
  for (let index=1;index<=3;index++) {
    run('state.completed.add(mission.id); state.hints=3; state.busy=true');
    assert.equal(run(`selectMission(${index})`),false);
    run('state.busy=false'); assert.equal(run(`selectMission(${index})`),true);
    assert.equal(run('state.hints'),0); assert.equal(run(`selectMission(${index})`),false);
  }
  assert.equal(run('selectMission(4)'),false); assert.equal(run('selectMission(8)'),false);
  assert.equal(setup().run('state.completed.size'),0);
});

test('la caché del mismo prompt no mezcla misiones', async () => {
  const ids = getMissionCriteria(CONTENT.es.missions[0]).map(c=>c.id);
  const { run, evaluate } = setup(0,{protocol:'https:', fetch:async()=>Response.json({criterios:Object.fromEntries(ids.map(id=>[id,true])),comentarios:Object.fromEntries(ids.map(id=>[id,'Cumplido.'])),retroalimentacion:'Completo.'})});
  await evaluate('Mismo texto');
  run('state.completed.add(mission.id); selectMission(1)');
  await evaluate('Mismo texto');
  assert.equal(run('state.cache.size'),2);
});

test('Worker usa el encargo de confianza de cada misión y mantiene el contrato de Gemini', async t => {
  for (const [index,id] of missionIds.entries()) {
    const ids = getMissionCriteria(missionCases[index]).map(c=>c.id);
    t.mock.method(globalThis,'fetch',async (_,options) => {
      const instruction = JSON.parse(options.body).systemInstruction.parts[0].text;
      assert.match(instruction,new RegExp(id));
      assert.doesNotMatch(instruction,/ENCARGO FALSO/);
      assert.match(instruction,new RegExp(JSON.stringify(required[index]).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
      assert.match(instruction, /objetivo: solicita un resultado concreto/);
      return Response.json({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify({criterios:Object.fromEntries(ids.map(id=>[id,true])),comentarios:Object.fromEntries(ids.map(id=>[id,'Cumplido.'])),retroalimentacion:'Buen prompt.'})}]}}]});
    });
    const response = await worker.fetch(new Request('https://quest.example/api/evaluar',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:good[index],mision:{id,encargo:'ENCARGO FALSO',obligatorios:[]}})}),{GEMINI_API_KEY:'test-only-placeholder',GEMINI_MODEL:'test-model',EVALUATION_LIMITER:{limit:async()=>({success:true})}});
    assert.equal(response.status,200);
    assert.equal((await response.json()).criterios.formato,true);
    t.mock.restoreAll();
  }
});

test('las palabras de detección de 1.2 y 1.3 reconocen al menos tres expresiones por criterio',()=>{
 for(const index of [1,2]) {
  const { run }=setup(index);
  const mission=missionCases[index];
  for(const [id,words] of Object.entries(mission.detectionWords)) {
   assert.ok(words.length>=3,id);
   for(const phrase of words) assert.equal(run(`evaluatePrompt(${JSON.stringify(phrase)}).results.find(c=>c.id===${JSON.stringify(id)}).passed`),true,`${mission.id}: ${id}: ${phrase}`);
  }
 }
});
