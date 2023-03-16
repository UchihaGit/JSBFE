/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
/* defineProperties vs defineProperty || getOwnPropertyDescriptors vs getOwnPropertyDescriptor || getOwnPropertySymbols
 - read more on this*/

function objectAssign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new Error("Not an object");
  }

  if (typeof target !== `object`) {
    target = Object(target);
  }

  for (const source of sources) {
    if (source === null || source === undefined) {
      continue;
    }

    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));

    for (const symbol of Object.getOwnPropertySymbols(source)) {
      target[symbol] = source[symbol];
    }
  }
  return target;
}

function objectAssign2(target, ...sources) {
  if (target === null || target === undefined)
    throw new Error("invalid target");

  let result = target;
  if (["number", "string", "boolean"].includes(typeof target)) {
    result = Object(target);
  }

  for (const source of sources) {
    if (source === null || source === undefined) continue;
    const keys = [
      ...Object.keys(source),
      ...Object.getOwnPropertySymbols(source).filter(
        (item) => Object.getOwnPropertyDescriptor(source, item).enumerable
      ),
    ];
    for (const key of keys) {
      if (!Reflect.set(result, key, source[key])) {
        throw new Error("cannot assign to read-only properties");
      }
    }
  }
  return result;
}
