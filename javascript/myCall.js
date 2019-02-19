Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') throw new TypeError('类型错误') // 正常来说不是Function类型的也调用不到这个方法，但这一步只是判断意思一下，语义作用大于实际作用
  context = context || window // 当context等于null的时候，执行上下文应该是全局对象
  context.fn = this // 这一步用于把当前函数的执行上下文变成传入的对象
  const arg = [...arguments].slice(1) // 传入参数解析：去掉arguments[0]即传入的执行上下文，其余的就是要传入的参数
  const result = context.fn(...arg) // 执行函数：此时的函数在传入的执行上下文中执行
  delete context.fn // 执行完毕，解除引用
  return result
}