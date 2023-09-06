/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function any(promises) {
  // your code here
  if (!promises.length) throw new AggregateError("No Promise passed");

  //this should work but not running in the bfe platform. why
  // return new Promise((resolve, reject) => {
  //   let errors = [];
  //   promises.forEach((promise, index) => promise
  //    .then(value => resolve(value))
  //    .catch(err => {
  //       errors[index] = err;
  //       if(results.length === promise.length){
  //         reject(new AggregateError('No Promise in Promise.any was resolved', errors))
  //       }
  //     })
  //   )
  // })

  return new Promise((resolve, reject) => {
    let settledCount = 0,
      errors = [];
    promises.forEach((promise, index) =>
      promise
        .then((data) => resolve(data))
        .catch((err) => {
          errors[index] = err;
          if (++settledCount === promises.length)
            reject(
              new AggregateError(
                "No Promise in Promise.any was resolved",
                errors
              )
            );
        })
    );
  });
}
