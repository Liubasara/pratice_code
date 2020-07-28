var a = [
  { name: 'errorCode', type: 'number' },
  { name: 'errmsg', type: 'string' },
  { name: 'data', type: 'object' },
  { name: 'data.app', type: 'object' },
  { name: 'data.version', type: 'number' },
  { name: 'data.app.name', type: 'string' },
  { name: 'data.app.deepObj', type: 'object' },
  { name: 'data.app.deepObj.name', type: 'string' },
]

function _get (obj, ...args) {
  if (args.length <= 0) return obj
  const target = obj[args.shift()]
  if (target) {
    return _get(target, ...args)
  } else {
    return
  }
}

function parseArrToJson (arr, obj = {}) {
  if (arr.length === 0) return JSON.stringify(obj)
  const ele = arr.shift()
  const eleNameArr = ele.name.split('.')
  const len = eleNameArr.length
  if (len === 1) {
    if (ele.type === 'object') {
      obj[eleNameArr[0]] = {}
    } else {
      obj[eleNameArr[0]] = ""
    }
    return parseArrToJson(arr, obj)
  } else {
    const parentObj = _get.apply(null, [obj].concat(eleNameArr.slice(0, len - 1)))
    if (parentObj && typeof parentObj === 'object') {
      if (ele.type === 'object') {
        parentObj[eleNameArr[len - 1]] = {}
      } else {
        parentObj[eleNameArr[len - 1]] = ""
      }
      return parseArrToJson(arr, obj)
    }
  }
  return parseArrToJson(arr, obj)
}


console.log(parseArrToJson(a))