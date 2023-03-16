// this is like jquery.

// For example, below chained call turns button into a black button with white text.

// $('#button')
//   .css('color', '#fff')
//   .css('backgroundColor', '#000')
//   .css('fontWeight', 'bold')
// The chaining makes the code simple to read, could you create a simple wrapper $ to make above code work as expected?

// The wrapper only needs to have css(propertyName: string, value: any)

/**
 * @param {HTMLElement} el - element to be wrapped
 */
function $(el) {
  return {
    css: function (property, value) {
      el.style[property] = value;
      return this;
    },
  };
}
