//throttle here

function throttle(func, wait, option = { leading: true, trailing: true }) {
  // your code here
  let lastArgs = null,
    flag = true;

  return function (...args) {
    if (flag) {
      if (option.leading) {
        func.apply(this, args);
      }
      flag = false;
      const timerFunc = () => {
        setTimeout(() => {
          if (option.trailing && lastArgs) {
            func.apply(this, lastArgs);
            lastArgs = null;
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
