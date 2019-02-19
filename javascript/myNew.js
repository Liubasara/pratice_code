// 我所理解的 new 操作符
function myNew (func) {
    var obj = {} // 创建一个新对象
    obj.__proto__ = func.prototype // 链接__proto__链
    var result = func.call(obj) // 将该实例作为执行上下文传入到构造函数的作用域中，执行该函数
    return result instanceof func ? result : obj // 若构造函数没有return一个构造函数的实例，则返回自己创建的实例
}