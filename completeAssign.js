/* defineProperties vs defineProperty || getOwnPropertyDescriptors vs getOwnPropertyDescriptor || getOwnPropertySymbols
 - read more on this*/

function completeAssign(target, ...sources) {
  // your code here
  if (target == null) throw Error("target cannot be null or undefined");
  target = Object(target);

  for (let source of sources) {
    if (source == null) continue;

    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    for (let symb in Object.getOwnPropertySymbols(source)) {
      target[symb] = source[symb];
    }
  }
  return target;
}

// {
//   b: {
//     value: 4
//   },
//   c: {
//     value: 5,
//     enumerable: true
//   }
// }
