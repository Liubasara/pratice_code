/**
 * 参考资料：
 * 
 * - [从零开始搭建前端监控系统（一）——web探针sdk](https://juejin.im/post/6844903953319067655)
 * - [前端性能监控：window.performance](https://juejin.im/entry/6844903465899016205)
 * - [在单页应用中，如何优雅的上报前端性能数据](https://github.com/forthealllight/blog/issues/38)
 */
import { wrapOriginFunc, uploadPerformance } from './uploadUtil.js'

// 页面载入监听
window.addEventListener('load', function (e) {
  uploadPerformance('/timingTestUrlEncoded', { uploadType: '页面加载捕获', errorInfo: { type: 'error', reason: e } })
})

// 页面错误监听
window.addEventListener('error', function (e) {
  uploadPerformance('/timingTestUrlEncoded', { uploadType: '页面错误捕获', errorInfo: { type: 'error', reason: e } })
  /**
   * window.onerror 函数只有在返回 true 的时候，异常才不会向上抛出
   * window.onerror 无法捕获资源异常的错误，因为网络请求异常不会事件冒泡
   */
  return true
})

// promise 异常无法用onerror或 try-catch 捕获。可以监听unhandledrejection事件
window.addEventListener("unhandledrejection", function(e){
  e.preventDefault()
  uploadPerformance('/timingTestUrlEncoded', { uploadType: 'promise 错误捕获', errorInfo: { type: 'promiseError', reason: e.reason } })
  return true
})

// 路由切换监听
window.addEventListener('myRoutePush', function (e) {
  uploadPerformance('/timingTestUrlEncoded', { uploadType: '路由切换监听', errorInfo: { type: 'promiseError', reason: e.reason } })
})
window.addEventListener('myRouteReplace', function (e) {
  uploadPerformance('/timingTestUrlEncoded', { uploadType: '路由替换监听', errorInfo: { type: 'promiseError', reason: e.reason } })
})


// 页面离开监听
window.addEventListener('beforeunload', function (e) {
  uploadPerformance('/timingTestUrlEncoded', { uploadType: '离开页面捕获', errorInfo: { type: 'promiseError', reason: e.reason } })
})

wrapOriginFunc(['window', 'history', 'pushState'], 'myRoutePush')
wrapOriginFunc(['window', 'history', 'replaceState'], 'myRouteReplace')
