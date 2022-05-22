// @ts-check

// https://www.jianshu.com/p/70c22578336c

class EventEmitter {
  constructor() {
    /** @type {Record<string, Array<Function>>} events */
    this.events = Object.create(null)
  }
  bindListener(event, listener, method = 'push') {
    method === 'push' || (method = 'unshift')
    this.events[event] || (this.events[event] = [])
    this.events[event][method](listener)
    return this
  }
  addEventListener(event, listener) {
    this.bindListener(event, listener)
    return this
  }
  prependListener(event, listener) {
    this.bindListener(event, listener, 'unshift')
    return this
  }
  removeListener(event, listener) {
    this.events[event] &&
      ~this.events[event].indexOf(listener) &&
      (this.events[event] = this.events[event].filter((fn) => fn !== listener))
    return this
  }
  clearListener(event) {
    if (!event) {
      this.events = Object.create(null)
      return this
    }
    this.events[event] && (this.events[event] = [])
    return this
  }
  off(event, listener) {
    if (event && listener) {
      this.removeListener(event, listener)
      return this
    }
    this.clearListener(event)
    return this
  }
  once(event, listener) {
    const bindFn = (...args) => {
      const val = listener.call(this, ...args)
      this.removeListener(event, bindFn)
      return val
    }
    this.bindListener(event, bindFn)
    return this
  }
  emit(event, ...args) {
    this.events[event] && this.events[event].forEach(fn => {
      fn.call(this, ...args)
    })
    return this
  }
}

; (() => {
  const theEvent = new EventEmitter()
  const cbFunc = function (...args) {
    console.log(12345, args)
  }
  theEvent.addEventListener('customEvt', cbFunc)
  theEvent.once('customEvt', () => {
    console.log(456)
  })
  theEvent.emit('customEvt')
  console.log('---------------------------')
  theEvent.emit('customEvt', 1, 2, 3)
  theEvent.off('customEvt')
  console.log('---------------------------')
  theEvent.emit('customEvt', 1, 2, 3)
})()
