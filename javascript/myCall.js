Function.prototype.myCall = function (context, ...args) {
  if (typeof context !== 'object' || typeof this !== 'function') throw TypeError('类型错误')
  let result
  context = context || window
  context.fn = this
  result = context.fn(...args)
  delete context.fn
  return result
}

var a = { name: 'myCall' }

function b (...args) {
  console.log(this.name)
  console.log('args: ', args)
}

b.myCall(a, [1, 2, 3, 4, 5])
