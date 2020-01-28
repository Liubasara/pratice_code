// Watcher 用于监听响应式对象和 compiler 之间的联系
class Watcher {
    /**
     * @param {Object} vm 实例对象指针
     * @param {String} expOrFn 监听数据的 key
     * @param {Function} cb 
     */
    constructor (vm, expOrFn, cb) {
        this.vm = vm
        this.expOrFn = expOrFn
        this.cb = cb

        this.value = this.get()
    }

    get () {
        // 将当前收集器的 target 指针指向自己
        Dep.target = this
        // 触发响应式对象的 get 方法，由于 Dep.target === this，所以当前对象收集器 dep 会将当前 Wathcer push 到 subs 中
        const value = this.vm.data[this.expOrFn.trim()]
        // 重置指针
        Dep.target = null
        return value
    }

    update () {
        // 这里只是对 update 方法的简化，通过这种方式拿不到多层嵌套的数据

        // https://github.com/AnnVoV/blog/blob/master/js/vue2%20Dep%20Observer%20%E4%B8%8E%20Watcher%E4%B9%8B%E9%97%B4%E7%9A%84%E5%85%B3%E8%81%94.md
        // 在真正的 vue 中应该是执行一个 Wathcer 的 get 函数，该函数是对 updateComponent 函数的包装，而 updateComponent 函数又调用了 compiler 渲染生成的 render 方法
        // render 方法在渲染时会使用 with 语法对参数的 data 属性进行访问从而将当前 Wathcer 实例加入到 dep 实例中，随后对页面进行渲染。
        const newVal = this.vm.data[this.expOrFn.trim()]
        if(this.value !== newVal) {
            this.value = newVal;
            this.cb.call(this.vm, newVal);
        }
    }
}
