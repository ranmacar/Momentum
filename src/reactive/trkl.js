var computedTracker = []

let index = 0
export default function trkl(value) {
  var subscribers = []

  var self = function (...args) {
    return args.length
      ? write(args[0])
      : read()
  };

  self.index = index++;
  self.value = value;
  self.subs = subscribers; // expose for runtime goodness :)

  var subscribe = (subscriber, immediate) => {
    if (!~subscribers.indexOf(subscriber)) {
      subscribers.push(subscriber);
    }
    if (immediate) {
      subscriber(self.value);
    }
  }

  self.sub = subscribe;

  self.unsub = subscriber => {
    remove(subscribers, subscriber);
  };

  function write(newValue, comp) {
    // console.log('WRITING: ', self.value, newValue, comp)
    if (newValue === self.value && (
      value === null ||
      typeof self.value !== 'object' ||
      comp && comp(newValue, self.value))) {
      return;
    }

    // console.log('WROTE: ', self.value, newValue)

    var oldValue = self.value;
    self.value = newValue;

    for (let i = subscribers.length - 1; i > -1; i--) {
      // Errors will just terminate the effects
      subscribers[i](self.value, oldValue);
    }
  }

  function read() {
    var runningComputation = computedTracker[computedTracker.length - 1];
    if (runningComputation) {
      subscribe(runningComputation);
    }
    // console.log('READ: ', self.value, runningComputation?.fn)
    return self.value;
  }

  return self;
}

trkl.circular = new Set()
trkl.computed = fn => {
  var self = trkl();

  function runComputed() {
    if (computedTracker.indexOf(runComputed) > -1) {
      trkl.circular.add(runComputed)
      return
    }

    let result
    computedTracker.push(runComputed);

    try {
      result = fn(self.value);
    } catch (e) {
      console.log(e, self)
      result = null
    } finally {
      computedTracker.pop();
      self(result);
    }
  }

  runComputed.fn = fn
  runComputed();

  return self;
};

trkl.from = executor => {
  var self = trkl();
  executor(self);
  return self;
};

function remove(array, item) {
  var position = array.indexOf(item);
  if (position > -1) {
    array.splice(position, 1);
  }
}