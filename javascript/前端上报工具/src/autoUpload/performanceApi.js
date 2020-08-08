function generateTiming () {
  let times = {}
  let t = window.performance.timing

  // 重定向时间
  times.redirectTime = { type: '重定向时间', time: t.redirectEnd - t.redirectStart }

  // dns查询耗时
  times.dnsTime = { type: 'dns查询耗时', time: t.domainLookupEnd - t.domainLookupStart }

  // TTFB 读取页面第一个字节的时间
  times.ttfbTime = { type: '读取页面第一个字节的时间', time: t.responseStart - t.navigationStart}

  // DNS 缓存时间
  times.appcacheTime = { type: 'DNS 缓存时间', time: t.domainLookupStart - t.fetchStart }

  // 卸载页面的时间
  times.unloadTime = { type: '卸载页面的时间', time: t.unloadEventEnd - t.unloadEventStart }

  // tcp连接耗时
  times.tcpTime = { type: 'tcp连接耗时', time: t.connectEnd - t.connectStart }

  // request请求耗时
  times.reqTime = { type: 'request请求耗时', time: t.responseEnd - t.responseStart }

  // 白屏时间
  times.blankTime = { type: '白屏时间', time: t.domLoading - t.fetchStart }

  // 开始加载至 DOM 解析完成的时间
  times.domReadyTime = { type: '开始加载至 DOM 解析完成耗时', time: t.domContentLoadedEventEnd - t.fetchStart }

  // 解析dom树耗时
  times.analysisTime = { type: '加载完成至 DOM 树解析完成耗时', time: t.domComplete - t.domInteractive }

  // 页面完全加载时间
  times.blankTime = { type: '页面完全加载时间', time: t.loadEventStart - t.fetchStart }

  return times
}

export default generateTiming
