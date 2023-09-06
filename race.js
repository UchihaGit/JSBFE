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
function race(funcs) {
  // your code here
  return function (finalCB, value) {
    let finished = false;
    const customCB = (err, val) => {
      if (finished) return;
      if (err) {
        finalCB(err, undefined);
        finished = true;

        return;
      }
      finalCB(undefined, val);
      finished = true;
    };
    funcs.forEach((fn) => fn(customCB));
  };
}
