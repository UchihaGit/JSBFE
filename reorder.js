function sort(items, newOrder) {
  // [ 'F', 'A',  'E', 'D', 'C', 'B']
  // keep swaping, until all elements are updated

  for (let i = 0; i < newOrder.length; i++) {
    console.log(newOrder[i], i);
    while (newOrder[i] !== i) {
      const to = newOrder[i];
      [newOrder[i], newOrder[to]] = [newOrder[to], newOrder[i]];
      [items[i], items[to]] = [items[to], items[i]];
      console.log(A);
      console.log(B);
      console.log("---------------");
    }
  }
}

const A = ["A", "B", "C", "D", "E", "F"];
const B = [1, 5, 4, 3, 2, 0];
sort(A, B);
console.log(A);
