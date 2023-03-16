// This function has items and excludes. things in excludes must be excluded from items array and returned.
// function excludeItems(items, excludes) {
//   excludes.forEach((pair) => {
//     items = items.filter((item) => item[pair.k] === item[pair.v]);
//   });

//   return items;
// }
// Given an input of array,
// which is made of items with >= 3 properties

let items = [
  { color: "red", type: "tv", age: 18 },
  { color: "silver", type: "phone", age: 20 },
  { color: "blue", type: "book", age: 17 },
];

// an exclude array made of key value pair
const excludes = [
  { k: "color", v: "silver" },
  { k: "type", v: "tv" },
];

function excludeItems(items, excludes) {
  const excludeMap = new Map();
  excludes.forEach((item) => {
    if (!excludeMap.has(item.k)) {
      excludeMap.set(item.k, new Set());
    }
    excludeMap.get(item.k).add(item.v);
  });
  console.log(excludeMap);
  return items.filter((item) => {
    return Object.keys(item).every(
      (key) => !excludeMap.has(key) || !excludeMap.get(key).has(item[key])
    );
  });
}

console.log(excludeItems(items, excludes));
