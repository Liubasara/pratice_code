Function.prototype.myApply = function (context, args = []) {
  if ( typeof context !== 'object' || typeof this !== 'function') throw TypeError('类型错误')
  context = context || window
  context.fn = this
  let result
  result = context.fn(...args)
  delete context.fn
  return result
}

var a = { name: 'myApply' }

function b (...args) {
  console.log(this.name)
  console.log('args: ', args)
}

b.myApply(a, [1, 2, 3, 4, 5])
