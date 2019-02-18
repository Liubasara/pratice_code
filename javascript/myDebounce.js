const myDebounce = (func, wait = 50) => {
  let timer = 0
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

const test = document.getElementById('test')
test.onclick = myDebounce(() => {console.log('click')}, 3000)