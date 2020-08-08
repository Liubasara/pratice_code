import generateTiming from './performanceApi.js'
/**
 * hack 包装浏览器中的原生方法并 fire 一个新事件
 * @param {string[]} args 
 * @param {string} eventName
 * @returns {boolean} 是否成功 hack
 * @example wrapOriginFunc(['window', 'history', 'pushState'], 'testPush')
 */
export function wrapOriginFunc (args = [], eventName = '') {
  if (!args.length || !eventName) return false
  let obj
  let lastName
  let func
  if (args[0] === 'window') args.shift()
  while (args.length > 1) {
    obj = obj ? obj[args.shift()] : window[args.shift()]
  }
  obj = obj || window
  lastName = args.shift()
  func = obj[lastName]
  if (typeof func !== 'function') {
    return false
  }
  obj[lastName] = function (...args) {
    func.apply(this, args)
    window.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      detail: {target: this, args}
    }))
  }
  return true
}

/**
 * 发送性能指标
 * @param {string} url 
 */
export function uploadPerformance (url, opt = {}) {
  let timingApi = generateTiming()
  console.log({...timingApi, errorInfo: opt})
}

