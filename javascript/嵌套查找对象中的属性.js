function _get(obj, ...args) {
  try {
    if (!obj) throw Error()
    if (args.length === 0) return obj
    return _get(obj[args.shift()], ...args)
  } catch(e) {
    return undefined
  }
}

console.log(_get({a: {b: {d: 1}}}, 'a', 'b', 'd'))
console.log(_get({a: {b: {d: 1}}}, 'a', 'b'))
console.log(_get({a: {b: {d: 1}}}, 'a', 'b', 'c'))
