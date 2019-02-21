function myAjax (params) {
  let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
  let type = params.type || 'get'
  let async = typeof params.async === undefined ? true : params.async
  xhr.open(type, params.url, async)
  xhr.onReadyStateChange = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status <= 300 || xhr.status === 304) {
        if (params.success && params.success instanceof Function) {
          params.success(xhr.responseText)
        }
      } else if (params.error && params.error instanceof Function) {
        params.error(xhr.responseText)
      }
    } 
  }
  xhr.setRequestHeader('Content-Type', 'application/json')
  type === 'get' ? xhr.send() : xhr.send(params.data)
}