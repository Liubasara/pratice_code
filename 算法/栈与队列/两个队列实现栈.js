var CStack = function() {
  // 只能使用 push 和 shift
  this.queue1 = [] // 一个队列负责入栈
  this.queue2 = [] // 一个队列负责在出栈的时候保存剩余队列
};

/** 找到当前不为空的一个队列进行压栈，如果两者都为空，则往 queue1 进行压栈
* @param {number} value
* @return {void}
*/
CStack.prototype.appendTail = function(value) {
  if (this.queue2.length !== 0) {
    this.queue2.push(value)
  } else {
    this.queue1.push(value)
  }
};

/**
* @return {number}
*/
CStack.prototype.deleteTail = function() {
  if (this.queue1.length === 0 && this.queue2.length === 0) return -1
  const curQueue = this.queue1.length > 0 ? this.queue1 : this.queue2
  const anotherQueue = this.queue1.length > 0 ? this.queue2 : this.queue1
  while (curQueue.length > 1) {
    anotherQueue.push(curQueue.shift())
  }
  return curQueue.shift()
};

/**
* Your CQueue object will be instantiated and called as such:
* var obj = new CStack()
* obj.appendTail(value)
* var param_2 = obj.deleteTail()
*/
var obj = new CStack()
console.log(obj.deleteTail())
obj.appendTail(1)
obj.appendTail(2)
obj.appendTail(3)
obj.appendTail(4)
console.log(obj.deleteTail())
console.log(obj.deleteTail())
console.log(obj.deleteTail())
console.log(obj.deleteTail())
console.log(obj.deleteTail())
