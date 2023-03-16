//memo returns a new memoized function. memo remembers the previously calculated value inside a map and when same args
// is passed it returns the value from the map;

//memo takes second arg - resolver, which generates random key for our map to store. If it is not passed we can create one
// ourselves

/**
 * @param {Function} func
 * @param {(args:[]) => string }  [resolver] - cache key generator
 */
function memo(func, resolver) {
  // your code here
  let map = {};
  return function (...args) {
    let cacheKey = resolver
      ? resolver(...arguments)
      : Array.from(arguments).join(",");
    if (cacheKey in map) {
      return map[cacheKey];
    } else {
      map[cacheKey] = func.apply(this, args);
      return map[cacheKey];
    }
  };
}

// if we care about "this"

function memo(func, resolver) {
  // your code here
  const cache = new Map();

  // Map<cacheKey, Map<context, value>>
  return function () {
    const cacheKey = resolver
      ? resolver(...arguments)
      : Array.from(arguments).join(",");

    const contextMap = cache.get(cacheKey);
    // If there is a corresponding context map to cachekey
    // Check if context is in the map, if so, return value.
    // Else if no corresponding add contextMap, add new entry to the context map
    if (!contextMap) {
      const value = func.apply(this, arguments);
      cache.set(cacheKey, new Map([[this, value]]));
      return value;
    }

    if (contextMap.has(this)) {
      return contextMap.get(this);
    }
    // If context not in the map, calculate and add to context map.
    const value = func.apply(this, arguments);
    contextMap.set(this, value);
    return value;
  };
}

function testThis(a) {
  return `${this.val}_${a}`;
}

const memoFunc = memo(testThis);

const testSubject = {
  val: 1,
  memo: memoFunc,
};

const testSubject2 = {
  val: 2,
  memo: memoFunc,
};

// 1_1
console.log(testSubject.memo(1));
// Expected no caching and output is 2_1
console.log(testSubject2.memo(1));
// Expected to cache
console.log(testSubject2.memo(1));
