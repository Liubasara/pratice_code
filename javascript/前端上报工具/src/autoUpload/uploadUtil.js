import generateTiming from './performanceApi.js'
/**
 * hack 包装浏览器中的原生方法并 fire 一个新事件
 * @param {string[]} args 
 * @param {string} eventName
 * @returns {boolean} 是否成功 hack
 * @example wrapOriginFunc(['window', 'history', 'pushState'], 'testPush')
 */
export function wrapOriginFunc(args = [], eventName = '') {
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
      detail: { target: this, args }
    }))
  }
  return true
}

/**
 * sendBeacon 发送报告方式
 * @param {string} url 
 * @param {{}} data 
 */
function sendBeaconReport(url, data) {
  let headers = {
    type: 'application/x-www-form-urlencoded'
  }
  let blob = new Blob([JSON.stringify(data)], headers)
  navigator.sendBeacon(url, blob)
}

/**
 * 同步 xhr 报告方式
 * @param {string} url 
 * @param {{}} data 
 */
function xhrReport(url, data) {
  var client = new XMLHttpRequest()
  client.open("POST", url, false) // 同步发送，阻塞浏览器，防止浏览器关闭而导致无法发送
  client.setRequestHeader("Content-Type", "application/json; charset=utf-8")
  client.send(JSON.stringify(data))
}

/**
 * 动态创建图片报告方式, url 长度不能超过 2083 字符
 * @param {string} url 
 * @param {{}} data 
 */
function imgReport(url, data) {
  let image = new Image()
  image.src = url + (url.includes('?') ? '&' : '?') + 'performanceData=' + JSON.stringify(data)
}

/**
 * 发送性能指标
 * @param {string} url 
 */
export function uploadPerformance(url, opt = {}) {
  let timingApi = generateTiming()
  let data = { ...timingApi, ...opt }
  let newUrl = url + (url.includes('?') ? '&' : '?') + 'performanceData=' + JSON.stringify(data)
  // 动态创建图片报告方式, url 长度不能超过 2083 字符
  if (newUrl.length < 2083) {
    imgReport(url, data)
  } else if (navigator.sendBeacon) {
    sendBeaconReport(url, data)
  } else {
    xhrReport('/timingTestJSON', data)
  }
}

