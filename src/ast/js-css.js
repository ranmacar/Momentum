export const style = (...styles) => (...el) => Array.from(el)
  .map(element => element && Object.assign(element.style, ...styles)).false