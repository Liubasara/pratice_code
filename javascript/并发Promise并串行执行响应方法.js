const promises = [
  {
    promise: () =>
      new Promise((resolve) => {
        console.log('fetch 0, wait 5s')
        setTimeout(() => resolve('result 0'), 5000)
      }),
    handler(...args) {
      console.log(args, 0)
    }
  },
  {
    promise: () =>
      new Promise((resolve) => {
        console.log('fetch 1, wait 4s')
        setTimeout(() => resolve('result 1'), 4000)
      }),
    handler(...args) {
      console.log(args, 1)
      console.log('wait 2s')
    }
  },
  {
    promise: () =>
      new Promise((resolve) => {
        console.log('fetch 2, wait 6s')
        setTimeout(() => resolve('result 2'), 6000)
      }),
    handler(...args) {
      console.log(args, 2)
    }
  },
  {
    promise: () =>
      new Promise((resolve) => {
        console.log('fetch 3, wait 2s')
        setTimeout(() => resolve('result 3'), 2000)
      }),
    handler(...args) {
      console.log(args, 3)
    }
  }
]

function mergePromises(handlers) {
  const resultHandlers = handlers.map((handler) => ({
    resultPromise: handler.promise(),
    handler: handler.handler
  }))
  ;(async () => {
    for (let i = 0; i < resultHandlers.length; i++) {
      const res = await resultHandlers[i].resultPromise
      resultHandlers[i].handler(res)
    }
  })()
}

mergePromises(promises)

// fetch 0, wait 5s
// fetch 1, wait 4s
// fetch 2, wait 6s
// fetch 3, wait 2s
// [ 'result 0' ] 0
// [ 'result 1' ] 1
// wait 2s
// [ 'result 2' ] 2
// [ 'result 3' ] 3
