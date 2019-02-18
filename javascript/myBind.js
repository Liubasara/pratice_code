Function.prototype.myBind = function (context) {
  if (typeof context !== 'function') throw new TypeError('类型错误')
  const args = [...arguments].slice(1)
  return function () {
    return this.call(context)
  }
}