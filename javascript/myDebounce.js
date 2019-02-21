const myDebounce = (func, wait = 50) => {
  let timer
  return function (...args) {
    if (typeof timer !== 'undefined') clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

const test = document.getElementById('test')
test.onclick = myDebounce(() => {console.log('click')}, 3000)