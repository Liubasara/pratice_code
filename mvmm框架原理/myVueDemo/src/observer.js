/**
 * @param {*} value vue 的 data 对象
 * @param {Object} vm vue 实例指针 
 */
function observe (value, vm) {
    if (!value || typeof value !== 'object') {
        return
    }
    return new Observer(value, vm)
}

class Observer {
    constructor (data, vm) {
        this.data = data
        this.vm = vm

        this.init()
    }
    init () {
        this.walk()
    }
    walk () {
        // 遍历执行响应式对象方法
        Object.keys(this.data).forEach(key => {
            this.defineReactive(key, this.data[key])
        })
    }
    defineReactive (key, val) {
        // 每一个对象都生成一个对应的 Watcher 收集器 dep
        const dep = new Dep()
        // 递归子属性,对该对象进行响应化处理
        observe(val)

        Object.defineProperty(this.data, key, {
            // 可枚举
            enumerable: true,
            // 可配置
            configurable: true,
            // 自定义函数
            get () {
                // 确保监听的 Wathcer 已存在
                if (Dep.target) {
                    // 将当前 Watcher 加入依赖
                    dep.addSub(Dep.target)
                }
                return val
            },
            set (newVal) {
                if (newVal === val) {
                    return
                }
                // 把当前属性的值设为新值
                val = newVal
                // 把新值变为响应式对象
                observe(newVal)
                // 通知订阅者更新视图，执行所有 Wathcer 的 update 方法
                dep.notify()
            }
        })
    }
}
