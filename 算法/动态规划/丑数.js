// 我们把只包含质因子 2、3 和 5 的数称作丑数（Ugly Number）。
// 求按从小到大的顺序的第 n 个丑数。
// 示例:

// 输入: n = 10
// 输出: 12
// 解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。
// 说明:

// 1 是丑数。
// n 不超过1690。

/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function (n) {
  const dp = []
  dp[0] = 1
  for (let i = 1, a = 0, b = 0, c = 0; i < n; i++) {
    dp[i] = Math.min(dp[a] * 2, dp[b] * 3, dp[c] * 5)
    if (dp[i] === dp[a] * 2) {
      a += 1
    }
    if (dp[i] === dp[b] * 3) {
      b += 1
    }
    if (dp[i] === dp[c] * 5) {
      c += 1
    }
  }
  return dp[n - 1]
}

console.log(nthUglyNumber(10))

/**
 * 1
 * 2 = 2 2%2=0 2%3=3 2%5=2
 * 3 = 3 3%2=1 3%3=0 3%5=5
 * 4 = 2 * 2
 * 5 = 5
 * 6 = 2 * 3
 * 8 = 2 *
 * 9 = 3 * 3
 * 10 = 2 * 5
 * 12 = 2 * 2 * 3
 */
