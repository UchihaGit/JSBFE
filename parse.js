function parse1(str) {
  // your code here
  if (str === "") {
    throw Error("empty stuff");
  }
  if (str[0] === "'") {
    throw Error();
  }
  if (str === "null") {
    return null;
  }
  if (str === "{}") {
    return {};
  }
  if (str === "[]") {
    return [];
  }
  if (str === "true") {
    return true;
  }
  if (str === "false") {
    return false;
  }
  if (str[0] === '"') {
    return str.slice(1, -1);
  }
  if (+str === +str) {
    return Number(str);
  }
  if (str[0] === "{") {
    return str
      .slice(1, -1)
      .split(",")
      .reduce((acc, item) => {
        let splitIndex = item.indexOf(":");
        let key = item.slice(0, splitIndex);
        let value = item.slice(splitIndex + 1);
        acc[parse(key)] = parse(value);
        return acc;
      }, {});
  }
  if (str[0] === "[") {
    // console.log(str.slice(1,-1).split(','))
    return str
      .slice(1, -1)
      .split(",")
      .map((item) => parse(item));
  }
}
