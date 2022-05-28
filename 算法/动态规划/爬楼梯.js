/**
  70. 爬楼梯
  假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

  每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

  

  示例 1：

  输入：n = 2
  输出：2
  解释：有两种方法可以爬到楼顶。
  1. 1 阶 + 1 阶
  2. 2 阶
  示例 2：

  输入：n = 3
  输出：3
  解释：有三种方法可以爬到楼顶。
  1. 1 阶 + 1 阶 + 1 阶
  2. 1 阶 + 2 阶
  3. 2 阶 + 1 阶
 */
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n <= 2) return n
  const dp = []
  dp[0] = 0
  dp[1] = 1
  dp[2] = 2
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
};

console.log(climbStairs(2)) // 2
console.log(climbStairs(3)) // 3


/** 爬楼梯，一共 n 阶楼梯，每次爬最多可以跨 k 阶，输出每条路径
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var climbStairsAllPaths = function (n, k) {
  const res = []
  let curr = []
  function dfs(targetNum) {
    if (targetNum === 0) {
      res.push([...curr])
      return
    }
    if (targetNum < 0) return
    for (let i = 1; i <= k; i++) {
      curr.push(i)
      dfs(targetNum - i)
      curr.pop()
    }
  }
  dfs(n)
  return res
};

console.log(climbStairsAllPaths(2, 2)) // [ [ 1, 1 ], [ 2 ] ]
console.log(climbStairsAllPaths(3, 2)) // [ [ 1, 1, 1 ], [ 1, 2 ], [ 2, 1 ] ]
/**
  [
    [ 1, 1, 1, 1 ],
    [ 1, 1, 2 ],
    [ 1, 2, 1 ],
    [ 1, 3 ],
    [ 2, 1, 1 ],
    [ 2, 2 ],
    [ 3, 1 ]
  ]
 */
console.log(climbStairsAllPaths(4, 3))
