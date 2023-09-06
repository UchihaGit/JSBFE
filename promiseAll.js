/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 */
function all(promises) {
  // your code here
  return new Promise((resolve, reject) => {
    let result = [];
    if (promises.length === 0) {
      resolve(result);
      return;
    }
    promises.forEach((promise) =>
      Promise.resolve(promise).then((value) => {
        result.push(value);
        if (result.length === promises.length) {
          resolve(result);
        }
      }, reject)
    );
  });
}

// console.log(all([1, 2, 3, Promise.resolve(4)]));
// console.log(all([Promise.resolve(4)]));
all([1, 2, 3, Promise.resolve(4)]).then((values) => {
  console.log(values);
});
