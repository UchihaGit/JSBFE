// This is a JavaScript coding problem from BFE.dev

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */

// leading - first call and after every subsequent delay first letter is executed
// trailing - after delay call is executed
function debounce(func, wait, option = { leading: false, trailing: true }) {
  // your code here
  let timer,
    blockLeading = true;
  return function (...args) {
    if (option.leading && blockLeading) {
      blockLeading = false;
      func(...args);
      return;
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      blockLeading = true;
      option.trailing && func.apply(this, args);
    }, wait);
  };
}
