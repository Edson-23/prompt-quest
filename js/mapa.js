import { format, missionNumber } from './contenido.js';
import { isLevelUnlocked, isMissionUnlocked, selectMission } from './misiones.js';

export function createLevelMapController(game, { document, misiones }) {
  const $ = id => document.getElementById(id);
  const { state, ui } = game;
  function renderMap() {
    $('level-map-list').replaceChildren(...game.levels.map(level => {
      const group = document.createElement('section');
      group.className = 'map-level';
      const heading = document.createElement('div');
      heading.className = 'map-level-heading';
      const title = document.createElement('h3');
      title.textContent = format(ui.mapLevel,{level:level.id,title:level.title});
      const progress = document.createElement('span');
      progress.className = 'small muted';
      progress.textContent = format(ui.mapProgress,{count:level.missionIds.filter(id=>state.completed.has(id)).length});
      heading.append(title,progress);
      const list = document.createElement('ol');
      for (const id of level.missionIds) {
        const index = game.missions.findIndex(mission=>mission.id===id), mission = game.missions[index];
        const unlocked = isMissionUnlocked(game,mission), completed = state.completed.has(id);
        const item = document.createElement('li'), button = document.createElement('button');
        button.type = 'button'; button.className = 'map-mission'; button.dataset.missionId = id;
        button.setAttribute('aria-disabled',String(!unlocked || state.busy));
        if (index === state.missionIndex) button.setAttribute('aria-current','step');
        const label = document.createElement('span');
        label.textContent = missionNumber(mission) + ' · ' + mission.title;
        const status = document.createElement('span'); status.className = 'map-status';
        status.textContent = completed ? '✓ ' + ui.mapCompleted : unlocked ? ui.mapAvailable : '🔒 ' + ui.mapLocked;
        button.append(label,status);
        button.addEventListener('click',()=>{ if (!state.busy && isMissionUnlocked(game,mission)) openMission(index); });
        item.append(button);
        if (!unlocked) {
          const reason = document.createElement('p'); reason.className = 'map-reason';
          reason.id = 'map-reason-' + id.replaceAll('.','-');
          reason.textContent = mission.available === false ? ui.mapSoon : isLevelUnlocked(game,level.id) ? ui.mapPrevious : ui.mapPreviousLevel;
          button.setAttribute('aria-describedby',reason.id); item.append(reason);
        }
        list.append(item);
      }
      group.append(heading,list); return group;
    }));
  }
  function showMap(origin = 'portfolio') {
    state.mapOrigin = origin;
    $('portfolio-screen').hidden = true;
    document.body.classList.remove('in-game');
    $('level-map-screen').hidden = false;
    renderMap(); $('level-map-title').focus();
  }
  function openMission(index) {
    const changed = index !== state.missionIndex;
    if (!isMissionUnlocked(game,game.missions[index]) || state.busy) return false;
    if (changed && !selectMission(game,index)) return false;
    if (changed) misiones.renderMission();
    $('level-map-screen').hidden = true;
    document.body.classList.add('in-game');
    misiones.setMissionScreen(changed ? misiones.missionEntryScreen() : document.body.dataset.missionScreen);
    return true;
  }
  function bindEvents() {
    $('open-map').addEventListener('click',()=>showMap('portfolio'));
    $('map-back').addEventListener('click',()=>{
      $('level-map-screen').hidden = true;
      if (state.mapOrigin === 'portfolio') { $('portfolio-screen').hidden = false; $('open-map').focus(); }
      else { document.body.classList.add('in-game'); misiones.setMissionScreen(document.body.dataset.missionScreen); }
    });
  }
  return { renderMap, showMap, openMission, bindEvents };
}
