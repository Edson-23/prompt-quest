import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
const flow=html.split('// Flujo de misión:')[1].split('// Fin del flujo de misión.')[0];
const controller=flow.slice(flow.indexOf('function setMissionScreen'));
function setup(){
 const document={activeElement:null,body:{dataset:{},classList:{contains:()=>true}}};
 class Element{
  constructor(id){this.id=id;this.hidden=false;this.children=[];this.value='';this.scrollTop=0;}
  replaceChildren(...children){this.children=children;}
  append(...children){this.children.push(...children);}
  focus(){document.activeElement=this;}
  getBoundingClientRect(){return {top:0};}
 }
 const ids=['prompt-form','results-panel','execute','result-actions','new-mail','client-name','terminal-scroll','prompt','terminal-history','history-items','hint-button','result-hint','hint','chat-hints','chat-scroll','client-guide','submitted-prompt','sheet-score','result-announcement'];
 const nodes=Object.fromEntries(ids.map(id=>[id,new Element(id)]));
 document.createElement=()=>new Element('');
 const state={history:new Map(),hints:0,chatTimer:null,chatRevealed:false};
 const mission={id:'menu-semanal',hints:['Primera pista','Segunda pista','Tercera pista']};
 const timers=[];
 const context=vm.createContext({document,state,mission,window:{matchMedia:()=>({matches:false})},setTimeout:(fn,delay)=>{timers.push({fn,delay});return timers.length},clearTimeout:()=>{},$:id=>nodes[id],ui:{score:'{count} / 6 criterios',hint:'Pedir pista',hintsDone:'Pistas: 3',hintNumber:'Pista {current} de 3',resultReady:'{count} criterios'},format:(text,values)=>text.replace(/\{(\w+)\}/g,(_,key)=>values[key])});
 vm.runInContext(controller,context);
 return {nodes,state,mission,document,timers,run:code=>vm.runInContext(code,context)};
}
test('la terminal alterna editor y resultados, con foco en el control correspondiente',()=>{
 const {nodes,document,run}=setup();
 run("setMissionScreen('terminal')");assert.equal(nodes['prompt-form'].hidden,false);assert.equal(nodes['results-panel'].hidden,true);assert.equal(document.activeElement,nodes.prompt);
 run("setMissionScreen('results')");assert.equal(nodes['prompt-form'].hidden,true);assert.equal(nodes['results-panel'].hidden,false);assert.equal(nodes.execute.hidden,true);assert.equal(nodes['result-actions'].hidden,false);assert.equal(document.activeElement,nodes['terminal-scroll']);
});
test('correo y conversación conservan su navegación y el prompt al volver',()=>{
 const {nodes,document,run}=setup();nodes.prompt.value='Mi borrador';
 run("setMissionScreen('mail')");assert.equal(document.activeElement,nodes['new-mail']);
 run("setMissionScreen('chat')");assert.equal(document.activeElement,nodes['client-name']);
 run("setMissionScreen('terminal')");assert.equal(nodes.prompt.value,'Mi borrador');
});
test('reintentar conserva el prompt anterior y lo agrega al historial visible',()=>{
 const {nodes,state,run}=setup();nodes.prompt.value='Dame un menú';run('presentResult(1)');
 assert.equal(state.history.get('menu-semanal').length,1);assert.equal(nodes['terminal-history'].hidden,true);
 run("setMissionScreen('terminal')");assert.equal(nodes.prompt.value,'Dame un menú');assert.equal(nodes['terminal-history'].hidden,false);assert.equal(nodes['history-items'].children[0].children[1].textContent,'> Dame un menú');
});
test('un resultado nuevo reemplaza el actual y conserva los prompts anteriores como texto literal',()=>{
 const {nodes,state,run}=setup();nodes.prompt.value='<script>anterior</script>';run('presentResult(0)');nodes.prompt.value='Prompt mejorado';run('presentResult(6)');
 assert.equal(nodes['submitted-prompt'].textContent,'> Prompt mejorado');assert.equal(nodes['sheet-score'].textContent,'6 / 6 criterios');assert.equal(state.history.get('menu-semanal').length,2);assert.equal(nodes['history-items'].children.length,1);assert.equal(nodes['history-items'].children[0].children[1].textContent,'> <script>anterior</script>');
});
test('las pistas de conversación y resultados comparten el límite y no abandonan la pantalla',()=>{
 const {nodes,state,document,run}=setup();run("setMissionScreen('results')");
 run("requestHint($('chat-hints'));requestHint($('hint'));requestHint($('hint'));requestHint($('hint'))");
 assert.equal(state.hints,3);assert.equal(nodes['chat-hints'].children.length,1);assert.equal(nodes.hint.children.length,2);assert.equal(nodes['hint-button'].disabled,true);assert.equal(nodes['result-hint'].disabled,true);assert.equal(document.body.dataset.missionScreen,'results');
});
test('el historial se separa por misión y no se arrastra al siguiente cliente',()=>{
 const {nodes,mission,run}=setup();nodes.prompt.value='Anterior';run('presentResult(3)');mission.id='correos-tienda';run('renderHistory()');assert.equal(nodes['terminal-history'].hidden,true);assert.equal(nodes['history-items'].children.length,0);
});
test('si la evaluación acaba mientras se consulta el portafolio no roba el foco',()=>{
 const {nodes,document,run}=setup();document.body.classList.contains=()=>false;document.activeElement={id:'portfolio-title'};nodes.prompt.value='Prueba';run('presentResult(4)');assert.equal(document.activeElement.id,'portfolio-title');assert.equal(document.body.dataset.missionScreen,'results');
});

test('la conversación puede revelarse inmediatamente sin esperar los 600 ms',()=>{
 const {nodes,state,timers,run}=setup();run("setMissionScreen('chat')");assert.equal(nodes['client-guide'].hidden,true);assert.equal(timers[0].delay,600);run('revealConversation()');assert.equal(nodes['client-guide'].hidden,false);assert.equal(state.chatTimer,null);run("setMissionScreen('terminal')");assert.equal(nodes['prompt-form'].hidden,false);
});
