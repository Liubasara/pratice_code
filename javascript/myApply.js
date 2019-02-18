Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') throw TypeError('类型错误')
  context = context || window
  context.fn = this
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}