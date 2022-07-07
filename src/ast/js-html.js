// html <-> js
const not_empty = (o) => o && (!!o.length || Object.keys(o).length);

const node = document.createElement.bind(document);
const text = document.createTextNode.bind(document);

export const HTML_to_JS = (el) => el.nodeType === Node.TEXT_NODE
  ? el.textContent.trim()
  : [
    el.tagName,
    Array.from(el.attributes || []).reduce((attrs, attr) => ({
      ...attrs,
      [attr.nodeName]: attr.nodeValue
    }), {}),
    ...Array.from(el.childNodes || []).map(HTML_to_JSON).filter(not_empty)
  ].filter(not_empty)

export const JS_to_HTML = (tag, ...data) => data.reduce((el, data) => {
  if (typeof data === 'string') { el.appendChild(text(data)) }

  else if (typeof data === 'number') { el.appendChild(text(data)) }

  else if (Array.isArray(data)) { el.appendChild(JS_to_HTML(...data)) }

  else if (data instanceof Function) { data(el) }

  else if (typeof data === 'object') { Object.entries(data).forEach(([attr, value]) => el.setAttribute(attr, value)) }

  return el;
}, node(tag))