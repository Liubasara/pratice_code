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
function myAjax (options = {}) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(options.method, options.url)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          resolve(xhr.responseText)
        } else {
          reject(xhr)
        }
      }
    }
    xhr.setRequestHeader('Content-Type', 'application/json')
    if (xhr.method === 'GET') {
      xhr.send()
    } else {
      xhr.send(options.data)
    }
  })
}
