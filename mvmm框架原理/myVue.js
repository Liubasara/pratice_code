class Dep {
  constructor () {
    this.subs = []
  }
  // 添加依赖
  addSub (sub) {
    this.subs.push(sub)
  }
  // 更新
  notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
// 全局属性, 通过该属性配置Watcher
Dep.target = null

class Watcher {
  constructor (obj, key, callback) {
    // 将Dep.target 指向自己
    // 然后触发属性的 getter 添加监听
    // 最后将 Dep.target 置空
    Dep.target = this
    this.callback = callback
    this.obj = obj
    this.key = key
    this.value = obj[key] // 这一步触发getter监听
    Dep.target = null
  }
  update () {
    // 获得新的值
    this.value = this.obj[this.key]
    // 调用callback方法更新DOM
    this.callback(this.value)
  }
}

function observe(obj) {
  // 判断类型
  if (!obj || typeof obj !== 'object') {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  let dp = new Dep()
  Object.defineProperty(obj, key, {
    // 可枚举
    enumerable: true,
    // 可配置
    configurable: true,
    // 自定义函数
    get: function reactiveGetter () {
      console.log('get values')
      if (Dep.target) {
        // 将当前的watcher加入依赖
        dp.addSub(Dep.target)
      }
      return val
    },
    set: function reactiveSetter (newVal) {
      console.log('set values')
      val = newVal
      // 执行所有watcher的update方法
      dp.notify()
    }
  })
}


// demo 使用

// function update (value) {
  // document.getElementById('test').innerText = value
// }
// var data = {name: 'demo'}
// observe(data)
// new Watcher(data, 'name', update)
// data.name = 'howToUseVueToUpdateDOM'