// This is a JavaScript coding problem from BFE.dev

/**
 * @param {any[]} arr
 * @returns {void}
 */
function shuffle2(arr) {
  // modify the arr inline to change the order randomly
  let newArr,
    randomIdx,
    randIdxArr = [];
  newArr = [...arr];
  const randomIdxGenerator = (item) => {
    console.log("item ", item);
    randomIdx = Math.floor(Math.random() * arr.length);
    console.log(randomIdx);
    if (randIdxArr.includes(randomIdx)) randomIdxGenerator(item);
    else {
      arr[randomIdx] = item;
      randIdxArr.push(randomIdx);
      console.log(randIdxArr, arr);
    }
  };
  newArr.forEach((item) => {
    randomIdxGenerator(item);
  });
  return arr;
}

// remember to go decreasingly.
function shuffle(arr) {
  // modify the arr inline to change the order randomly
  let j;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1)); // + 1 here because random wont generrate arr[i] value, so incrementing
    console.log(i, j);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  console.log(arr);
}

console.log(shuffle([1, 2, 3, 4]));
