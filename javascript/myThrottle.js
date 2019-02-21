const myThrottle = function (func, wait = 50) {
  let lastTime = 0
  return function (...args) {
    let now = new Date()
    if (now - lastTime > wait) {
      lastTime = now
      func.apply(this, args)
    }
  }
}

// 使用setTimeOut的另一种写法
const myThrottle2 = function (func, wait = 50) {
  var canRun = true
  return function (...args) {
    if (!canRun) {
      return
    } else {
      canRun = false
      func.apply(this, args) // 将方法放在外面, 这样即便该函数是异步的，也可以保证在下一句之前执行
      setTimeout(function () {canRun = true}, wait)
    }
  }
}

setInterval(myThrottle(() => console.log('hi'), 1000), 1)