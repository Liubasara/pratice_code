export function nextFrame<T extends (...args: any[]) => unknown>(_cb?: T) {
  const cb = _cb ?? (() => undefined)
  return new Promise((resolve, reject) => {
    const handler = async () => {
      let hasErr = false
      const promiseRes = await Promise.all([
        (async () => {
          try {
            await cb()
          } catch(e) {
            hasErr = true
          }
        })(),
        new Promise<unknown>((r) => {
          if ((window as any).requestAnimationFrame) {
            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(() => {
                r(null)
              })
            })
          } else {
            setTimeout(() => {
              setTimeout(() => {
                r(null)
              }, 0)
            }, 16)
          }
        })
      ])
      if (hasErr) {
        reject(promiseRes[0])
      } else {
        resolve(promiseRes[0])
      }
      return promiseRes[0]
    }
    return handler()
  })
}

export function idle<T extends (...args: any[]) => unknown>(
  cb: T,
  opt: {
    delay?: number
    nextFrame?: boolean
    params?: IdleRequestOptions
  } = {}
) {
  const {
    delay = 0,
    params = { timeout: 16 }
  } = opt
  const wrapCb = async (resolveFn: (...args: any[]) => unknown, rejectFn: (...args: any[]) => unknown) => {
    try {
      resolveFn(await cb())
    } catch (e) {
      rejectFn(e)
    }
  }
  return new Promise((resolve, reject) => {
    const handler = async () => {
      if (opt.nextFrame) {
        await nextFrame()
        return wrapCb(resolve, reject)
      }
      return wrapCb(resolve, reject)
    }
    if (delay) {
      setTimeout(handler, delay)
      return
    }
    if ((window as any).requestIdleCallback) {
      window.requestIdleCallback(handler, params)
    } else {
      setTimeout(handler, delay)
    }
  })
}
