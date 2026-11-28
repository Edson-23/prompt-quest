import test from 'node:test';
import assert from 'node:assert/strict';
import { createGame } from '../js/app.js';
import { isLevelUnlocked, isMissionUnlocked, isLevelComplete, selectMission } from '../js/misiones.js';
import { missionNumber } from '../js/contenido.js';

test('el mapa contiene tres niveles de tres misiones con identificadores estables',()=>{
 const game=createGame();
 assert.equal(game.levels.length,3);
 assert.deepEqual(game.levels.flatMap(level=>level.missionIds).map(id=>missionNumber(game.missions.find(m=>m.id===id))),['1.1','1.2','1.3','2.1','2.2','2.3','3.1','3.2','3.3']);
 for(const id of ['3.1','3.2','3.3']) {
  const mission=game.missions.find(m=>m.id===id); assert.equal(mission.available,false); assert.equal(mission.brief,undefined);
 }
});
test('Contexto permanece bloqueado hasta aprobar las tres misiones de Claridad',()=>{
 const game=createGame();
 for(const id of ['menu-semanal','1.2']) {
  assert.equal(isLevelUnlocked(game,2),false); assert.equal(isMissionUnlocked(game,game.missions[3]),false);
  game.state.completed.add(id);
 }
 assert.equal(isLevelUnlocked(game,2),false); assert.equal(selectMission(game,3),false);
 game.state.completed.add('1.3');
 assert.equal(isLevelComplete(game,1),true); assert.equal(isLevelUnlocked(game,2),true);
 assert.equal(isMissionUnlocked(game,game.missions[3]),true); assert.equal(selectMission(game,3),true);
 assert.equal(isLevelUnlocked(game,3),false); assert.equal(selectMission(game,8),false);
});
test('aprobar solo 1.1 o 1.2 no desbloquea 1.3 ni permite saltar al nivel 2',()=>{
 const game=createGame();
 assert.equal(isMissionUnlocked(game,game.missions[1]),false);
 game.state.completed.add('menu-semanal'); assert.equal(isMissionUnlocked(game,game.missions[1]),true);
 assert.equal(isMissionUnlocked(game,game.missions[2]),false); assert.equal(selectMission(game,2),false);
 game.state.completed.add('1.2'); assert.equal(isMissionUnlocked(game,game.missions[2]),true);
 assert.equal(isLevelUnlocked(game,2),false);
});


test('2.2 y 2.3 se desbloquean en orden; Formato requiere las tres misiones de Contexto',()=>{
 const game=createGame();
 for(const id of ['menu-semanal','1.2','1.3']) game.state.completed.add(id);
 assert.equal(isMissionUnlocked(game,game.missions[3]),true);
 assert.equal(selectMission(game,4),false); assert.equal(selectMission(game,5),false);
 assert.equal(isLevelUnlocked(game,3),false);
 game.state.completed.add('2.1');
 assert.equal(isMissionUnlocked(game,game.missions[4]),true); assert.equal(selectMission(game,4),true);
 assert.equal(isMissionUnlocked(game,game.missions[5]),false); assert.equal(selectMission(game,5),false);
 assert.equal(isLevelUnlocked(game,3),false);
 game.state.completed.add('2.2');
 assert.equal(selectMission(game,5),true); assert.equal(isLevelUnlocked(game,3),false);
 game.state.completed.add('2.3');
 assert.equal(isLevelComplete(game,2),true); assert.equal(isLevelUnlocked(game,3),true);
 for(const item of game.missions.filter(m=>m.level===3)) {
  assert.equal(item.title,'Próximamente'); assert.equal(item.brief,undefined);
  assert.equal(isMissionUnlocked(game,item),false); assert.equal(selectMission(game,game.missions.indexOf(item)),false);
 }
});
