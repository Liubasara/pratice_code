// Dep 用于收集响应式对象所对应的 Watcher，当对象发生变化时，批量执行其对应的所有的 watcher 的 update 方法
class Dep {
    constructor () {
        this.subs = []
    }

    addSub (sub) {
        this.subs.push(sub)
    }

    notify () {
        this.subs.forEach(sub => sub.update())
    }
}

Dep.target = null
