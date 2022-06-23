/**
 * @param {() => Generator<Promise<any> | string, void, any>} fn 
 */
function myAsync(fn) {
  return new Promise((resolve, reject) => {
    const gen = fn()
    function dealVal(val) {
      Promise.resolve(val).then(data => {
        next(data)
        return data
      }, err => {
        throwErr(err)
        return err
      })
    }
    function throwErr(err) {
      let ret
      try {
        ret = gen.throw(err)
      } catch (e) {
        reject(e)
      }
      if (ret.done) {
        return reject(ret.value)
      }
      dealVal(ret.value)
    }
    function next(val) {
      let ret
      try {
        ret = gen.next(val)
      } catch (e) {
        throwErr(e)
      }
      if (ret.done) {
        return resolve(ret.value)
      }
      dealVal(ret.value)
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
  try {
    yield new Promise((resolve, reject) => setTimeout(() => reject(3), 3000))
  } catch (e) {
    console.log(e)
  }

  try {
    yield new Promise((resolve, reject) => setTimeout(() => reject(4), 1000))
  } catch (e1) {
    console.log(e1)
  }


  console.log(yield 'all')
  console.log('done')
})