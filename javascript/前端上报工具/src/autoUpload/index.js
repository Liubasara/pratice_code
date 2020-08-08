/**
 * 参考资料：
 * 
 * - [从零开始搭建前端监控系统（一）——web探针sdk](https://juejin.im/post/6844903953319067655)
 * - [前端性能监控：window.performance](https://juejin.im/entry/6844903465899016205)
 * - [在单页应用中，如何优雅的上报前端性能数据](https://github.com/forthealllight/blog/issues/38)
 */
import { wrapOriginFunc, uploadPerformance } from './uploadUtil.js'

window.onerror = function (e) {
  uploadPerformance('', { type: 'error', reason: e })
  /**
   * window.onerror 函数只有在返回 true 的时候，异常才不会向上抛出
   * window.onerror 无法捕获资源异常的错误，因为网络请求异常不会事件冒泡
   */
  return true
}

// promise 异常无法用onerror或 try-catch捕获。可以监听unhandledrejection事件
window.addEventListener("unhandledrejection", function(e){
  e.preventDefault()
  uploadPerformance('', { type: 'promiseError', reason: e.reason })
  return true
})

wrapOriginFunc(['window', 'history', 'pushState'], 'myRoutePush')
