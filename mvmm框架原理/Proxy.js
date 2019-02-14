// 使用该函数将target[sourceKey][key] 的读写变成对 target[key] 的读写, vue使用这种写法使得data、props、method中的对象和函数可以直接代理在Vue对象的vm实例上
// 如 vm.data.test 通过 proxy(vm, data, test) 后就可以直接代理在vm中通过 vue.test 来访问了

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}