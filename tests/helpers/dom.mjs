import { readFile } from 'node:fs/promises';
const html = await readFile(new URL('../../index.html', import.meta.url), 'utf8');

export function createDocument({ desktop = false } = {}) {
  const nodes = new Map(), copies = [], media = [];
  const classes = () => {
    const values = new Set();
    return { add:name => values.add(name), remove:name => values.delete(name), contains:name => values.has(name) };
  };
  class Element {
    constructor(tag = 'div') {
      this.tagName = tag.toUpperCase(); this.dataset = {}; this.attributes = {};
      this.children = []; this.handlers = {}; this.hidden = false; this.value = ''; this.textContent = '';
      this.classList = classes(); this.style = { setProperty(){}, removeProperty(){} }; this.scrollTop = 0;
    }
    setAttribute(name,value) { this.attributes[name] = value; }
    getAttribute(name) { return this.attributes[name] ?? null; }
    removeAttribute(name) { delete this.attributes[name]; }
    replaceChildren(...items) { this.children = items; }
    append(...items) { this.children.push(...items); }
    focus() { document.activeElement = this; }
    getBoundingClientRect() { return { top:0, left:0, width:400, height:300 }; }
    addEventListener(type,callback) { (this.handlers[type] ||= []).push(callback); }
    async emit(type) { for (const callback of this.handlers[type] || []) await callback({ target:this, preventDefault(){} }); }
    querySelectorAll() { return []; }
  }
  for (const [,tag,attributes] of html.matchAll(/<([a-z][\w-]*)\b([^>]*?)>/gi)) {
    const node = new Element(tag);
    const id = attributes.match(/\bid="([^"]+)"/)?.[1];
    const copy = attributes.match(/\bdata-copy="([^"]+)"/)?.[1];
    node.hidden = /\shidden(?:\s|$)/.test(attributes);
    for (const [,name,value] of attributes.matchAll(/([\w-]+)="([^"]*)"/g)) node.setAttribute(name,value);
    if (id) { node.id = id; nodes.set(id,node); }
    if (copy) { node.dataset.copy = copy; copies.push(node); }
  }
  const document = {
    body:{ classList:classes(), dataset:{} }, activeElement:null, hidden:false,
    createElement:tag => new Element(tag), getElementById:id => nodes.get(id),
    querySelector:selector => copies.find(node => selector === `[data-copy="${node.dataset.copy}"]`),
    querySelectorAll:selector => selector === '[data-copy]' ? copies : [],
    addEventListener(){}
  };
  const window = {
    location:{ protocol:'http:' }, Image:class {}, addEventListener(){},
    matchMedia(query) {
      const result = { matches:query.includes('min-width') ? desktop : true, addEventListener(){} };
      media.push(result); return result;
    }
  };
  return { document, window, nodes };
}
