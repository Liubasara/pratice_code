// TODO: compiler 用于为页面生成 vNode 并渲染成真实 DOM 节点（https://juejin.im/post/5b68fe48e51d4519125369b6）
// 可以认为 compile 是 Watcher 与 Dep 之间的桥梁

// 其中，生成渲染函数 render 分为三个过程：
// - 词法分析：把字符串转换成 token
// - 语法分析：构建抽象语法树 AST
// - 语义分析：生成目标代码(render函数)

// TODO: （https://blog.seosiwei.com/detail/24）同时，Vue 会对需要更新的不同类型的元素生成 Wathcer（正式版本的 Vue 是在生命周期去做这个事的，核心文件是 core/instance/lifecycle.js，会在 $mount 函数执行阶段运行 new Wathcer 操作）
// 在该 Demo 版本中，由于 vDom 更新渲染涉及东西较多（VDOM 的 diff 过程实时的更新界面），我们将这一步直接放在 compile 中执行，只定义 Text 节点的更新方法，用以在更新时触发重新渲染的更新，调用更新方法更新视图。
// https://github.com/balancelove/SimpleVue/blob/master/vue/compile.js

const nodeType = {
    isElement(node) {
        return node.nodeType === 1
    },
    isText(node) {
        return node.nodeType === 3
    },
};


const updater = {
    text(node, val) {
        node.textContent = val
    },
    // 还有 model 啥的，但实际都差不多
};

class Compile {
    constructor(el, vm) {
        this.vm = vm
        this.el = document.querySelector(el)
        this.fragment = null
        this.init()
    }

    init() {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el)
            this.compileElement(this.fragment)
            this.el.appendChild(this.fragment)
        }
    }

    nodeToFragment(el) {
        const fragment = document.createDocumentFragment()
        let child = el.firstChild

        // 将原生节点转移到 fragment
        while (child) {
            fragment.appendChild(child)
            child = el.firstChild
        }
        return fragment
    }

    compileElement(el) {
        const childNodes = el.childNodes

        Array.prototype.slice.call(childNodes).forEach((node) => {
            const reg = /\{\{(.*)\}\}/
            const text = node.textContent

            // 根据不同的 node 类型，进行编译，分别编译指令以及文本节点
            if (nodeType.isElement(node)) {
                this.compileEl(node)
            } else if (nodeType.isText(node) && reg.test(text)) {
                this.compileText(node, reg.exec(text)[1])
            }

            // 递归的对元素节点进行深层编译
            if (node.childNodes && node.childNodes.length) {
                this.compileElement(node)
            }
        })
    }

    compileText(node, exp) {
        const value = this.vm[exp.trim()];
        updater.text(node, value)
        new Watcher(this.vm, exp, val => {
            updater.text(node, val)
        })
    }

    compileEl(node) {
        const attrs = node.attributes
        Object.values(attrs).forEach(attr => {
            var name = attr.name
            if (name.indexOf('v-') >= 0) {
                const exp = attr.value
                // 只做事件绑定
                const eventDir = name.substring(2)
                if (eventDir.indexOf('on') >= 0) {
                    this.compileEvent(node, eventDir, exp)
                }
            }
        })
    }

    compileEvent(node, dir, exp) {
        const eventType = dir.split(':')[1]
        const cb = this.vm.methods[exp]

        if (eventType && cb) {
            node.addEventListener(eventType, cb.bind(this.vm))
        }
    }
}