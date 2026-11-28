import { CONTENT, getMissionCriteria } from './contenido.js';

export const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();

export function evaluatePrompt(prompt, mission = CONTENT.es.missions[0], criteria = getMissionCriteria(mission)) {
  const normalized = normalize(prompt);
  const results = criteria.map(criterion => ({ ...criterion, passed:criterion.patterns.some(pattern => pattern.test(normalized)) }));
  return { results, passed:mission.required.every(id => results.find(result => result.id === id).passed) };
}

export function createEvaluator(game, {
  fetch = globalThis.fetch, location = globalThis.location, AbortController = globalThis.AbortController,
  setTimeout = globalThis.setTimeout, clearTimeout = globalThis.clearTimeout
} = {}) {
  const { ui, state } = game;
  async function evaluateWithFallback(prompt) {
    const { mission, criteria } = game;
    const fallback = () => ({ ...evaluatePrompt(prompt, mission, criteria), mode:ui.fallbackMode, feedback:'', ai:false });
    if (!['http:', 'https:'].includes(location.protocol)) {
      return { ...fallback(), mode:ui.simulationTag };
    }
    const key = JSON.stringify([mission.id, prompt]);
    if (state.cache.has(key)) return { ...state.cache.get(key), mode:ui.cachedMode };
    const now = Date.now();
    state.requests = state.requests.filter(time => now - time < 60000);
    if (state.requests.length >= 5) return fallback();
    state.requests.push(now);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 9000);
    try {
      const response = await fetch('/api/evaluar', {
        method:'POST', headers:{ 'Content-Type':'application/json' }, signal:controller.signal,
        body:JSON.stringify({ prompt, mision:{ id:mission.id, encargo:mission.brief, obligatorios:mission.required } })
      });
      if (!response.ok) throw new Error('unavailable');
      const data = await response.json();
      if (typeof data?.retroalimentacion !== 'string' || !data.retroalimentacion.trim()
        || data.retroalimentacion.length > 1200
        || !criteria.every(criterion => typeof data.criterios?.[criterion.id] === 'boolean'
          && typeof data.comentarios?.[criterion.id] === 'string'
          && data.comentarios[criterion.id].trim().length > 0
          && data.comentarios[criterion.id].length <= 600)) throw new Error('invalid');
      const results = criteria.map(criterion => ({ ...criterion, passed:data.criterios[criterion.id], feedback:data.comentarios[criterion.id] }));
      const evaluation = { results, passed:mission.required.every(id => data.criterios[id]), feedback:data.retroalimentacion, mode:ui.aiMode, ai:true };
      if (state.cache.size >= 50) state.cache.delete(state.cache.keys().next().value);
      state.cache.set(key, evaluation);
      return evaluation;
    } catch {
      return fallback();
    } finally {
      clearTimeout(timer);
    }
  }
  return evaluateWithFallback;
}
