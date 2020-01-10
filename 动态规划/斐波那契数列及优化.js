/**

斐波那契数列是以下一系列数字：

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, ...

在种子数字 0 和 1 之后，后续的每一个数字都是前面两个数字之和

**/

/**

常规递归法

思路：不断调用自身方法，直到n为1或0之后，开始一层层返回数据。

问题：使用递归计算大数字时，性能会非常低；另外，递归造成了大量的重复计算(很多函数执行了多次)。

*/
let fibonacci = function (n) {
  if (n === 0 || n === 1) return n
  return fibonacci(n - 2) + fibonacci(n - 1)
}
console.log(`常规递归法：${fibonacci(5)}`)

/**

数组缓存法

典型的以空间换时间，将所有的结果存起来，减少函数调用次数

**/
let fibonacci1 = (function(n) {
  let temp = [0, 1]
  return function (n) {
    let result = temp[n]
    if (!result) {
      result = fibonacci1(n - 1) + fibonacci1(n - 2)
      temp[n] = result
    }
    return result
  }
})()

console.log(`数组缓存法：${fibonacci(5)}`)

/**

动态规划法

这种算法的时间复杂度仅为O(n)，比递归函数的写法效率要大大增强

1. 假设 dp[i] 为第 i 个裴波那契数，所以第 n 个数为 dp[n]
2. 确立状态转移方程：dp[i] = dp[i - 1] + dp[i - 2]
3. 确立初始值：
   - i = 0 时，dp[i] = 0
   - i = 1 时，dp[i] = 1

**/
let fibonacci2 = function (n) {
  if (n === 0) {
    return 0
  }
  if (n === 1) {
    return 1
  }
  let dp = []
  dp[0] = 0
  dp[1] = 1
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}
console.log(`动态规划法：${fibonacci(5)}`)
