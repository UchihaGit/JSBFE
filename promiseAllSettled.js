/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
// not using result.push as each promise may resolve at different times.
function allSettled(promises) {
  // your code here
  return new Promise((resolve) => {
    let result = [];
    if (promises.length === 0) return resolve(result);
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(
          (value) => (result[index] = { value: value, status: "fulfilled" })
        )
        .catch((err) => (result[index] = { reason: err, status: "rejected" }))
        .finally(() => {
          if (result.length === promises.length) resolve(result);
        });
    });
  });
}
