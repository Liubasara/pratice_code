// 我所理解的 new 操作符
function myNew (func) {
    var obj = {} // 创建一个新对象
    // 最好不要用__proto__指针，该属性至今未被官方承认而且据说性能不好
    // obj.__proto__ = func.prototype // 链接__proto__链
    object.setPrototypeOf(obj, func.prototype) // 使用该函数可以达到与上面一样的效果
    var result = func.call(obj) // 将该实例作为执行上下文传入到构造函数的作用域中，执行该函数
    return result instanceof func ? result : obj // 若构造函数没有return一个构造函数的实例，则返回自己创建的实例
}