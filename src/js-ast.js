var computedTracker = [];
function trkl(value) {
  var subscribers = [];

  var self = function (...args) {
    return args.length
      ? write(args[0])
      : read();
  };

  self.subs = subscribers; // expose for runtime goodness :)

  // declaring as a private function means the minifier can scrub its name on internal references
  var subscribe = (subscriber, immediate) => {
    if (!~subscribers.indexOf(subscriber)) {
      subscribers.push(subscriber);
    }
    if (immediate) {
      subscriber(value);
    }
  }

  // Using string keys tells Uglify that we intend to export these symbols
  self['sub'] = subscribe;

  self['unsub'] = subscriber => {
    remove(subscribers, subscriber);
  };

  function write(newValue, comp) {
    if (newValue === value && (
      value === null ||
      typeof value !== 'object' ||
      comp && comp(newValue, value))) {
      return;
    }

    var oldValue = value;
    value = newValue;

    for (let i = subscribers.length - 1; i > -1; i--) {
      // Errors will just terminate the effects
      subscribers[i](value, oldValue);
    }
  }

  function read() {
    var runningComputation = computedTracker[computedTracker.length - 1];
    if (runningComputation) {
      subscribe(runningComputation[0]);
    }
    return value;
  }

  return self;
}
trkl['computed'] = fn => {
  var self = trkl();
  var computationToken = [runComputed]

  runComputed();
  return self;

  function runComputed() {
    detectCircularity(computationToken);
    computedTracker.push(computationToken);
    var errors, result;
    try {
      result = fn();
    } catch (e) {
      errors = e;
    }
    computedTracker.pop();
    if (errors) {
      throw errors;
    }
    self(result);
  }
};
trkl['from'] = executor => {
  var self = trkl();
  executor(self);
  return self;
};
function detectCircularity(token) {
  if (computedTracker.indexOf(token) > -1) {
    throw Error('Circular computation');
  }
}
function remove(array, item) {
  var position = array.indexOf(item);
  if (position > -1) {
    array.splice(position, 1);
  }
}
/////////// ^^ TRKL with mods ^^
import { JS_to_HTML } from "./js-html";

const nodes = new Map()
let id = 0

const astNode = (__parent, __type, __values) => {
  const node = {
    id: id++,
    __parent,  // in which context was this created
    __type,    // what kind of node is this - single character, replaces '(' 
    __values   // recursive evaluated children
  }

  nodes.set(node.id, node)
  return node
}

const root = astNode(null, 'main', trkl([]))
const cursor = trkl(root)

const render = (node) => JS_to_HTML(
  ...['div', {
    class: 'node ' + node.__type
  }, node.__values?.map?.(render)]
)

const rootEl = document.querySelector('#root')
rootEl.prepend(render(root))

const actions = {
  create(current, type) {
    const node = ast(current, type, [])
    cursor(node)
  },
  duplicate(current) {

  },
  delete(current) {
    const values = current.__parent.__values
    const index = values.indexOf(current)
    if (values.length) {
      actions.navigate.prev(current)
    } else {
      actions.navigate.up(current)
    }
    values.splice(index, 1)
  },
  wrap(current, type) {

  },
  unwrap(current) {

  },
  navigate: {
    up(current) {
      cursor(current.__parent)
    },
    down(current) {
      cursor(current.__values[0] || current)
    },
    next(current, value = 1) {
      const values = current.__parent.__values
      const index = value.indexOf(current)
      current(values[(values.length + index + value) % values.length])
    },
    prev(current) {
      actions.navigate.next(current, -1)
    }
  },
  move: {
    up() {

    },
    down() {

    },
    forward() {

    },
    back() {

    }
  },
  history: {
    undo() {

    },
    redo() {

    },
    commit() {

    },
    merge() {

    },
  }
}

const serialize = (node) => {
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
  return nodeTypes[node.__type] + node.__values.map(serialize) + ']'
}

const deserialize = (code) => {
  // parse the code...
}

const interpret = () => {
  // 
}

const compile = () => { }