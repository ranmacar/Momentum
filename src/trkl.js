var computedTracker = [];

export default function trkl(value) {
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