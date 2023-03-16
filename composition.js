//Composition is, bunch of function called one by one and each of the values returned by that function is passed as an argument
//to the next function. at the end it returns the final value

//composition computes one value and passes that to the next function

/**
 * @param {Array<(arg: any) => any>} funcs
 * @return {(arg: any) => any}
 */
function pipe2(funcs) {
  // your code here
  return (a) => {
    let result = a;
    for (let i = 0; i <= funcs.length - 1; i++) {
      result = funcs[i](result);
    }
    return result;
  };
}

function pipe(funcs) {
  return function (arg) {
    return funcs.reduce((result, func) => {
      return func.call(this, result);
    }, arg);
  };
}

// expect(pipe([
//   times(2),
//   times(3)
// ])(2)).toBe(12)
