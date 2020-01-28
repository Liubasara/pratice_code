class Vue {
    constructor (opt) {
        this.data = opt.data()
        this.methods = opt.methods
        this.mounted = opt.mounted
        this.el = opt.el

        this.init()
    }
    init () {
        // 代理 this.data.xxx 到 this.xxx
        Object.keys(this.data).forEach(key => {
            this.proxy(key)
        })
        // 监听 data，转为响应式对象
        observe(this.data, this)
        // 解析节点生成 vNode，渲染至页面
        const compiler = new Compile(this.el, this)
        // 生命周期
        this.callHook('mounted')
    }
    proxy (key) {
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get () {
                return this.data[key]
            },
            set (newVal) {
                this.data[key] = newVal
            }
        })
    }
    callHook (lifeCycle) {
        this[lifeCycle]()
    }
}
