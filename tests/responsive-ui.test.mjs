import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const source = html.split('// Presentación responsiva:')[1].split('</script>')[0];
const controller = source.slice(source.indexOf('const desktopLayout'));

// Probar transiciones de presentación sin depender de Gemini ni de un navegador instalado.
function setup({ desktop = false, popover = true } = {}) {
  const document = { activeElement: null };
  class Element {
    constructor(id) {
      this.id = id;
      this.hidden = false;
      this.disabled = false;
      this.isConnected = true;
      this.children = [];
      this.attributes = {};
      this.properties = {};
      this.listeners = {};
      this.classes = new Set();
      this.classList = { add: x => this.classes.add(x), remove: x => this.classes.delete(x), contains: x => this.classes.has(x) };
      this.style = { setProperty: (key, value) => { this.properties[key] = value; } };
    }
    append(node) {
      if (node.parentElement) node.parentElement.children = node.parentElement.children.filter(child => child !== node);
      node.parentElement = this;
      this.children.push(node);
    }
    prepend(node) { this.append(node); this.children.unshift(this.children.pop()); }
    after(node) {
      const parent = this.parentElement;
      parent.append(node);
      parent.children.pop();
      parent.children.splice(parent.children.indexOf(this) + 1, 0, node);
    }
    contains(node) { return this === node || this.children.some(child => child.contains(node)); }
    matches() { return !!this.popoverOpen; }
    showPopover() { this.popoverOpen = true; }
    hidePopover() { this.popoverOpen = false; }
    setAttribute(key, value) { this.attributes[key] = value; }
    addEventListener(event, callback) { this.listeners[event] = callback; }
    focus() { document.activeElement = this; }
    getBoundingClientRect() { return this.id === 'execute' ? { top: 480, bottom: 525, height: 45 } : { height: 72 }; }
    scrollIntoView() {}
  }
  if (popover) Element.prototype.popover = 'manual';
  class Dialog extends Element { show() { this.open = true; } close() { this.open = false; } }
  const names = ['desktop-results', 'results-panel', 'results-content', 'open-result', 'last-result', 'result-toast', 'toast-count', 'result-announcement', 'hint', 'hint-button', 'close-results', 'close-toast', 'prompt-form', 'execute', 'sheet-score', 'sheet-edit-note', 'criteria'];
  const nodes = Object.fromEntries(names.map(id => [id, new Element(id)]));
  nodes['result-sheet'] = new Dialog('result-sheet');
  document.body = new Element('body');
  document.activeElement = document.body;
  document.querySelector = () => nodes.execute;
  nodes['desktop-results'].append(nodes['results-panel']);
  nodes['results-panel'].append(nodes['close-results']);
  nodes['results-panel'].append(nodes['results-content']);
  nodes['results-content'].append(nodes.hint);
  nodes['results-content'].append(nodes.criteria);
  const media = { matches: desktop, addEventListener() {} };
  const context = vm.createContext({
    document, HTMLElement: Element, HTMLDialogElement: Dialog,
    window: { innerHeight: 740, matchMedia: () => media, addEventListener() {} }, innerHeight: 740,
    ResizeObserver: class { observe() {} },
    requestAnimationFrame: callback => callback(),
    $: id => nodes[id],
    format: (template, { count }) => template.replace('{count}', count),
    ui: { resultCount: '{count} de 6 criterios cumplidos', resultReady: '{count} de 6 criterios cumplidos. Resultado disponible.' },
  });
  vm.runInContext(controller, context);
  return { nodes, media, document, run: code => vm.runInContext(code, context) };
}

test('en móvil solo aparece el aviso cuando termina una evaluación', () => {
  const { nodes, run } = setup();
  assert.equal(nodes['results-panel'].parentElement.id, 'result-sheet');
  assert.equal(nodes['result-toast'].popoverOpen, undefined);
  run('presentResult(4)');
  assert.equal(nodes['toast-count'].textContent, '4 de 6 criterios cumplidos');
  assert.equal(nodes['result-toast'].popoverOpen, true);
  assert.equal(nodes['result-sheet'].popoverOpen, undefined);
  assert.equal(nodes['last-result'].hidden, false);
  assert.equal(nodes['sheet-score'].textContent, '4 / 6 criterios');
  assert.equal(nodes['sheet-score'].classList.contains('is-incomplete'), true);
});

test('abrir y cerrar la hoja conserva un acceso permanente y devuelve el foco', () => {
  const { nodes, document, run } = setup();
  run('presentResult(6)');
  run("openResults($('open-result'))");
  assert.equal(nodes['result-toast'].popoverOpen, false);
  assert.equal(nodes['result-sheet'].popoverOpen, true);
  assert.equal(document.activeElement.id, 'close-results');
  run('closeResults()');
  assert.equal(nodes['result-sheet'].popoverOpen, false);
  assert.equal(document.activeElement.id, 'last-result');
  assert.equal(nodes['last-result'].attributes['aria-expanded'], 'false');
});

test('el aviso se puede descartar sin perder el resultado y editar elimina el aviso obsoleto', () => {
  const { nodes, run } = setup();
  run('presentResult(3)');
  nodes['close-toast'].listeners.click();
  assert.equal(nodes['result-toast'].popoverOpen, false);
  assert.equal(nodes['last-result'].hidden, false);
  run("openResults($('last-result'))");
  run('resetResultPresentation()');
  assert.equal(nodes['last-result'].hidden, true);
  assert.equal(nodes['result-sheet'].popoverOpen, true);
  assert.equal(nodes['sheet-edit-note'].hidden, false);
  run('resetResultPresentation()');
  assert.equal(nodes['result-sheet'].popoverOpen, true);
});

test('volver a ejecutar actualiza la hoja abierta sin tapar el editor ni mostrar otro aviso', () => {
  const { nodes, document, run } = setup();
  run('presentResult(2)');
  run("openResults($('open-result'))");
  run('resetResultPresentation()');
  nodes.execute.focus();
  run('presentResult(6)');
  assert.equal(nodes['result-sheet'].popoverOpen, true);
  assert.equal(nodes['result-toast'].popoverOpen, false);
  assert.equal(nodes['sheet-edit-note'].hidden, true);
  assert.equal(nodes['sheet-score'].textContent, '6 / 6 criterios');
  assert.equal(nodes['sheet-score'].classList.contains('is-incomplete'), false);
  assert.equal(document.activeElement, nodes.execute);
});

test('cruzar 768 px mueve el mismo resultado y cierra las superficies móviles', () => {
  const { nodes, media, run } = setup();
  run('presentResult(5)');
  run("openResults($('open-result'))");
  const panel = nodes['results-panel'];
  media.matches = true;
  run('syncResultLayout()');
  assert.equal(panel.parentElement, nodes['desktop-results']);
  assert.deepEqual(nodes['results-content'].children.map(node => node.id), ['hint', 'criteria']);
  assert.equal(nodes['result-sheet'].popoverOpen, false);
  assert.equal(nodes['result-toast'].popoverOpen, false);
  media.matches = false;
  run('syncResultLayout()');
  assert.equal(panel.parentElement, nodes['result-sheet']);
  assert.equal(nodes['results-content'].children[0].id, 'criteria');
  assert.equal(nodes['last-result'].hidden, false);
});

test('en escritorio los resultados se muestran sin aviso ni hoja', () => {
  const { nodes, run } = setup({ desktop: true });
  run('presentResult(2)');
  assert.equal(nodes['results-panel'].parentElement.id, 'desktop-results');
  assert.equal(nodes['result-toast'].popoverOpen, undefined);
  assert.equal(nodes['result-sheet'].popoverOpen, undefined);
});

test('sin Popover nativo funciona la hoja y su cierre con Escape', () => {
  const { nodes, run, document } = setup({ popover: false });
  run('presentResult(6)');
  assert.equal(nodes['result-toast'].classList.contains('fallback-open'), true);
  run("openResults($('open-result'))");
  assert.equal(nodes['result-sheet'].open, true);
  nodes['result-sheet'].listeners.keydown({ key: 'Escape', preventDefault() {} });
  assert.equal(nodes['result-sheet'].open, false);
  assert.equal(document.activeElement.id, 'last-result');
});
