/**
 * 剑指 Offer 14- I. 剪绳子
 * 给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1
 * 每段绳子的长度记为 k[0],k[1]...k[m-1] 。请问 k[0]*k[1]*...*k[m-1] 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。
 * 
 * 示例 1：
 * 输入: 2
 * 输出: 1
 * 解释: 2 = 1 + 1, 1 × 1 = 1
 * 示例 2:
 * 
 * 输入: 10
 * 输出: 36
 * 解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36
 */

 /**
 * @param {number} n
 * @return {number}
 */
function cuttingRope (n) {
  /**
   * - 假设 dp[n] 为长度为 n 时最大的乘积，则目标为 dp[n]
   * - dp[n] = max(dp[i] * dp[n - i]) 其中 1 <= i <= n - 1
   * - 初始条件：
   *   - n = 0 时，dp[0] = 0
   *   - n = 1 时，dp[1] = 1
   *   - n = 2 时，dp[2] = 1 * 1 = 1
   *   - n = 3 时，dp[3] = 2 * 1 > 1 * 1 * 1 = 2
   */
  const dp = []
  dp[0] = 0
  dp[1] = 1
  dp[2] = 2
  dp[3] = 3
  if (n <= 3) return dp[n]
  for (let i = 4; i <= n; i++) {
    let max = 0
    for (let j = 1; j <= Math.floor(i / 2); j++) {
      max = Math.max(max, dp[j] * dp[i - j])
    }
    dp[i] = max
  }
  console.log(dp)
  return dp[n]
}

console.log(cuttingRope(10))
