function flat1(arr, depth = 1) {
  // your imeplementation here
  let results = [];
  arr.forEach((item) =>
    Array.isArray(item) && depth > 0
      ? results.push(...flat(item, depth - 1))
      : results.push(item)
  );
  return results;
}

function flat(arr, depth = 1) {
  // [[1,1] [[2],1], [[3, [4]],1]]
  // [[[2],1], [[3, [4]],1]]
  // [[2,0], [[3, [4]],1]]
  // [[[3, [4]],1]]
  // [[3, 0], [[4], 0]]

  const result = [];
  const stack = [...arr.map((item) => [item, depth])];
  console.log(stack);
  while (stack.length > 0) {
    const [top, depth] = stack.pop();
    console.log("outside ", top, depth);
    if (Array.isArray(top) && depth > 0) {
      stack.push(
        ...top.map((item) => {
          console.log("inside ", item, depth);
          return [item, depth - 1];
        })
      );
      console.log(stack);
    } else {
      result.push(top);
    }
  }

  return result.reverse();
}

const arr = [1, [2], [3, [4]]];
console.log(flat(arr));
