// curry_placeholder;

// Currying with a Placeholder:

// When you curry a function with a placeholder, you allow partial application of arguments using the placeholder (_ in this case).
// For example, in curriedJoin(_, 2)(1, 3), the goal is to replace the placeholders in the first call with actual values from the subsequent calls.

function curry(fn) {
  return function curried(...args) {
    // if number of arguments match
    console.log("curry args ", args);
    if (
      args.length >= fn.length &&
      args.slice(0, fn.length).every((item) => item !== curry.placeholder)
    ) {
      return fn.call(this, ...args);
    }

    // otherwise return a function which merges the args
    return function (...nextArgs) {
      console.log(nextArgs);
      const mappedArgsTo = args.map((item) =>
        item === curry.placeholder && nextArgs.length ? nextArgs.shift() : item
      );
      console.log("mappedarr ", mappedArgsTo);
      return curried.call(this, ...mappedArgsTo, ...nextArgs); //here function is called and then returned so line 15 is returned from here
    };
  };
}
curry.placeholder = Symbol();

const _ = curry.placeholder;

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};

const curriedJoin = curry(join);

// curriedJoin(1)(2)(3); // '1_2_3'
// // curriedJoin(3)(2)(1) // '3_2_1'

console.log(curriedJoin(_, _, _)(1)(_, 2)(3));
//curriedJoin(_, 1)(_, 3)(_, 2) // '1_2_3' (_, 1, 3, 2)
// let a = curriedJoin(_, 1);

// console.log(a);
// b = a(_, 3);
// console.log(b);
// c = b(_, 2);
// console.log(c);
// c();
// curriedJoin(1, 2)(3) // '1_2_3'
