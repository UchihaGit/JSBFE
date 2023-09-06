/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function parallel(funcs) {
  return function (callback) {
    if (funcs.length === 0) {
      callback();
      return;
    }

    const result = [];
    let waitFor = funcs.length;
    let doneWithError = undefined;
    funcs.forEach((func, index) => {
      func((err, data) => {
        if (doneWithError) {
          return;
        }

        if (err) {
          doneWithError = err;
          callback(doneWithError);
          return;
        }

        result[index] = data;
        waitFor--;
        if (waitFor === 0) {
          callback(undefined, result);
        }
      });
    });
  };
}

//solution 2

const promisify = (fn) => (input) =>
  new Promise((res, rej) => {
    fn((err, output) => (err ? rej(err) : res(output)), input);
  });

function parallel(fns) {
  return (cb, input) => {
    Promise.all(fns.map((fn) => promisify(fn)(input)))
      .then((outputs) => cb(undefined, outputs))
      .catch((err) => cb(err, undefined));
  };
}
