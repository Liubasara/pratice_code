// 参考资料：
// - [手撕源码系列 —— lodash 的 debounce 与 throttle](https://juejin.im/post/6844903990639984654)
// - [lodash防抖节流源码理解](https://juejin.im/post/6844903982297513991)

/**
 * 一个完整的包含 throttle 功能的 debounce 函数分为几大方面：
 * 1. 由以下几个函数组成的基础模块：
 *   - debounced（返回函数，主调用）
 *   - formatArgs（负责校验入参）
 *   - startTimer（负责设置定时器）
 *   - timerExpired（负责定时器回调）
 *   - invokeFunc（负责调用函数，解决 this 指针问题）
 * 2. 由以下几个函数组成的增强模块：
 *   - shouldInvoke（根据上一次函数调用的时间来判断当前是否应该进行函数调用）
 *   - remainingWaiting（计算真正的延迟时间，比如说上一次触发时间的 lastCallTime 为 100，而 Date.now() 为 103，wait = 5，则下一次的延迟应该为 5 - （103 - 100) = 3）
 *   - trailingEdge（负责处理后置执行的情况）
 *   - leadingEdge（负责处理前置执行的情况，多用于节流）
 * 3. 以及一些简单优化的工具函数：
 *   - cancel（负责取消 debounce 效果）
 *   - flush（负责取消并立即执行一次 debounce 函数）
 */

// TODO: 函数实现
