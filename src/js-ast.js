import actions from './ast-actions'
import $ from './trkl'

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

/*
lispy script

reactive composition language with datatypes
interactive ast editor

insert datatypes with symbols.
  [ - array
    { - map
      ( - set
        # - number    
        @ - time          
        ' - string    -- single line
        " - text      -- multi line
        
        : - function call
        < - function definition
        
    . - lookup 
    
    save code as json? 
    */
const serialize = (node) => nodeTypes[node.__type] + node.__values.map(serialize) + ']'

const deserialize = (code) => {
  // parse the code...
}

// create a reactive evaluation of the ast tree
const interpret = () => {
  // 
}

// the interpreter stores metadata while its running
// the compiler splits code into backend / frontend and prepares deployable chunks  
const compile = () => { }

// deploy to firebase?
const deploy = () => { }

export default {
  node,
  serialize,
  deserialize,
  interpret,
  compile,
  deploy
}