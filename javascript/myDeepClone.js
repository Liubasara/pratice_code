// 自定义方法用于判断Object和Array
function isObject (obj) {
  return typeof obj === 'object' && obj !== null
}

function myDeepClone (source, hash = new WeakMap()) {
  if (!isObject(source)) return source // 非Object和Array直接返回它的值
  if (hash.has(source)) return hash.get(source) // 若hash表中有该对象，则直接返回该对象的值(解决循环引用)
  
  let target = Array.isArray(source) ? [] : {}
  hash.set(source, target)
  
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = myDeepClone(source[key], hash) // 递归调用，传入hash表
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}