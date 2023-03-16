//To build a queue out of stack u need to keep 2 stacks. One to push and one to pop. depends on enqueue/dequeue or other operations
//move items one to another.
//initially after enqueue all item will be in pushStack. when needed to read or remove, move to all items to pop stack

/* you can use this Class which is bundled together with your code

class Stack {
  push(element) { // add element to stack }
  peek() { // get the top element }
  pop() { // remove the top element}
  size() { // count of element }
}
*/

/* Array is disabled in your code */

// you need to complete the following Class
class Queue {
  constructor() {
    this.pushStack = new Stack();
    this.popStack = new Stack();
  }
  enqueue(element) {
    // add new element to the rare
    this.pushStack.push(element);
  }
  _move() {
    while (this.pushStack.size()) {
      this.popStack.push(this.pushStack.pop());
    }
  }
  peek() {
    // get the head element
    // stack.peek()
    if (this.popStack.size() > 0) {
      return this.popStack.peek();
    }
    if (this.pushStack.size() > 0) {
      this._move();
      return this.popStack.peek();
    }
    return undefined;
  }
  size() {
    // return count of element
    // stack.size()
    return this.pushStack.size() + this.popStack.size();
  }
  dequeue() {
    // remove the head element
    // stack.pop()
    if (this.popStack.size() > 0) {
      return this.popStack.pop();
    }
    if (this.pushStack.size() > 0) {
      this._move();
      return this.popStack.pop();
    }
    return undefined;
  }
}

// const stack = new Stack([1,2,3,4,5]);

// console.log(stack.push([3,4,5]))
// console.log(stack.pop())
