//event emitter has two functionalities. subscribing and emitting. subscribing is registering a event name and a callback
// for it. same event can have different callbacks. It returns a release. release is used to unsubscribe the particular
// callback for the event.

//emitting is to call the callbacks for the emmitted event.
// the fun at line 7 is the preffered way because for release when finding which object to remove, set is O(1), where as array.indexOf is O(n).
// storing the callback as object because set will remove duplicate. If not stored as obj only one callback would be in set.
// can present second approach first and then optimise to approach 1;
class EventEmitter {
  subscriptions = new Map();

  subscribe(eventName, callback) {
    if (!this.subscriptions.has(eventName)) {
      this.subscriptions.set(eventName, new Set());
    }
    const subscriptions = this.subscriptions.get(eventName);
    const callbackObj = { callback }; // store the callback ref here. If stored in release obj its not working. why?
    subscriptions.add(callbackObj);

    return {
      release: () => {
        subscriptions.delete(callbackObj);
        if (subscriptions.size === 0) {
          delete this.subscriptions.eventName;
        }
      },
    };
  }

  emit(eventName, ...args) {
    const subscriptions = this.subscriptions.get(eventName);
    if (subscriptions) {
      subscriptions.forEach((cbObj) => {
        cbObj.callback.apply(this, args);
      });
    }
  }
}

// please complete the implementation
class EventEmitter {
  constructor() {
    this.subscriptions = {};
  }
  subscribe(eventName, callback) {
    if (!(eventName in this.subscriptions)) {
      this.subscriptions[eventName] = [];
    }
    this.subscriptions[eventName].push(callback);
    return {
      release: () => {
        if (!(eventName in this.subscriptions)) {
          return;
        }
        this.subscriptions[eventName].splice(
          this.subscriptions[eventName].indexOf(callback),
          1
        );
      },
    };
  }

  emit(eventName, ...args) {
    if (!(eventName in this.subscriptions)) {
      return;
    }
    this.subscriptions[eventName].forEach((cb) => cb.apply(this, args));
  }
}

const emitter = new EventEmitter();
const callback1 = () => "test";
const sub1 = emitter.subscribe("event1", callback1);
const sub2 = emitter.subscribe("event1", callback1);
emitter.emit("event1", 1, 2, 3);
sub2.release();
