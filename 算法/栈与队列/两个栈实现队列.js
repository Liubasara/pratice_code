var CQueue = function() {
  // 只能使用 push 和 pop
  this.stack1 = [] // 一个栈负责入列
  this.stack2 = [] // 另一个栈负责出列
};

/** 
* @param {number} value
* @return {void}
*/
CQueue.prototype.appendTail = function(value) {
  this.stack1.push(value)
};

/**
* @return {number}
*/
CQueue.prototype.deleteHead = function() {
  if (this.stack1.length === 0 && this.stack2.length === 0) return -1
  if (this.stack2.length > 0) return this.stack2.pop()
  while (this.stack1.length > 0) {
      this.stack2.push(this.stack1.pop())
  }
  
  return this.stack2.pop()
};

/**
* Your CQueue object will be instantiated and called as such:
* var obj = new CQueue()
* obj.appendTail(value)
* var param_2 = obj.deleteHead()
*/