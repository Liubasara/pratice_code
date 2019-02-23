Function.prototype.myBind = function (context) {
  if (typeof context !== 'function') throw new TypeError('类型错误')
  const args = [...arguments].slice(1)
  var _this = this
  return function F () {
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
