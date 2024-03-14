function getSingle (fn) {
  let single
  return function (...args) {
    return single || (single = fn.apply(this, args))
  }
}

function MyTestObj () {
  return {}
}

const getSingleTestObj = getSingle(MyTestObj)

console.log(getSingleTestObj() === getSingleTestObj())

console.log(MyTestObj() === MyTestObj())
