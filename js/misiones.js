import { CONTENT, format, getMissionCriteria, missionNumber } from './contenido.js';
import { evaluatePrompt as evaluateRules, createEvaluator } from './evaluacion.js';
import { recordWork as saveWork } from './portafolio.js';

export function selectMission(game, index) {
  const { state, missions, language, mission } = game;
  if (state.busy || index !== state.missionIndex + 1 || !missions[index]
    || !state.completed.has(mission.id)) return false;
  state.missionIndex = index;
  game.mission = missions[index];
  game.criteria = getMissionCriteria(game.mission, language);
  state.hints = 0;
  state.revision += 1;
  return true;
}

export function createMissionController(game, {
  document, window, evaluate = createEvaluator(game), onGraduation,
  schedule = globalThis.setTimeout, cancel = globalThis.clearTimeout
}) {
  const { state, ui, missions } = game;
  const $ = id => document.getElementById(id);
  const location = window.location;
  const setTimeout = schedule, clearTimeout = cancel;
  const evaluatePrompt = prompt => evaluateRules(prompt, game.mission, game.criteria);
  const evaluateWithFallback = evaluate;
  const recordWork = (prompt, evaluation) => saveWork(game, prompt, evaluation);
  function renderCriteria(results = null) {
    const { mission, criteria } = game;
    $('criteria').replaceChildren(...criteria.map((criterion, index) => {
      const result = results && results[index];
      const item = document.createElement('li');
      item.className = 'criterion ' + (result ? (result.passed ? 'pass' : 'fail') : 'pending');
      const symbol = document.createElement('span');
      symbol.className = 'symbol';
      symbol.textContent = result ? (result.passed ? '✓' : '✗') : '·';
      symbol.setAttribute('aria-label', result ? (result.passed ? ui.fulfilled : ui.undetected) : ui.pendingLabel);
      const body = document.createElement('div');
      const label = document.createElement('strong');
      label.textContent = criterion.label;
      const requirement = document.createElement('span');
      requirement.className = 'requirement';
      requirement.textContent = mission.required.includes(criterion.id) ? ui.required : ui.optional;
      const feedback = document.createElement('p');
      feedback.hidden = !!result?.passed;
      feedback.textContent = result ? (result.feedback || (result.passed ? criterion.yes : criterion.no)) : ui.pending;
      body.append(label, requirement, feedback);
      item.append(symbol, body);
      return item;
    }));
  }

  function updateEditor() {
    const count = evaluatePrompt($('prompt').value).results.filter(result => result.passed).length;
    $('criteria-count').textContent = format(ui.liveCounter, { count, total:game.criteria.length });
    $('character-count').textContent = format(ui.characters, { count:$('prompt').value.length });
  }

  function renderProgress() {
    $('progress').max = missions.length;
    $('progress').value = state.completed.size;
    $('progress-text').textContent = format(ui.progress, { count:state.completed.size, total:missions.length });
  }

  // Flujo de misión: correo, conversación, escritura y resultado en la terminal.
  function usesLaptopMissionFlow() {
    return window.matchMedia('(min-width:768px)').matches; }
  function laptopWindows() {
    return state.desktop ||= { mailOpen:false, terminalOpen:false, active:null, mailScreen:'mail', terminalScreen:'terminal', notification:true };
  }
  function renderLaptopWindows(focus = false) {
    const desktop = laptopWindows();
    document.body.dataset.laptopNotification = String(desktop.notification);
    document.body.dataset.missionScreen = desktop.active === 'terminal' ? desktop.terminalScreen : desktop.active === 'mail' ? desktop.mailScreen : desktop.notification ? 'notification' : 'desktop';
    for (const name of ['mail','terminal']) {
      const element = $(name === 'mail' ? 'inbox-window' : 'terminal-window');
      element.dataset.laptopOpen = String(desktop[name + 'Open']);
      element.dataset.laptopActive = String(desktop.active === name);
      $('task-' + name).hidden = !desktop[name + 'Open'];
      $('task-' + name).setAttribute('aria-pressed', String(desktop.active === name));
    }
    $('inbox-window').dataset.laptopView = desktop.mailScreen;
    $('desktop-finished').dataset.visible = String(!desktop.mailOpen && !desktop.terminalOpen && !desktop.notification);
    const results = desktop.terminalScreen === 'results';
    $('prompt-form').hidden = results;
    $('results-panel').hidden = !results;
    $('execute').hidden = results;
    $('result-actions').hidden = !results;
    renderHistory(results);
    if (!focus || !document.body.classList.contains('in-game')) return;
    const target = desktop.active === 'terminal' ? (results ? 'terminal-scroll' : 'prompt') : desktop.active === 'mail' ? (desktop.mailScreen === 'chat' ? 'client-name' : 'new-mail') : desktop.notification ? 'mail-notification' : 'desktop-continue';
    $(target).focus({ preventScroll:true });
  }
  function setLaptopMissionScreen(screen, focus) {
    const { mission } = game;
    const desktop = laptopWindows();
    if (screen === 'notification') {
      desktop.mailOpen = desktop.terminalOpen = false;
      desktop.active = null;
      desktop.notification = !state.completed.has(mission.id);
    } else if (screen === 'mail' || screen === 'chat' || screen === 'profile') {
      if (!desktop.mailOpen) $('inbox-window').classList.add('window-enter');
      desktop.mailOpen = true;
      desktop.active = 'mail';
      desktop.mailScreen = screen === 'chat' ? 'chat' : 'mail';
      desktop.notification = false;
      if (screen === 'chat' && document.body.classList.contains('in-game')) prepareConversation();
    } else if (screen === 'terminal' || screen === 'results') {
      if (!desktop.terminalOpen) $('terminal-window').classList.add('window-enter');
      desktop.terminalOpen = true;
      desktop.active = 'terminal';
      desktop.terminalScreen = screen;
      desktop.notification = false;
    }
    renderLaptopWindows(focus);
  }
  function activateLaptopWindow(name, focus = false) {
    if (!usesLaptopMissionFlow() || !laptopWindows()[name + 'Open'] || (laptopWindows().active === name && !focus)) return;
    laptopWindows().active = name;
    renderLaptopWindows(focus);
  }
  function closeLaptopWindow(name) {
    const { mission } = game;
    if (!usesLaptopMissionFlow()) return;
    const desktop = laptopWindows();
    desktop[name + 'Open'] = false;
    desktop.active = desktop.terminalOpen ? 'terminal' : desktop.mailOpen ? 'mail' : null;
    desktop.notification = !desktop.active && !state.completed.has(mission.id);
    renderLaptopWindows(true);
  }
  function boundedWindowPosition(x, y, width, height, areaWidth, areaHeight) {
    return { x:Math.max(width / 2, Math.min(areaWidth - width / 2, x)), y:Math.max(height / 2, Math.min(areaHeight - height / 2, y)) };
  }
  function positionLaptopWindow(element, x, y) {
    const area = $('work-area').getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    const point = boundedWindowPosition(x, y, rect.width, rect.height, area.width, area.height);
    element.style.setProperty('--laptop-x', point.x + 'px');
    element.style.setProperty('--laptop-y', point.y + 'px');
  }
  function usesMobileClientFlow() {
    const { mission } = game;
    return mission.id === 'menu-semanal' && !window.matchMedia('(min-width:768px)').matches;
  }
  function missionEntryScreen() {
    return usesLaptopMissionFlow() || usesMobileClientFlow() ? 'notification' : 'mail'; }
  function openClientMail() {
    setMissionScreen(usesMobileClientFlow() ? 'profile' : 'chat'); }
  function openNotification() {
    if (usesLaptopMissionFlow()) { setMissionScreen('mail'); return; }
    if (state.notificationClosing) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setMissionScreen('mail'); return; }
    state.notificationClosing = true;
    $('mail-notification').classList.add('is-leaving');
    state.notificationTimer = setTimeout(() => {
      state.notificationTimer = null;
      state.notificationClosing = false;
      $('mail-notification').classList.remove('is-leaving');
      setMissionScreen('mail');
    }, 180);
  }
  function setMissionScreen(screen, focus = true) {
    if (usesLaptopMissionFlow()) { setLaptopMissionScreen(screen, focus); return; }
    if ((screen === 'notification' || screen === 'profile') && !usesMobileClientFlow()) screen = 'mail';
    document.body.dataset.missionScreen = screen;
    if (document.body.classList.contains('in-game') && (screen === 'chat' || (screen === 'mail' && window.matchMedia('(min-width:768px)').matches))) prepareConversation();
    const results = screen === 'results';
    $('prompt-form').hidden = results;
    $('results-panel').hidden = !results;
    $('execute').hidden = results;
    $('result-actions').hidden = !results;
    renderHistory(results);
    if (!focus || !document.body.classList.contains('in-game')) return;
    if (screen === 'notification') $('mail-notification').focus({ preventScroll:true });
    else if (screen === 'profile') $('read-client').focus({ preventScroll:true });
    else if (screen === 'mail') $('new-mail').focus({ preventScroll:true });
    else if (screen === 'chat') $('client-name').focus({ preventScroll:true });
    else if (results) $('terminal-scroll').focus({ preventScroll:true });
    else $('prompt').focus({ preventScroll:true });
  }
  function revealConversation() {
    if (state.chatTimer) clearTimeout(state.chatTimer);
    state.chatTimer = null;
    state.chatRevealed = true;
    $('client-guide').hidden = false;
  }
  function prepareConversation() {
    if (state.chatRevealed || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { revealConversation(); return; }
    if (state.chatTimer) return;
    $('client-guide').hidden = true;
    state.chatTimer = setTimeout(revealConversation, 600);
  }
  function renderHistory(results = false) {
    const { mission } = game;
    const attempts = state.history.get(mission.id) || [];
    const previous = results ? attempts.slice(0, -1) : attempts;
    $('terminal-history').hidden = previous.length === 0;
    $('history-items').replaceChildren(...previous.map(attempt => {
      const item = document.createElement('article');
      const score = document.createElement('p');
      score.className = 'tag';
      score.textContent = format(ui.score, { count:attempt.count, total:attempt.total || game.criteria.length });
      const prompt = document.createElement('pre');
      prompt.textContent = '> ' + attempt.prompt;
      item.append(score, prompt);
      return item;
    }));
  }
  function updateHintButtons() {
    const { mission } = game;
    for (const id of ['hint-button','result-hint']) {
      $(id).textContent = state.hints >= mission.hints.length ? ui.hintsDone : ui.hint;
      $(id).disabled = state.hints >= mission.hints.length;
    }
  }
  function requestHint(target) {
    const { mission } = game;
    if (state.hints >= mission.hints.length) return;
    const message = document.createElement('div');
    message.className = 'chat-message guide-message';
    const speaker = document.createElement('p');
    speaker.className = 'speaker';
    speaker.textContent = 'Epson_IA · ' + format(ui.hintNumber, { current:state.hints + 1 });
    const text = document.createElement('p');
    text.textContent = mission.hints[state.hints++];
    message.append(speaker, text);
    target.append(message);
    target.hidden = false;
    updateHintButtons();
    const scroller = target === $('hint') ? $('terminal-scroll') : $('chat-scroll');
    scroller.scrollTop += message.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
  }
  function presentResult(count) {
    const { mission } = game;
    const attempts = state.history.get(mission.id) || [];
    attempts.push({ prompt:$('prompt').value, count, total:game.criteria.length });
    state.history.set(mission.id, attempts);
    $('submitted-prompt').textContent = '> ' + $('prompt').value;
    $('sheet-score').textContent = format(ui.score, { count, total:game.criteria.length });
    $('result-announcement').textContent = format(ui.resultReady, { count, total:game.criteria.length });
    setMissionScreen('results');
    $('terminal-scroll').scrollTop = 0;
  }
  // Fin del flujo de misión.

  function renderMission() {
    const { mission, criteria } = game;
    state.desktop = null;
    for (const id of ['inbox-window','terminal-window']) {
      $(id).style.removeProperty('--laptop-x');
      $(id).style.removeProperty('--laptop-y');
    }
    if (state.chatTimer) clearTimeout(state.chatTimer);
    state.chatTimer = null;
    state.chatRevealed = false;
    $('client-guide').hidden = true;
    const values = { ...mission, number:missionNumber(mission) };
    for (const name of ['level','missionTitle']) document.querySelector(`[data-copy="${name}"]`).textContent = format(ui[name], values);
    if (state.notificationTimer) clearTimeout(state.notificationTimer);
    state.notificationTimer = null;
    state.notificationClosing = false;
    $('mail-notification').classList.remove('is-leaving');
    $('notification-sender').textContent = mission.client;
    $('notification-subject').textContent = mission.mailSubject || mission.title;
    $('profile-name').textContent = mission.client;
    $('profile-heading').textContent = ui.clientShortNames[mission.id] || mission.client;
    $('client-initials').textContent = ui.clientInitials[mission.id] || '';
    $('mail-sender').textContent = mission.client;
    $('mail-subject').textContent = mission.mailSubject || mission.title;
    $('mail-preview').textContent = mission.brief.slice(0, 60) + '…';
    $('client-name').textContent = mission.client;
    $('client-speaker').textContent = mission.client;
    $('brief').textContent = mission.brief;
    $('terminal-to').textContent = format(ui.terminalTo, mission);
    $('terminal-brief').textContent = format(ui.terminalBrief, mission);
    $('terminal-mission').textContent = format(ui.missionLabel, values);
    $('prompt').value = '';
    $('prompt').removeAttribute('aria-invalid');
    $('input-error').hidden = true;
    $('evaluating-line').hidden = true;
    $('hint').replaceChildren();
    $('hint').hidden = true;
    $('chat-hints').replaceChildren();
    $('chat-scroll').scrollTop = 0;
    $('terminal-scroll').scrollTop = 0;
    updateHintButtons();
    $('result-summary').textContent = ui.waiting;
    $('evaluation-mode').textContent = ['http:', 'https:'].includes(location.protocol) ? ui.pendingMode : ui.simulationTag;
    $('evaluation-notice').textContent = ui.limitations;
    for (const id of ['response','completion','guide-feedback','next-mission','view-graduation']) $(id).hidden = true;
    $('required-chips').replaceChildren(...mission.required.map(id => {
      const chip = document.createElement('li');
      chip.textContent = criteria.find(criterion => criterion.id === id).label;
      return chip;
    }));
    renderProgress();
    renderCriteria();
    updateEditor();
    setMissionScreen(missionEntryScreen(), false);
  }

  function advanceMission() {
    if (!selectMission(game, state.missionIndex + 1)) return;
    renderMission();
    setMissionScreen(missionEntryScreen());
  }
  function bindEvents() {
    // Interacciones exclusivas del escritorio; las posiciones no afectan al celular.
    for (const [id, name] of [['close-mail','mail'],['close-chat','mail'],['close-terminal','terminal']]) $(id).addEventListener('click', () => closeLaptopWindow(name));
    for (const name of ['mail','terminal']) {
      const element = $(name === 'mail' ? 'inbox-window' : 'terminal-window');
      $('task-' + name).addEventListener('click', () => activateLaptopWindow(name, true));
      element.addEventListener('pointerdown', () => activateLaptopWindow(name));
      element.addEventListener('focusin', () => {
        if (usesLaptopMissionFlow() && laptopWindows().active !== name) activateLaptopWindow(name);
      });
      element.addEventListener('animationend', event => { if (event.target === element) element.classList.remove('window-enter'); });
      for (const bar of element.querySelectorAll('.window-bar')) {
        let drag = null;
        bar.addEventListener('pointerdown', event => {
          if (!usesLaptopMissionFlow() || event.button !== 0 || event.target.closest('button')) return;
          element.classList.remove('window-enter');
          const rect = element.getBoundingClientRect(), area = $('work-area').getBoundingClientRect();
          drag = { x:event.clientX, y:event.clientY, centerX:rect.left - area.left + rect.width / 2, centerY:rect.top - area.top + rect.height / 2 };
          bar.setPointerCapture(event.pointerId);
          event.preventDefault();
        });
        bar.addEventListener('pointermove', event => {
          if (drag) positionLaptopWindow(element, drag.centerX + event.clientX - drag.x, drag.centerY + event.clientY - drag.y);
        });
        for (const type of ['pointerup','pointercancel','lostpointercapture']) bar.addEventListener(type, () => { drag = null; });
        bar.addEventListener('keydown', event => {
          if (!usesLaptopMissionFlow() || event.target !== bar || !['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) return;
          event.preventDefault();
          const rect = element.getBoundingClientRect(), area = $('work-area').getBoundingClientRect(), step = event.shiftKey ? 40 : 10;
          positionLaptopWindow(element, rect.left - area.left + rect.width / 2 + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0), rect.top - area.top + rect.height / 2 + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0));
        });
      }
    }
    const laptopQuery = window.matchMedia('(min-width:768px)');
    function updateLaptopTitlebars() {
      for (const bar of document.querySelectorAll('#inbox-window .window-bar, #terminal-window .window-bar')) {
        if (laptopQuery.matches) { bar.tabIndex = 0; bar.setAttribute('aria-label','Mover ventana con las flechas'); }
        else { bar.removeAttribute('tabindex'); bar.removeAttribute('aria-label'); }
      }
    }
    laptopQuery.addEventListener('change', () => {
      const previous = document.body.dataset.missionScreen;
      if (laptopQuery.matches) setMissionScreen(previous === 'profile' ? 'mail' : previous, false);
      else {
        const desktop = laptopWindows();
        setMissionScreen(desktop.active === 'terminal' ? desktop.terminalScreen : desktop.mailOpen ? desktop.mailScreen : missionEntryScreen(), false);
      }
      updateLaptopTitlebars();
    });
    window.addEventListener('resize', () => {
      if (!laptopQuery.matches) return;
      for (const id of ['inbox-window','terminal-window']) {
        const element = $(id);
        if (element.dataset.laptopOpen !== 'true') continue;
        const rect = element.getBoundingClientRect(), area = $('work-area').getBoundingClientRect();
        positionLaptopWindow(element, rect.left - area.left + rect.width / 2, rect.top - area.top + rect.height / 2);
      }
    });
    updateLaptopTitlebars();

    for (const id of ['new-mail','open-mail']) $(id).addEventListener('click', openClientMail);
    $('mail-notification').addEventListener('click', openNotification);
    $('read-client').addEventListener('click', () => setMissionScreen('chat'));
    $('back-profile').addEventListener('click', () => setMissionScreen('mail'));
    $('chat-scroll').addEventListener('click', revealConversation);
    $('chat-scroll').addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); revealConversation(); } });
    $('back-mail').addEventListener('click', () => setMissionScreen('mail'));
    $('start-prompt').addEventListener('click', () => setMissionScreen('terminal'));
    $('back-chat').addEventListener('click', () => setMissionScreen('chat'));
    $('retry-prompt').addEventListener('click', () => setMissionScreen('terminal'));
    $('hint-button').addEventListener('click', () => requestHint($('chat-hints')));
    $('result-hint').addEventListener('click', () => requestHint($('hint')));

    $('next-mission').addEventListener('click', advanceMission);
    $('desktop-continue').addEventListener('click', () => {
      if (state.completed.size === missions.length) onGraduation();
      else advanceMission();
    });

    $('prompt').addEventListener('input', () => {
      state.revision += 1;
      updateEditor();
      $('input-error').hidden = true;
      $('prompt').removeAttribute('aria-invalid');
    });

    $('prompt-form').addEventListener('submit', async event => {
      const { mission } = game;
      event.preventDefault();
      if (state.busy) return;
      const prompt = $('prompt').value;
      if (!prompt.trim() || prompt.length > 1500) {
        $('input-error').textContent = prompt.length > 1500 ? ui.tooLong : ui.empty;
        $('input-error').hidden = false;
        $('prompt').setAttribute('aria-invalid','true');
        $('prompt').focus();
        return;
      }
      setMissionScreen('terminal', false);
      state.busy = true;
      $('evaluating-line').hidden = false;
      const revision = state.revision;
      const executeButton = $('execute');
      executeButton.disabled = true;
      executeButton.textContent = ui.evaluating;
      $('result-summary').textContent = ui.evaluatingSummary;
      let evaluation;
      try {
        evaluation = await evaluateWithFallback(prompt);
      } finally {
        state.busy = false;
        $('evaluating-line').hidden = true;
        executeButton.disabled = false;
        executeButton.textContent = ui.execute;
      }
      // No aplicar una respuesta que llegó después de que el jugador editara el texto.
      if (state.revision !== revision) return;
      $('evaluation-mode').textContent = evaluation.mode;
      $('evaluation-notice').textContent = evaluation.ai ? ui.aiLimitations : ui.limitations;
      renderCriteria(evaluation.results);
      const firstMissing = evaluation.results.find(result => mission.required.includes(result.id) && !result.passed);
      $('guide-feedback').hidden = !firstMissing;
      $('guide-feedback-text').textContent = firstMissing ? ui.mentorTips[firstMissing.id] : '';
      const count = evaluation.results.filter(result => result.passed).length;
      const missing = evaluation.results.filter(result => mission.required.includes(result.id) && !result.passed).map(result => result.label).join(', ');
      $('result-summary').textContent = format(evaluation.passed ? ui.success : ui.retry, { count, missing, requiredCount:mission.required.length, total:game.criteria.length }) + (evaluation.feedback ? ' ' + evaluation.feedback : '');
      $('response').hidden = false;
      $('response-title').textContent = evaluation.passed ? ui.referenceTitle : ui.weakTitle;
      $('response-note').textContent = evaluation.passed ? ui.referenceNote : ui.weakNote;
      $('response-text').textContent = evaluation.passed ? mission.reference : mission.weakResponse;
      $('completion').hidden = !evaluation.passed;
      if (evaluation.passed) state.completed.add(mission.id);
      recordWork(prompt, evaluation);
      $('view-graduation').hidden = !evaluation.passed || state.completed.size !== missions.length;
      $('completion-text').textContent = state.completed.size === missions.length ? format(ui.allCompleted, { total:missions.length }) : mission.completion;
      $('client-reaction-name').textContent = mission.client;
      $('client-reaction').textContent = mission.thanks;
      $('next-client-preview').textContent = missions[state.missionIndex + 1] ? format(ui.nextClient, { client:missions[state.missionIndex + 1].client }) : '';
      $('next-mission').hidden = !evaluation.passed || state.missionIndex === missions.length - 1;
      renderProgress();
      presentResult(count);
    });
  }
  return { renderCriteria, updateEditor, renderProgress, usesLaptopMissionFlow, laptopWindows, renderLaptopWindows, setLaptopMissionScreen, activateLaptopWindow, closeLaptopWindow, boundedWindowPosition, positionLaptopWindow, usesMobileClientFlow, missionEntryScreen, openClientMail, openNotification, setMissionScreen, revealConversation, prepareConversation, renderHistory, updateHintButtons, requestHint, presentResult, renderMission, advanceMission, bindEvents };
}
