import vm from 'node:vm';
import { createGame } from '../../js/app.js';
import { createEvaluator, evaluatePrompt } from '../../js/evaluacion.js';
import { selectMission } from '../../js/misiones.js';
import { recordWork } from '../../js/portafolio.js';

// Las expresiones del test observan los módulos reales; no se extrae código del HTML.
export function createTestSession({ fetch, protocol = 'https:', ...overrides } = {}) {
  const game = createGame();
  const evaluateWithFallback = createEvaluator(game, { fetch, location:{ protocol }, ...overrides });
  const sandbox = {
    state:game.state,
    selectMission:index => selectMission(game, index),
    evaluatePrompt:prompt => evaluatePrompt(prompt, game.mission, game.criteria),
    evaluateWithFallback,
    recordWork:(prompt, evaluation) => recordWork(game, prompt, evaluation)
  };
  Object.defineProperties(sandbox, {
    mission:{ get:() => game.mission },
    criteria:{ get:() => game.criteria }
  });
  const context = vm.createContext(sandbox);
  return { game, context, run:code => vm.runInContext(code, context), evaluate:evaluateWithFallback };
}
