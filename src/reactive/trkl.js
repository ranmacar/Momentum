var computedTracker = []

let index = 0
export default function trkl(value) {
  var self = function (...args) {
    return args.length
      ? write(args[0])
      : read()
  };

  self.index = index++
  self.value = value
  self.subs = []

  self.sub = (subscriber, immediate) => {
    if (!~self.subs.indexOf(subscriber)) {
      self.subs.push(subscriber)
    }
    if (immediate) {
      subscriber(self.value)
    }
  }

  self.unsub = subscriber => {
    remove(self.subs, subscriber)
  };

  function write(newValue, comp) {
    // console.log('WRITING: ', self.value, newValue, comp)
    if (newValue === self.value && (
      value === null ||
      typeof self.value !== 'object' ||
      comp && comp(newValue, self.value))) {
      return
    }

    // console.log('WROTE: ', self.value, newValue)

    var oldValue = self.value
    self.value = newValue

    for (let i = self.subs.length - 1; i > -1; i--) {
      // Errors will just terminate the effects
      self.subs[i](self.value, oldValue)
    }
  }

  function read() {
    var runningComputation = computedTracker[computedTracker.length - 1]
    if (runningComputation) {
      self.sub(runningComputation)
    }
    // console.log('READ: ', self.value, runningComputation?.fn)
    return self.value
  }

  return self
}

trkl.circular = new Set()
trkl.computed = fn => {
  var self = trkl()
  self.computed = () => {
    if (computedTracker.indexOf(self.computed) > -1) {
      trkl.circular.add(self)
      debugger
      return
    }

    let result
    computedTracker.push(self.computed)

    try {
      result = fn(self.value)
    } catch (e) {
      console.log(e, self)
      result = null
    } finally {
      computedTracker.pop()
      self(result)
    }
  }

  self.computed.self = self
  self.computed()

  return self
};

trkl.from = executor => {
  var self = trkl()
  executor(self)
  return self
};

function remove(array, item) {
  var position = array.indexOf(item)
  if (position > -1) {
    array.splice(position, 1)
  }
}