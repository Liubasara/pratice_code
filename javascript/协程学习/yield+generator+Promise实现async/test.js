// 学习链接：https://segmentfault.com/a/1190000022638499

function myAsync(fn) {
  return new Promise((resolve, reject) => {
    const gen = fn()
    function next(val) {
      let ret
      try {
        ret = gen.next(val)
      } catch (e) {
        return reject(e)
      }
      if (ret.done) {
        return resolve(ret.value)
      }
      Promise.resolve(ret.value).then(
        (data) => {
          // 通过 next 将 Promise 完成后生成的值返回去
          next(data)
        },
        (err) => {
          ret.throw(err)
        }
      )
    }
    next()
  })
}

myAsync(function* () {
  console.log(
    yield new Promise((resolve) => setTimeout(() => resolve(1), 1000))
  )

  console.log(
    yield new Promise((resolve) => setTimeout(() => resolve(2), 2000))
  )
  console.log(
    yield new Promise((resolve) => setTimeout(() => resolve(3), 3000))
  )
  console.log(yield 'all')
  console.log('done')
})
