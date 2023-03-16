// here data needs to be updated immutably. So new objects or arrays needs to be created.
// newObj[key] will hold all the return values from recursive call and builds a new copy.

/**
 * @param {any} data
 * @param {Object} command
 */
function update(data, command) {
  // your code here
  // let [key] = Object.keys(command);
  let newObj = {},
    newArr = [];
  for (let key in command) {
    console.log(key, data, command);

    switch (key) {
      case "$push":
        return [...data, ...command[key]];
      case "$set":
        return (data = command[key]);
      case "$merge":
        if (!(data instanceof Object)) {
          throw Error("bad merge");
        }
        return { ...data, ...command[key] };
      case "$apply":
        return command[key](data);
    }
    if (typeof data == "object" && !Array.isArray(data)) {
      newObj = { ...data };
      newObj[key] = update(data[key], command[key]);
      return newObj;
    } else {
      newArr = [...data];
      newArr[key] = update(newArr, command[key]);
      return newArr;
    }
  }

  // return data;
}

// update([1], {$push: [2, 3]})
update({ a: [1] }, { a: { b: { $merge: { e: 5 } } } });
