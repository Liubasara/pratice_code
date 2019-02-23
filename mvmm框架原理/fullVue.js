class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }
  walk(value) {
    Object.keys(value).forEach(key => this.convert(key, value[key]))
  }
  convert(key, value) {
    defineReactive(this.value, key, value)
  }
}

function observe(value) {
  if (!value || typeof value !== "object") {
    return
  }
  return new Observer(value)
}

function defineReactive(obj, key, value) {
  const dep = new Dep()
  let obChild = observe(value)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      if (Dep.target) {
        dep.depend()
      }
      return value
    },
    set: function(newValue) {
      if (newValue === value) return
      value = newValue
      obChild = observe(newValue)
      dep.notify()
    }
  })
}

var uid = 0
class Dep {
  constructor() {
    this.id = uid++
    this.subs = []
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  depend() {
    Dep.target.addDep(this)
  }
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}
Dep.target = null

class Watcher {
  constructor(obj, key, cb) {
    this.depIds = {}
    this.obj = obj
    this.key = key
    this.cb = cb
    this.val = this.get()
  }
  addDep(dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
  }
  get() {
    Dep.target = this
    const val = this.obj._data[this.key]
    Dep.target = null
    return val
  }
  update() {
    this.run()
  }
  run() {
    const val = this.get()
    if (val !== this.val) {
      this.val = val
      this.cb.call(this.obj, val)
    }
  }
}



class Vue {
  constructor(options = {}) {
    // 简化了$options的处理
    this.$options = options
    // 简化了对data的处理
    let data = (this._data = this.$options.data)
    // 将所有data最外层属性代理到Vue实例上
    Object.keys(data).forEach(key => this._proxy(key))
    // 监听数据
    observe(data)
  }
  // 对外暴露调用订阅者的接口，内部主要在指令中使用订阅者
  $watch(key, cb) {
    new Watcher(this, key, cb)
  }
  _proxy(key) {
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get: () => this._data[key],
      set: val => {
        this._data[key] = val
      }
    })
  }
}

var data = { test: "123", hi: { name: "wow" } }

var myVue = new Vue({
  data: data
})

myVue.$watch('test', val => { document.getElementById('test').innerText = val })