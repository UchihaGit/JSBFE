/* brute force is fine. 
    another approach is to call Object prototype and make the data to string. which gives somethin like "[object string]".
    using string manupalation we can then retrive the datatype.s
*/

/**
 * @param {any} data
 * @return {string}
 */
function detectType(data) {
  if (data instanceof FileReader) return "object";
  return Object.prototype.toString
    .call(data)
    .slice(1, -1)
    .split(" ")[1]
    .toLowerCase();
}

//mine

/**
 * @param {any} data
 * @return {string}
 */
function detectType1(data) {
  // your code here
  if (data === null) return "null";
  if (Array.isArray(data)) return "array";
  if (data instanceof Number) return "number";
  if (data instanceof Boolean) return "boolean";
  if (data instanceof Boolean) return "boolean";
  if (data instanceof ArrayBuffer) return "arraybuffer";
  if (data instanceof Date) return "date";
  if (data instanceof Map) return "map";
  if (data instanceof Set) return "set";
  if (data instanceof String) return "string";

  return typeof data;
}
