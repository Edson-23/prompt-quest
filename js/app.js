import { CONTENT, getMissionCriteria } from './contenido.js';
import { createEvaluator } from './evaluacion.js';
import { createStoryController } from './historia.js';
import { createMissionController } from './misiones.js';
import { createLevelMapController } from './mapa.js';
import { createPortfolioController } from './portafolio.js';

export function createGame(language = 'es') {
  const { ui, missions, levels } = CONTENT[language];
  const state = { welcomeIndex:0, missionIndex:0, portfolio:new Map(), history:new Map(), chatTimer:null, chatRevealed:false, notificationTimer:null, notificationClosing:false, hints:0, completed:new Set(), revision:0, busy:false, cache:new Map(), requests:[] };
  return { language, ui, missions, levels, criteria:getMissionCriteria(missions[0], language), mission:missions[0], state };
}

export function startApp({ document = globalThis.document, window = globalThis.window, fetch = globalThis.fetch } = {}) {
  const game = createGame();
  const { ui } = game;
  const $ = id => document.getElementById(id);
  document.querySelectorAll('[data-copy]').forEach(element => { element.textContent = ui[element.dataset.copy]; });
  $('prompt').placeholder = ui.placeholder;
  $('editor-help').textContent = ui.editorHelp + ' ' + ui.privacy;
  const evaluate = createEvaluator(game, { fetch, location:window.location });
  const portafolio = createPortfolioController(game, { document, onReturn:screen => misiones.setMissionScreen(screen) });
  let mapa;
  const misiones = createMissionController(game, { document, window, evaluate, onGraduation:() => portafolio.showPortfolio(true), onLevelComplete:() => mapa.showMap('mission'), onProgress:() => { if (mapa && !$('level-map-screen').hidden) mapa.renderMap(); } });
  misiones.renderMission();
  const historia = createStoryController(game, { document, window, onStartMission:() => misiones.setMissionScreen(misiones.missionEntryScreen()) });
  mapa = createLevelMapController(game, { document, misiones });
  mapa.bindEvents();
  misiones.bindEvents();
  historia.bindEvents();
  portafolio.bindEvents();
  return { game, historia, misiones, portafolio, mapa };
}

if (typeof document !== 'undefined') startApp();
