// html <-> js
const not_empty = (o) => o && (!!o.length || !!Object.keys(o).length);

const html = document.createElement.bind(document);
const text = document.createTextNode.bind(document);
// TODO...
const svg = document.createElementNS.bind(document, 'http://www.w3.org/2000/svg')
const math = document.createElementNS.bind(document, 'http://www.w3.org/1998/Math/MathML')

const namespaces = {
    html,
    svg,
    math
}

const extractShorthands = ([tag, attrs, children]) => {
    if (attrs.id) {
        tag += '#' + attrs.id
        delete attrs.id
    }

    if (attrs.class) {
        tag = [tag, ...attrs.class.split('\s')].join('.')
        delete attrs.class
    }

    return [tag, attrs, children]
}

export const HTML_to_JS = (el) => el.nodeType === Node.TEXT_NODE
    ? el.textContent.trim()
    : [
        el.tagName,
        Array.from(el.attributes || []).reduce((attrs, attr) => ({
            ...attrs,
            [attr.nodeName]: attr.nodeValue
        }), {}),
        ...Array.from(el.childNodes || []).map(HTML_to_JSON).filter(not_empty)
    ].map(extractShorthands).filter(not_empty)

export const parseTagShorthands = (s) => {
    const [namespace, tag] = s.match(/^(\w+:)?(\w+)/)?.slice?.(1) || ['html:', 'div']

    const attrs = [...s.matchAll(/[\.#]\w+/g)].reduce((o, [attr]) => attr.startsWith('.')
        ? {
            ...o,
            class: o.class ? o.class + ' ' + attr.slice(1) : attr.slice(1)
        }
        : {
            ...o,
            id: attr.slice(1)
        }, {})

    return [namespace?.slice?.(0, -1) || 'html', tag, attrs]
}

export const JS_to_HTML = (data, el) => {
    if (typeof data === 'string') return text(data)
    if (typeof data === 'number') return text(data)

    if (Array.isArray(data)) {
        const [namespace, tag, attrs] = parseTagShorthands(data.shift())

        if (not_empty(attrs)) data.unshift(attrs)

        return data.reduce((el, data) => {
            const child = JS_to_HTML(data, el)
            if (child && el !== child) el.appendChild(child)

            return el
        }, namespaces[namespace](tag))
    }

    if (data instanceof Function) return data(el)

    if (typeof data === 'object') return Object.entries(data).reduce(
        (el, [attr, value]) => {
            if (value instanceof Function) {
                value = value(el)
            }
            el.setAttribute(attr, value)
            return el
        }, el || node('div'))
}