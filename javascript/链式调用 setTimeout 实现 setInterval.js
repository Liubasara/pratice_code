function test () {
  console.log('test code!')
}

function answer (func, times, wait) {
  let timer = setTimeout(function wrapper () {
    func.call(this)
    if (--times) {
      // timer = setTimeout(arguments.callee, wait)
      timer = setTimeout(wrapper, wait)
    } else {
      clearTimeout(timer)
    }
  }, wait)
}

answer(test, 10, 1000)
