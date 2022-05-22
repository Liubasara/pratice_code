// @ts-check
/**
 * 
 * @param {Function} fn 
 * @param {number} delay 
 * @param  {...any} args 
 */
function customSetTimeout(fn, delay = 0, ...args) {
  const that = this
  const startTime = +Date.now()
  let timer
  const loop = () =>{
    const now = +Date.now()
    if (now - startTime >= delay) {
      fn.call(that, ...args)
    } else {
      timer = window.requestAnimationFrame(loop)
    }
  }
  const cancelTimer = () => {
    window.cancelAnimationFrame(timer)
  }
  timer = window.requestAnimationFrame(loop)
  return {
    timer,
    cancelTimer
  }
}