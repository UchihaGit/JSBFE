// Keep track of all scheduled timeouts
const scheduledTimeouts = [];

// Override the original setTimeout function to keep track of scheduled timeouts
const originalSetTimeout = window.setTimeout;
window.setTimeout = function (func, delay) {
  const timeoutId = originalSetTimeout(func, delay);
  scheduledTimeouts.push(timeoutId);
  return timeoutId;
};

// Implement the clearAllTimeout function to clear all scheduled timeouts
function clearAllTimeout() {
  for (let i = 0; i < scheduledTimeouts.length; i++) {
    clearTimeout(scheduledTimeouts[i]);
  }
  scheduledTimeouts.length = 0;
}

// Example usage
setTimeout(() => console.log("func1"), 10000);
setTimeout(() => console.log("func2"), 10000);
setTimeout(() => console.log("func3"), 10000);

// All scheduled timeouts will be cleared after 5 seconds
setTimeout(() => clearAllTimeout(), 5000);
