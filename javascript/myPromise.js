const PENDING = "pending"
const FULFILLED = "fulFilled"
const REJECTED = "rejected"

class MyPromise {
  constructor(executor) {
    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    this.resolveCbList = []
    this.rejectCbList = []
    let resolve = value => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        this.resolveCbList.forEach(fn => fn())
      }
    }
    let reject = reason => {
      if ((this.state = PENDING)) {
        this.state = REJECTED
        this.reason = reason
        this.rejectCbList.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulFilled, onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulFilled =
      typeof onFulFilled === "function" ? onFulFilled : value => value
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : err => {
            throw err
          }
    let myPromise2 = new MyPromise((resolve, reject) => {
      if (this.state === PENDING) {
        this.resolveCbList.push(() => {
          setTimeout(() => {
            let x = onFulFilled(this.value)
            resolvePromise(myPromise2, x, resolve, reject)
          }, 0)
        })
        this.rejectCbList.push(() => {
          setTimeout(() => {
            let x = onRejected(this.reason)
            resolvePromise(myPromise2, x, resolve, reject)
          }, 0)
        })
      }
      if (this.state === FULFILLED) {
        // 只有使用setTimeout异步执行才能把myPromise2传出去，不然myPromise2就是undefined
        setTimeout(() => {
          let x = onFulFilled(this.value)
          // 你当然可以直接这样做，不过为了装逼(误)和更好的利用Promise，我们对这个值进行通用的递归判断，拿到一个最终的value值(对，其实下面那个递归函数就是调用then函数不停地生成Promise，最终目的就是把最终调用resolve函数的Promise的this.value值拿出来)
          // resolve(x)
          resolvePromise(myPromise2, x, resolve, reject)
        }, 0)
      }
      if (this.state === REJECTED) {
        setTimeout(() => {
          let x = onRejected(this.reason)
          resolvePromise(myPromise2, x, resolve, reject)
        }, 0)
      }
    })
    return myPromise2 // 返回这个myPromise2 正常情况下，经过递归处理以后，该myPromise2的this.value值是一个最终确定的值而不会是一个Promise
  }
  
  // catch 函数(非核心)
  catch (onRejected) {
    // 默认不成功
    return this.then(null, onRejected)
  }
}


/**
 * resolve中的值几种情况：
 * 1.普通值
 * 2.promise对象
 * 3.thenable对象/函数
 */

/**
 * 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvePromise(myPromise2, x, resolve, reject) {
  if (myPromise2 === x) {
    reject(new TypeError("循环引用"))
  }
  let called
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then
      if (typeof then === "function") {
        // Promise 对象
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolvePromise(myPromise2, y, resolve, reject)
          },
          err => {
            if (called) return
            called = true
            reject(err)
          }
        )
      } else {
        // 普通对象
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

// 以下是其他的方法
MyPromise.resolve = function (value) {
  return new MyPromise((resolve, reject) => {
    resolve(value)
  })
}

MyPromise.reject = function (value) {
  return new MyPromise((resolve, reject) => {
    reject(value)
  })
}

MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject)
    }
  })
}

MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    let successArr = []
    let successCount = 0
    function processData (index, data) {
      successArr[index] = data
      // 判断数组中成功的数量是否等于promises中元素的数量
      if (++successCount === promises.length) {
        resolve(successArr)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(data => {
        processData(i, data)
      }, reject)
    }
  })
}

// test
// var p1 = new MyPromise((resolve, reject) => resolve(1))
// .then( data => new MyPromise(resolve => resolve(++data)))
// .then(data => console.log(data))

// var p1 = new MyPromise((resolve, reject) => resolve(1))
// .then( data => new MyPromise( resolve => resolve(new MyPromise( resolve => resolve(++data) )) ))
// .then(data => console.log(data))
