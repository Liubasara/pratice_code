Function.prototype.myBind = function (context, ...args) {
  if (typeof context !== 'object' || typeof this !== 'function') throw TypeError('类型错误')
  context = context || window
  let _this = this
  return function (...otherArgs) {
    context.fn = _this
    let result
    result = context.fn(...args, ...otherArgs)
    delete context.fn
    return result
  }
}

var a = { name: 'myBind' }

function b (...args) {
  console.log(this.name)
  console.log('args: ', args)
}

b.myBind(a, [1, 2, 3, 4, 5])([5, 6, 7, 8])
