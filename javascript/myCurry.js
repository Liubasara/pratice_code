/**
 * 参考链接：[JavaScript专题之函数柯里化](https://github.com/mqyqingfeng/Blog/issues/42)
 * @param {Function} fn
 * @param {number} length
 * @returns {Function}
 */
function myCurry (fn, length) {
  length = length || fn.length
  return function (...args) {
    if (args.length < length) {
      return myCurry(fn.bind(this, ...args), length - args.length)
    } else {
      return fn.apply(this, args)
    }
  }
}

var a = myCurry(function (a, b, c) {return a + b + c})

console.log(a(1, 2, 3))
console.log(a(1, 2)(3))
console.log(a(1)(2, 3))
