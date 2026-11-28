import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createGuideAnimation } from '../js/historia.js';
function setup({reduced=false}={}){
 let now=0, next=0;
 const jobs=new Map(), assets=[], listeners={};
 const image={src:'assets/epson_ia_mano_abajo.png',hidden:false,getAttribute(){return this.src},addEventListener(name,callback){listeners[name]=callback}};
 const motion={matches:reduced,addEventListener(_,callback){this.change=callback}};
 const page={hidden:false,addEventListener(_,callback){this.change=callback}};
 class Asset{constructor(){assets.push(this)}}
 const options={ImageType:Asset,motion,page,random:()=>0.5,schedule:(fn,ms)=>{const id=++next;jobs.set(id,{fn,at:now+ms});return id},cancel:id=>jobs.delete(id)};
 const controller=createGuideAnimation(image,options);
 const advance=ms=>{const end=now+ms;while(true){const job=[...jobs].sort((a,b)=>a[1].at-b[1].at)[0];if(!job||job[1].at>end)break;now=job[1].at;jobs.delete(job[0]);job[1].fn()}now=end};
 return {image,motion,page,assets,jobs,listeners,controller,advance,load:()=>assets.forEach(asset=>asset.onload())};
}

test('precarga tres cuadros y saluda 800 ms antes de reposo y parpadeo de 150 ms',()=>{
 const s=setup();
 assert.equal(s.assets.length,3);
 assert.equal(new Set(s.assets.map(asset=>asset.src)).size,3);
 s.load();s.controller.message();assert.match(s.image.src,/mapache/);
 s.advance(799);assert.match(s.image.src,/mapache/);
 s.advance(1);assert.match(s.image.src,/mano_abajo/);
 s.advance(3999);assert.match(s.image.src,/mano_abajo/);
 s.advance(1);assert.match(s.image.src,/ojos_cerrados/);
 s.advance(149);assert.match(s.image.src,/ojos_cerrados/);
 s.advance(1);assert.match(s.image.src,/mano_abajo/);
 s.controller.stop();assert.equal(s.jobs.size,0);
});
test('mensajes rápidos no esperan y reemplazan la animación anterior; al salir se detiene',()=>{
 const s=setup();s.load();
 assert.equal(s.controller.message(),undefined);
 s.advance(300);s.controller.message();
 s.advance(500);assert.match(s.image.src,/mapache/);
 s.advance(300);assert.match(s.image.src,/mano_abajo/);
 s.controller.stop();s.advance(10000);assert.match(s.image.src,/mano_abajo/);assert.equal(s.jobs.size,0);
});
test('movimiento reducido muestra reposo sin cambios, incluso al cambiar la preferencia',()=>{
 const s=setup({reduced:true});s.load();s.controller.message();s.advance(10000);
 assert.match(s.image.src,/mano_abajo/);assert.equal(s.jobs.size,0);
 s.motion.matches=false;s.motion.change();assert.equal(s.jobs.size,1);
 s.motion.matches=true;s.motion.change();assert.equal(s.jobs.size,0);
});
test('un cuadro fallido degrada a reposo y un reposo fallido no muestra iconos rotos',()=>{
 const s=setup();s.load();s.controller.message();s.assets[2].onerror();
 assert.match(s.image.src,/mano_abajo/);assert.equal(s.jobs.size,0);
 s.controller.message();assert.match(s.image.src,/mano_abajo/);
 s.listeners.error();assert.equal(s.image.hidden,false);assert.match(s.image.src,/^data:image\/png;base64,/);assert.equal(s.jobs.size,0);
});
test('carga lenta no bloquea mensajes y la pestaña oculta cancela los temporizadores',()=>{
 const s=setup();s.controller.message();s.controller.message();assert.equal(s.jobs.size,0);
 s.load();assert.match(s.image.src,/mapache/);
 s.page.hidden=true;s.page.change();assert.equal(s.jobs.size,0);assert.match(s.image.src,/mano_abajo/);
 s.page.hidden=false;s.page.change();assert.equal(s.jobs.size,1);
});
test('los tres cuadros web tienen el mismo tamaño y pesan menos de 300 KB',async()=>{
 for(const name of ['epson_ia_mapache','epson_ia_mano_abajo','epson_ia_ojos_cerrados']){
  const data=await readFile(new URL(`../assets/${name}.png`,import.meta.url));
  assert.equal(data.readUInt32BE(16),480);assert.equal(data.readUInt32BE(20),268);
  assert.ok(data.length<300000);
 }
});
