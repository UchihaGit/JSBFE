function sequencePromise(funcs) {
  const promiseFuncs = funcs.map(promisify);
  return function (callback, input) {
    // init promise
    let promise = Promise.resolve(input);
    console.log(promise);

    // add all promiseFuncs to promise
    promiseFuncs.forEach((promiseFunc) => {
      promise = promise.then(promiseFunc);
    });

    // handle resolved or rejected promise
    promise
      .then((data) => {
        callback(undefined, data);
      })
      .catch(callback);
  };
}

function promisify(callback) {
  return function (input) {
    return new Promise((resolve, reject) => {
      console.log(callback, input);
      callback((err, data) => {
        if (err) {
          reject(err);
          return;
        }
        console.log(data);
        resolve(data);
      }, input);
    });
  };
}

//here it works cause of let and closure.
//https://dev.to/levimeahan/closures-scope-and-the-settimeout-for-loop-question-5bl6#:~:text=The%20article%20explains%20%2D%20Closures%20(aka,that%20environment%2Fscope%20stops%20running.
function sequenceRecursive(funcs) {
  return function (callback, data) {
    let nextFuncIndex = 0;
    const callNextFunc = (data) => {
      // when no more function is to be called
      if (nextFuncIndex === funcs.length) {
        callback(undefined, data);
        return;
      }
      // if error , callback right way
      // if not error, recursively callNextFunc
      const nextFunc = funcs[nextFuncIndex];
      nextFuncIndex += 1;

      nextFunc((error, newData) => {
        if (error) {
          callback(error, undefined);
        } else {
          callNextFunc(newData);
        }
      }, data);
    };

    callNextFunc(data);
  };
}

const times2 = (callback, num) => {
  setTimeout(() => callback(null, num * 2), 100);
};

const times3 = (callback, num) => {
  setTimeout(() => callback(null, num * 3), 100);
};

const plus2 = (callback, num) => {
  setTimeout(() => callback(null, num + 2), 100);
};

const thunk = sequence([times2, times3, plus2]);
thunk((error, data) => {
  console.log(data);
}, 1);
