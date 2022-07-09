export const jss = (el, ...styles) => (el instanceof HTMLElement ? [el] : Array.from(document.querySelectorAll(el)))
  .map(element => Object.assign(element.style, ...styles)).false

const pathMerge = (o, path, value) => {
  let target = o;
  let prop;
  for (let i = 0; i < path.length; i++) {
    prop = path[i]
    target[prop] = target[prop] || {}

    if (i === path.length - 1) {
      target[prop] = value;
    } else {
      target = target[prop]
    }
  }
  return o;
}

const parseCSSValues = (value) => {
  const units = /(\d+)([a-zA-Z%]+)/
  if (value.indexOf('(') > 0) return value; // ignore functions 
  const parts = value.split(/\s/).map(part => {
    const match = part.match(units);
    return match ? [parseFloat(match[1]), match[2]] : part
  })
  return parts.length === 1 ? parts[0] : parts
}

export const CSS_to_JS = (sheet) => Array.from(sheet.cssRules)
  .filter(rule => rule.type === 1)
  .reduce((rules, rule) => ({
    ...rules,
    [rule.selectorText]: Array.from(rule.style)
      .reduce(
        (styles, prop) => {
          const props = prop.split('-');
          const value = rule.style[prop];

          return pathMerge(styles, props, parseCSSValues(value))
        },
        {}
      )
  })
    , {})


const JS_to_CSS = (js) => {
  // eventually..
}