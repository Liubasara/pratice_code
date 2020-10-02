export const myAjax = function (
  opt = {
    url: '',
    method: 'GET',
    contentType: 'application/json',
    onUploadProgress: (event) => {
      if (event.lengthComputable) {
        console.log(`${event.position}/${event.totalSize}`)
      }
    }
  }
) {
  return new Promise((resolve, reject) => {
    const { url, method = 'GET', contentType = 'application/json', onUploadProgress = () => {}, data } = opt
    if (!url || !method || !contentType) {
      throw Error('配置有误')
    }
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          resolve(xhr.responseText)
        } else {
          reject(xhr)
        }
      }
    }
    xhr.onprogress = onUploadProgress
    xhr.open(method, url)
    xhr.setRequestHeader('Content-Type', contentType)
    switch (method) {
      case 'GET':
        xhr.send()
        break
      case 'POST':
        xhr.send(data || {})
        break
      default:
        throw Error('myAjax 暂不支持此 method')
    }
  })
}
