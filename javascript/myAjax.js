/*
 * 回调Ajax
 */
function myAjax(params) {
  let xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP")
  let type = params.type || "get"
  let async = typeof params.async === "undefined" ? true : params.async
  xhr.open(type, params.url, async)
  xhr.onreadystatechange = function(e) {
    if (xhr.readyState === 4) {
      if ((xhr.status >= 200 && xhr.status <= 300) || xhr.status === 304) {
        if (params.success && params.success instanceof Function) {
          params.success(xhr.responseText)
        }
      } else if (params.error && params.error instanceof Function) {
        params.error(xhr.responseText)
      }
    }
  }
  xhr.setRequestHeader("Content-Type", "application/json")
  type === "get" ? xhr.send() : xhr.send(params.data)
}

/*
 * Promise包装Ajax
 */
function ajax(options) {
  return new Promise(function(resolve, reject) {
    // 1通知成功 通知失败（通知then)
    let { method, url } = options
    if (!method) {
      throw new Error("需要 method")
    }
    url = url || location.href
    let xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP")
    xhr.open(method, url)
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          resolve.call(null, xhr.responseText) // 2通知成功·
        } else if (xhr.status >= 400) {
          reject.call(null, xhr) // 3通知失败
        }
      }
    }
    xhr.send()
  })
}
