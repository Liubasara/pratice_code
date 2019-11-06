// 实现 sum(1)(2)() curry式地调用
function currySum (...args) {
  let res = args.reduce((pre, current) => pre + current)
  return function (...nextArgs) {
    if (nextArgs.length === 0) return res
    return currySum(res, ...nextArgs)
  }
}