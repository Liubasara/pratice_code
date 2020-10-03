/**
 * myAjax 请求包装
 * @param {*} opt 
 */
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

/**
 * 限制 Promise 并发
 * @param {Array<PromiseConstructor>} todoList 
 * @param {number} limit 
 */
export const limitPromise = (todoList, limit) => {
  const todoLen = todoList.length
  const lockFn = []
  const result = []
  return new Promise((wattingResolve) => {
    function wrapFnToPromise (fn, index) {
      function dealLcokFn (res) {
        result.push(res)
        lockFn.splice(index, 1)
        if (todoList.length > 0) {
          lockFn.push(wrapFnToPromise(todoList.shift(), lockFn.length))
        } else if (result.length === todoLen) {
          wattingResolve(result)
        }
      }
      // 将方法再包一层，每一个 promise 任务完成时触发，将列表中下一个任务(如果有的话)放入任务列表中并执行，同时将自己清除出当前列表
      return new Promise((resolve, reject) => {
        fn().then(res => {
          dealLcokFn(res)
          resolve(res)
        }).catch(e => {
          dealLcokFn(e)
          reject(e)
        })
      })
    }
    // 最多只有 limit 个任务，且每个任务完成后都会主动拉下一个列表，保证同时执行的任务永远有且只有 limit 个
    for (let i = 0; i < limit; i++) {
      lockFn.push(wrapFnToPromise(todoList[i], i))
    }
    todoList.splice(0, limit)
  })
  
}
