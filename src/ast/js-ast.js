import actions from './ast-actions'
import $ from '../reactive/trkl'

const nodes = new Map()
let id = 0

const node = (__parent, __type, __values) => {
  const node = {
    id: id++,
    __parent,  // in which context was this created
    __type,    // what kind of node is this - single character, replaces '(' 
    __values   // recursive evaluated children
  }

  nodes.set(node.id, node)
  return node
}

const map = (arr = [], ...fn) => fn.reduce((res, fn) => res.map(fn), arr)

const serialize = (node) => nodeTypes[node.__type] + node.__values.map(serialize) + ']'

const deserialize = (code) => {
}

const interpret = () => {
}

const compile = () => { }

const deploy = () => { }

export default {
  node,
  serialize,
  deserialize,
  interpret,
  compile,
  deploy
}