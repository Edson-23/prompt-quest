import { CONTENT } from './contenido.js';

export function recordWork(game, prompt, evaluation) {
  const { state, mission } = game;
  if (!evaluation.passed) return;
  state.portfolio.set(mission.id, {
    title:mission.title, client:mission.client, prompt, response:mission.reference,
    count:evaluation.results.filter(result => result.passed).length
  });
}

export function createPortfolioController(game, { document, onReturn }) {
  const { ui, missions } = CONTENT[game.language];
  const { state } = game;
  const $ = id => document.getElementById(id);
  function renderPortfolio(graduation) {
    $('portfolio-title').textContent = graduation ? ui.graduationTitle : ui.portfolioTitle;
    $('graduation-message').hidden = !graduation;
    $('portfolio-empty').hidden = state.portfolio.size > 0;
    const items = [];
    for (const work of state.portfolio.values()) {
      const item = document.createElement('details');
      item.className = 'portfolio-work';
      const summary = document.createElement('summary');
      summary.textContent = work.title + ' · ' + work.count + ' / 6';
      const client = document.createElement('p');
      client.className = 'small muted';
      client.textContent = work.client;
      item.append(summary, client);
      for (const [label, text] of [[ui.yourPrompt, work.prompt], [ui.fixedResponse, work.response]]) {
        const heading = document.createElement('h3');
        heading.textContent = label;
        const content = document.createElement('pre');
        content.textContent = text;
        item.append(heading, content);
      }
      items.push(item);
    }
    $('portfolio-items').replaceChildren(...items);
  }
  function showPortfolio(graduation = false) {
    if (graduation && state.completed.size !== missions.length) return;

    renderPortfolio(graduation);
    document.body.classList.remove('in-game');
    $('portfolio-screen').hidden = false;
    $('portfolio-title').focus();
  }
  function bindEvents() {
    $('open-portfolio').addEventListener('click', () => showPortfolio());
    $('view-graduation').addEventListener('click', () => showPortfolio(true));
    $('return-game').addEventListener('click', () => {
      $('portfolio-screen').hidden = true;
      document.body.classList.add('in-game');
      onReturn(document.body.dataset.missionScreen);
    });
  }
  return { renderPortfolio, showPortfolio, bindEvents };
}
