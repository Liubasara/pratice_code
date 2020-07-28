/** 357. 计算各个位数不同的数字个数
 * 给定一个非负整数 n，计算各位数字都不同的数字 x 的个数，其中 0 ≤ x < 10n 。
 * 示例:
 * 
 * 输入: 2
 * 输出: 91 
 * 解释: 答案应为除去 11,22,33,44,55,66,77,88,99 外，在 [0,100) 区间内的所有数字。
 * 思路一：回溯法
 * @param {number} n
 * @return {number}
 */
function countNumbersWithUniqueDigits (n) {
  if (n === 0) return 1
  const path = []
  const curr = []
  const visited = {}
  function dfs () {
    path.push(+curr.join(''))
    if (curr.length === n) {
      return
    }
    for (let i = 0; i < 10; i++) {
      if (curr.length === 0 && i === 0) {
        continue
      }
      if (!visited[i]) {
        visited[i] = true
        curr.push(i)
        dfs()
        curr.pop()
        visited[i] = false
      }
    }
  }
  dfs()
  // 只要不是 1 位数或者 0 位数，就还要加上 00 自身
  return path.length
}

console.log(countNumbersWithUniqueDigits(3))

/**
 * 解法2：动态规划
 * 1. 假设 dp[i] 为 i 位数所能组成的所有数字，则所求为 SUM(dp[2] ~ dp[n]) + 10
 * 2. 状态转移方程：dp[i] = dp[i - 1] *....(11 - i)
 * 3. 初始化条件：
 *    - dp[1] = 9（第一位不能是 0）
**/

function countNumbersWithUniqueDigits2 (n) {
  if (n === 0) return 1
  const dp = []
  dp[0] = 1
  dp[1] = 9
  let res = 0
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] * (11 - i)
    res += dp[i]
  }
  return res + 10
}

console.log(countNumbersWithUniqueDigits2(3))




