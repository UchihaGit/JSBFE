// function flat1(arr, depth = 1) {
//   // your imeplementation here
//   let results = [];
//   arr.forEach((item) =>
//     Array.isArray(item) && depth > 0
//       ? results.push(...flat(item, depth - 1))
//       : results.push(item)
//   );
//   return results;
// }

// function flat(arr, depth = 1) {
//   // [[1,1] [[2],1], [[3, [4]],1]]
//   // [[[2],1], [[3, [4]],1]]
//   // [[2,0], [[3, [4]],1]]
//   // [[[3, [4]],1]]
//   // [[3, 0], [[4], 0]]

//   const result = [];
//   const stack = [...arr.map((item) => [item, depth])];
//   console.log(stack);
//   while (stack.length > 0) {
//     const [top, depth] = stack.pop();
//     console.log("outside ", top, depth);
//     if (Array.isArray(top) && depth > 0) {
//       stack.push(
//         ...top.map((item) => {
//           console.log("inside ", item, depth);
//           return [item, depth - 1];
//         })
//       );
//       console.log(stack);
//     } else {
//       result.push(top);
//     }
//   }

//   return result.reverse();
// }

// const arr = [1, [2], [3, [4]]];
// console.log(flat(arr));

function sequence(funcs) {
  return function (cb, data) {
    const customCB = (err, data) => {
      return (err, data) => {
        if (err) {
          cb(err);
          return;
        }
        return data;
      };
    };
    let result = funcs.reduce((acc, curr) => {
      console.log(acc, curr);
      let computedData = curr(customCB(undefined, acc), acc);
      console.log(computedData);
      return computedData;
    }, data);
    console.log(result);
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

// const times2 = (callback, num) => {
//   console.log(callback);
//   return callback(null, num * 2);
// };

// const times3 = (callback, num) => {
//   return callback(null, num * 3);
// };

// const plus2 = (callback, num) => {
//   return callback(null, num + 2);
// };

const thunk = sequence([times2, times3, plus2]);
thunk((error, data) => {
  console.log(data);
}, 10);
