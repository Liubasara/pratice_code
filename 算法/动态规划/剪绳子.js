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

 /** 动态规划 O(N)
 * @param {number} n
 * @return {number}
 */
function cuttingRope (n) {
  /**
   * - 假设 dp[n] 为长度为 n 时最大的乘积，则目标为 dp[n]
   * - dp[n] = max(dp[i] * dp[n - i]) 其中 1 <= i <= n - 1
   * - 初始条件：
   *   - n = 0 时，dp[0] = 0
   *   - n = 1 时，dp[1] = 1，一刀不剪
   *   - n = 2 时，dp[2] = 2，一刀不剪
   *   - n = 3 时，dp[3] = 3，一刀不剪
   */

  // 但是如果绳子的长度比 3 小的话，按照题目要求，无论如何都要剪一刀，因此乘积返回如下
  if (n < 2) return 0
  if (n === 2) return 1
  if (n === 3) return 2
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
  return dp[n]
}

/** 贪婪算法 O(1) 可轻松用于大数相乘
* https://www.cnblogs.com/zhuangzi101/p/11774309.html
* 根据数学证明可得知，每一段分出来的长度越接近自然对数 e，所得到的总乘积就会越大
* 而 e 的大小约为 2.71828，而题目要求分为整数，所以要做的就是尽可能地把线段分成多的长度为 3 的子段，余下的分为 2
* 唯一一个例外是当余下长度为 4 的时候，因为 2*2 > 3*1，所以应该将绳子减为 2 的两段
* @param {number} n
* @return {number}
*/
function cuttingRope2 (n) {
  if (n < 2) return 0
  if (n === 2) return 1
  if (n === 3) return 2
  let split3Times = Math.floor(n / 3) // 有多少条长度为 3 的线段
  if (n % 3 === 1) {
    // 尽可能获得长度为 3 的线段后，若余下长度为 1，则说明有倒数第二段时余下的线段长度为 4，所以应返回最后一段留待 2 整除
    split3Times--
  }
  let split2Times = Math.floor((n - (split3Times * 3)) / 2)
  // PS: 由于 JavaScript 精度问题，使用 Math.pow 计算大数的时候会遇到精度丧失导致计算错误无法 AC 的问题
  // return (parseInt(Math.pow(3, split3Times)) * parseInt(Math.pow(2, split2Times))) % 1000000007
  let sum = 1
  while (split3Times > 0) {
    sum = (sum * 3) % 1000000007
    split3Times--
  }
  while (split2Times > 0) {
    sum = (sum * 2) % 1000000007
    split2Times--
  }
  return sum % 1000000007
}

console.log(cuttingRope2(122))
