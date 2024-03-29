function myNew(fn, ...args) {
  if (typeof fn !== 'function') throw Error('myNew arg0 has not accept a function')
  // 相当于 const obj = {};obj.__proto__ = fn.prototype
  // 或是 ES6 的 const obj = Object.setPrototypeOf({}, fn.prototype)
  const obj = Object.create(fn.prototype)
  const res = fn.apply(obj, args)
  return (typeof res === 'object' && res !== null) ? res : obj
}

;(() => {
  function A() {
    this.a = 'aa'
  }
  
  const a = myNew(A)
  console.log('is A instance', a instanceof A)
  console.log('a.a', a.a)
})()