// 自定义方法用于判断Object和Array
function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

/**
 * 
 * @param {Array<any>|{[key: any]: any}} source 
 * @param {WeakMap} hash 
 */
function myDeepClone(source, hash = new WeakMap()) {
  if (!isObject(source)) return source // 非Object和Array直接返回它的值
  if (source instanceof Date) return new Date(source)
  if (source instanceof RegExp) return new RegExp(source)
  if (hash.has(source)) return hash.get(source) // 若hash表中有该对象，则直接返回该对象的值(解决循环引用)

  let target = Array.isArray(source) ? [] : {}
  hash.set(source, target)

  for (let key in source) {
    // 确保不是原型链上的属性
    if (Object.hasOwnProperty.call(source, key)) {
      // 递归调用，传入hash表
      target[key] = myDeepClone(source[key], hash)
    }
  }
  return target
}

var a = { b: { name: 'b' } }
a.c = a
var b = myDeepClone(a)

/**
 * 最后，我把克隆函数单独拎出来了，实际上克隆函数是没有实际应用场景的
 * 两个对象使用一个在内存中处于同一个地址的函数也是没有任何问题的
 * @param {Function} func 
 * @returns {Function}
 */
function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    console.log('普通函数');
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      console.log('匹配到函数体：', body[0]);
      if (param) {
        const paramArr = param[0].split(',');
        console.log('匹配到参数：', paramArr);
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}

/**
  高性能版深拷贝 https://juejin.im/post/5df7175fe51d45582512962c
  使用 Proxy 代理来懒劫持拷贝后的对象，使其在修改过程时拷贝
  
  整体思路：1. 传入一个待拷贝对象，生成一个它的 proxy 实例，并将该实例存入一个 Map[data, proxy] 中
            2. 传入一个修改函数来触发要修改的对象，触发 proxy 的 setter
            3. 这个 setter 会将当前被修改的属性经过浅拷贝生成一份 copy，fn 函数对应的值将修改在这个 copy 中，然后存入一个 Map[data, copy] 中
            4. 随后递归遍历该待拷贝对象，如果该对象在上述的两个 Map 中存在对应的 value，则返回该对象的 copy
            5. 随后返回该 copy 对象，即大功告成。
**/
const MY_IMMER = Symbol('my-immer1')

/**
  检测传入的值是否为一个没有父类的纯对象（或者说检测传入 value 是否为 value.__proto__ === Object）
**/
const isPlainObject = value => {
  if (
    !value ||
    typeof value !== 'object' ||
    Object.prototype.toString.call(value) != '[object Object]'
  ) {
    return false
  }
  var proto = Object.getPrototypeOf(value)
  if (proto === null) {
    return true
  }
  // 当传入的值为一个没有父类对象的纯对象时，Ctor 即为 Object 方法
  var Ctor = Object.hasOwnProperty.call(proto, 'constructor') && proto.constructor
  return (
    typeof Ctor == 'function' &&
    // 如果传入的是一个纯对象，由于 Function.prototype.__proto__ === Object.prototype，Ctor instanceof Ctor 即为 true
    Ctor instanceof Ctor &&
    Function.prototype.toString.call(Ctor) ===
    Function.prototype.toString.call(Object)
  )
}

/** 
  检测传入的 value 是否已经被 produce 包装过(包装过的特点就是当请求 value[MY_IMMER] 时会返回 value 本身) 
*/
const isProxy = value => !!value && !!value[MY_IMMER]

function produce(baseState, fn) {
  const proxies = new Map()
  const copies = new Map()

  const objectTraps = {
    get(target, key) {
      // 用于配合 Proxy 的 set 函数和 isProxy 函数
      if (key === MY_IMMER) return target
      // 获取外部的对象，如果拷贝过了就用
      const data = copies.get(target) || target
      return getProxy(data[key])
    },
    set(target, key, val) {
      // 由于对值进行了设置，触发对象的懒劫持复制机制

      // 这一步对整个外部对象里面所有的属性值都迭代浅拷贝，之后缓存并返回新的外部对象
      const copy = getCopy(target)

      // 对新传入的值也进行 proxy 化处理
      const newValue = getProxy(val)

      // 这里判断 proxy 化后的数据是否为一个已被 produce 处理过的 proxy（循环引用），如果是则根据上面的 get 规则返回其本身，如果不是则直接返回其本身（有可能是基本类型，如数值之类的）
      copy[key] = isProxy(newValue) ? newValue[MY_IMMER] : newValue

      // set方法应该返回一个布尔值，返回true代表此次设置属性成功了，如果返回false且设置属性操作发生在严格模式下，那么会抛出一个TypeError。
      return true
    }
  }

  /**
  用于获取一个对象的 proxy,如果传入的对象是已被 produce 处理过的 proxy 对象，则直接返回
  如果对象不是一个被 produce 处理过的对象，但是在缓存列表中却存在一个对应它的 Proxy，说明这是一个被循环引用的对象，则返回缓存过的 proxy
  如果传入的数据不是对象，直接返回原始数据
  其余情况下，都要将对象进行 proxy 化处理并用 Map 缓存起来再返回其 Proxy
  **/
  const getProxy = data => {
    if (isProxy(data)) {
      return data
    }
    if (isPlainObject(data) || Array.isArray(data)) {
      if (proxies.has(data)) {
        return proxies.get(data)
      }
      const proxy = new Proxy(data, objectTraps)
      proxies.set(data, proxy)
      return proxy
    }
    return data
  }

  /**
    获取对象的浅拷贝复制并缓存
  **/
  const getCopy = data => {
    if (copies.has(data)) {
      return copies.get(data)
    }
    const copy = Array.isArray(data) ? data.slice() : { ...data }
    copies.set(data, copy)
    return copy
  }

  /**
    如果在拷贝或者 proxy 缓存中存在该对象对应的值，那么说明该对象已被拷贝或改变（即 fn 函数进行了设值，proxy 的 set 方法被触发了）
  **/
  const isChange = data => {
    if (proxies.has(data) || copies.has(data)) return true
  }

  /**
    对传入的数据每一层进行判断，如果没有被改变的话，就返回原数据，如果被改变了，就返回复制后的对象
  **/
  const finalize = data => {
    if (isPlainObject(data) || Array.isArray(data)) {
      if (!isChange(data)) {
        return data
      }
      const copy = getCopy(data)
      Object.keys(copy).forEach(key => {
        copy[key] = finalize(copy[key])
      })
      return copy
    }
    return data
  }

  // 获取该对象的 proxy 对象
  const proxy = getProxy(baseState)
  // 对对象进行设值，如果设值了这一步会触发 objectTraps 的 set 方法
  fn(proxy)
  // 递归处理对象中的每一项并挨个进行 proxy 化
  return finalize(baseState)
}

// 使用示例：通过回调函数做到在不修改原有对象的情况下既拷贝了对象也往拷贝对象里面新增了数据
var data = {
  toCopy: {
    message: {
      content: 'origin'
    }
  }
}

var copyData = produce(data, (copyState) => {
  copyState.toCopy.message.hi = 1
})

console.log(data.toCopy.message === copyState.toCopy.message) // false
console.log(data.toCopy.message.content === copyState.toCopy.content) // true

