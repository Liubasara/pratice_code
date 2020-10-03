/**
 * 限制 Promise 并发
 * @param {Array<Pormise>} todoList 
 * @param {number} limit 
 */
function limitPromise (todoList, limit) {
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

var promise1 = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('3s')
      resolve('promise1')
    }, 3000)
  })
}

var promise2 = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('2s')
      resolve('promise2')
    }, 2000)
  })
}

var promise3 = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('1s')
      resolve('promise3')
    }, 1000)
  })
}

var promise4 = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('.5s')
      resolve('promise4')
    }, 500)
  })
}

var todoList = [promise1, promise2, promise3, promise4] // 1s .5s 2s 3s

limitPromise(todoList, 3).then(res => {
  console.log(res)
})
