// This is a JavaScript coding problem from BFE.dev

/**
 * @param {string[][]} message
 * @return {string}
 */

// keep two trackers row and index. row is the array and index is the index
// identify when goes out of bound
// increment i
// identify when goes out of bound
// decrement i
// when no element of message[row][index] exists, return
function decode2(message) {
  // your code here
  let row = (index = 0);
  let key = "",
    matrixLength = message.length - 1,
    goTop = false;
  while (message[row][index]) {
    key = key + message[row][index];
    if (row < matrixLength && !goTop) {
      row = row + 1;
    } else if (message[row - 1]) {
      row = row - 1;
      goTop = true;
    } else {
      goTop = false;
      row = row + 1;
    }
    index = index + 1;
  }
  return key;
}

function decode(message) {
  let i = 0,
    j = 0,
    cols = message[0]?.length;
  let decoded = "",
    step = 1;

  while (j < cols) {
    decoded += message[i][j];
    if (!message[i + step]) {
      // remember this condition
      step *= -1;
    }
    i += step;
    console.log(i, step);

    j++;
  }

  return decoded;
}
let message = [
  ["I", "B", "C", "A", "L", "K", "A"],
  ["D", "R", "F", "C", "A", "E", "A"],
  ["G", "H", "O", "E", "L", "A", "D"],
];

// message = [["A"]];
console.log(decode(message));
