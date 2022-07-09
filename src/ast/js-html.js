// html <-> js
const not_empty = (o) => o && (!!o.length || !!Object.keys(o).length);

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

export const parseTagShorthands = (s) => {
    const tag = s.match(/^\w+/)?.[0] || 'div'
    const attrs = [...s.matchAll(/[\.#]\w+/g)].reduce((o, [attr]) => attr.startsWith('.')
        ? {
            ...o,
            class: o.class ? o.class + ' ' + attr.slice(1) : attr.slice(1)
        }
        : {
            ...o,
            id: attr.slice(1)
        }, {})
    return [tag, attrs]
}

export const JS_to_HTML = (data, el) => {
    if (typeof data === 'string') return text(data)
    if (typeof data === 'number') return text(data)

    if (Array.isArray(data)) {
        const [tag, attrs] = parseTagShorthands(data.shift())
        if (not_empty(attrs)) data.unshift(attrs)
        return data.reduce((el, data) => {
            const child = JS_to_HTML(data, el)
            if (el !== child) el.appendChild(child)
            return el
        }, node(tag))
    }

    if (data instanceof Function) return JS_to_HTML(data(el))

    if (typeof data === 'object') return Object.entries(data).reduce(
        (el, [attr, value]) => {
            el.setAttribute(attr, value)
            return el
        }, el || node('div'))
}