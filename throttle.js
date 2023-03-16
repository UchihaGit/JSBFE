// This is a JavaScript coding problem from BFE.dev

//in lodash_throttle only first time throttle is called immediately, the subsequent times, throttle remembers
// the args passed during window closed state and calls it.

// line 20 is there so that the calls made during the flag off state is remembered and called when flag is true
// callig the timer function again as throttle should ignore subsequent calls till wait period

/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @returns {(...args:any[]) => any}
 */
function throttle(func, wait) {
  // your code here
  let flag = true,
    lastArgs = null;
  return function (...args) {
    if (flag) {
      func.apply(this, args);
      flag = false;
      const timerFunc = () => {
        setTimeout(() => {
          if (lastArgs) {
            func.apply(this, lastArgs);
            lastArgs = null;
            flag = false;
            timerFunc();
          } else {
            flag = true;
          }
        }, wait);
      };
      timerFunc();
    } else {
      lastArgs = args;
    }
  };
}
