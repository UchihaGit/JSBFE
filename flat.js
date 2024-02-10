// For recursive its not hard, create and keep a new array and just loop over items check if it is an array and depth is > 0. if so recursivly call it else push it to new array

//For iterative then create new array and keep it. first need to create a stack of [items, depth]. The use while and pop out the stack one by one and check if item in it is an array if so loop again and decrease its depth and store it in stack, if not push it into new array.

// This is a JavaScript coding problem from BFE.dev
/**
 * @param { Array } arr
 * @param { number } depth
 * @returns { Array }
 */

//foreach
function flat(arr, depth = 1) {
  // your imeplementation here
  let result = [];
  arr.forEach((item) => {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flat(item, depth - 1));
    } else {
      result.push(item);
    }
  });
  console.log(result);
  return result;
}

//reduce
function flat(arr, depth = 1) {
  let test = arr.reduce((result, item) => {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flat(item, depth - 1));
    } else {
      result.push(item);
    }
    return result;
  }, []);
  return test;
}

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

// BRUTEFORE ITERATIVE IMPLEMENTATION
function flat(arr, depth = 1) {
  let result = arr.slice();

  if (depth === Infinity) {
    while (result.some(Array.isArray)) {
      result = result.reduce((acc, val) => acc.concat(Array.isArray(val) ? val : [val]), []);
    }
  } else {
    for (let i = 0; i < depth; i++) {
      result = result.reduce((acc, val) => {
        if(Array.isArray(val)){
          console.log('if ', val, acc)
          return acc.concat(val)
        } else {
          console.log('else ', [val], acc)
          return acc.concat([val])
        }
      }, []);
    }
  }

  return result;
}


//iterative
//todo
console.log(flat([1, [2], [3, [4]]]));
