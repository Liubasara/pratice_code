Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') throw new TypeError('类型错误')
  context = context || window
  context.fn = this
  const arg = [...arguments].slice(1)
  const result = context.fn(...arg)
  delete context.fn
  return result
}