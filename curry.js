// curry takes a function as a argument and returns new function. It uses fn.length to get the length of the args the parent will
// be receiving. based of that if the args passed to the inner func matches with the func.length call the passes function otherwise
// bind the value to the inner fuc and return them

// here we are binding to store the args received.

/**
 * @param {Function} func
 */
function curry(func) {
  return function curried(...args) {
    console.log(args, func.length);
    // 1. if enough args, call func
    // 2. if not enough, bind the args and wait for new one

    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      // 1,2
      return curried.bind(this, ...args);
    }
  };
}

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};

const curriedJoin = curry(join);

// curriedJoin(1, 2, 3) // '1_2_3'

curriedJoin(1)(2, 3); // '1_2_3'

// curriedJoin(1, 2)(3) // '1_2_3'
