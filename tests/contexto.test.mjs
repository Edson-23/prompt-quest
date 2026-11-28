import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { CONTENT, getMissionCriteria } from '../js/contenido.js';
import { evaluatePrompt } from '../js/evaluacion.js';

const mission = id => CONTENT.es.missions.find(item=>item.id===id);
const source = (await readFile(new URL('../docs/specs/MISIONES_NIVEL_2.txt',import.meta.url),'utf8')).replace(/\r\n/g,'\n');

test('Claridad y la misión 2.1 conservan todos sus textos y reglas anteriores',()=>{
 const hashes=['d5b2c9dd1a6b02d7ad9e601a5a7032d2c58e391c3b5f7a0df1bcd4c1c08ba297','b7acce3191bdfa0cb2e788e8de4ac14f27df30dd246a4d588da5541dc60d57d2','073936aed0d5016723e94981b791c047aaaa1bb6e8214f985bd344cc1bc3a196','fc0b48194837c8b05cb90520dfeb8e221c35b1c47ba99700b9ddacbe5e862d63'];
 CONTENT.es.missions.slice(0,4).forEach((item,index)=>{
  const serialized=JSON.stringify(item,(_,value)=>value instanceof RegExp ? value.toString() : value);
  assert.equal(createHash('sha256').update(serialized).digest('hex'),hashes[index],item.id);
 });
 assert.deepEqual(mission('2.1').required,['rol','contexto','restricciones']);
});

for(const id of ['2.2','2.3']) test(`${id}: encargo, definiciones, pistas, referencia y detección exactos del documento`,()=>{
 const item=mission(id), section=source.split('MISIÓN '+id+' · ')[1].split('MISIÓN ')[0];
 assert.ok(section.includes('"'+item.brief+'"'));
 assert.ok(section.includes('"'+item.reference+'"'));
 assert.equal(item.hints.length,3);
 for(const hint of item.hints) assert.ok(section.includes(hint));
 for(const [criterion,definition] of Object.entries(item.definitions)) {
  const label=criterion[0].toUpperCase()+criterion.slice(1);
  assert.ok(section.includes(label+': '+definition)||section.includes(label+' (opcional): '+definition));
 }
 for(const words of Object.values(item.detectionWords)) {
  assert.ok(words.length>=3);
  for(const word of words) assert.ok(section.includes('"'+word+'"'));
 }
});

const contextVariants={
 '2.2':[
  'La política es de 30 días, compró hace 40 días y el sistema muestra 45 días por un error de configuración.',
  'La compra fue hace cuarenta días. La política permite treinta días, pero hay un fallo en el sistema: cuarenta y cinco días.',
  'Política: 30 días; compra: 40 días; sistema incorrecto: 45 días.'
 ],
 '2.3':[
  'La impresora no aparece en la red, otros equipos sí la ven, la pantalla funciona sin errores. Acceso al router y al servidor de impresión.',
  'El usuario no la detecta. Otras computadoras sí la detectan; la impresora enciende. Acceso al enrutador y al servidor de impresora.',
  'El usuario no puede encontrar la impresora. El resto de equipos la encuentran; está encendida. Tenemos acceso al ruteador y al servidor que gestiona la impresión.'
 ]
};
for(const [id,variants] of Object.entries(contextVariants)) test(`${id}: contexto reconoce tres formulaciones completas`,()=>{
 for(const text of variants) assert.equal(evaluatePrompt(text,mission(id)).results.find(c=>c.id==='contexto').passed,true,text);
});

const fragments={
 '2.2':['La política es de 30 días.','La compra fue hace 40 días.','El sistema muestra 45 días.','Hay un error de configuración.'],
 '2.3':['La impresora no aparece en la red.','Otros equipos sí la ven.','La pantalla funciona sin errores.','Tenemos acceso al router.','Tenemos acceso al servidor de impresión.']
};
for(const [id,parts] of Object.entries(fragments)) test(`${id}: la retroalimentación identifica cada dato concreto ausente`,()=>{
 const item=mission(id), details=getMissionCriteria(item).find(c=>c.id==='contexto').details;
 for(let index=0;index<parts.length;index++) {
  const prompt=parts.filter((_,i)=>i!==index).join(' ');
  const context=evaluatePrompt(prompt,item).results.find(c=>c.id==='contexto');
  assert.equal(context.passed,false);
  assert.equal(context.feedback,details[index].missing);
 }
 assert.equal(evaluatePrompt('contexto',item).results.find(c=>c.id==='contexto').passed,false);
});
