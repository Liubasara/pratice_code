var ReadingUtil = (function() {
  var currentPosition, topTimer, bottomTimer
  function goTop(speed = 10) {
    topTimer = setInterval(runToTop, speed)
    return {
      topTimer,
      stop: function() {
        clearInterval(topTimer)
        topTimer = null
      }
    }
  }
  function goBottom(speed = 10) {
    bottomTimer = setInterval(runToBottom, speed)
    return {
      bottomTimer,
      stop: function() {
        clearInterval(bottomTimer)
        bottomTimer = null
      }
    }
  }
  function runToTop() {
    currentPosition =
      document.documentElement.scrollTop || document.body.scrollTop
    currentPosition -= 1
    if (currentPosition > 0) {
      window.scrollTo({top: currentPosition, behavior: 'smooth'})
    } else {
      window.scrollTo({top: 0, behavior: 'smooth'})
      clearInterval(topTimer)
      topTimer = null
    }
  }
  function runToBottom() {
    currentPosition =
      document.documentElement.scrollTop || document.body.scrollTop
    currentPosition += 1
    if (parseInt(document.documentElement.scrollHeight - document.documentElement.scrollTop) !== document.documentElement.clientHeight) {
      window.scrollTo({top: currentPosition, behavior: 'smooth'})
    } else {
      window.scrollTo({top: document.documentElement.scrollHeight, behavior: 'smooth'})
      clearInterval(bottomTimer)
      bottomTimer = null
    }
  }
  function top (speed = 10) {
    window.stopReading = goTop(speed).stop
  }
  function bottom (speed = 10) {
    window.stopReading = goBottom(speed).stop
  }
  // 监听双击事件下滑页面，也可以通过控制台操控
  document.documentElement.ondblclick = function () {
    if (bottomTimer) {
      // 已经处于下滑状态, 取消下滑
      clearInterval(bottomTimer)
      bottomTimer = null
      return
    }
    // 开始下滑
    bottom()
  }
  return {
    goTop,
    goBottom,
    top,
    bottom
  }
})()
