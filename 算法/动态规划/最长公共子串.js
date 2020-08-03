/** 718. 最长重复子数组
 * 给两个整数数组 A 和 B ，返回两个数组中公共的、长度最长的子数组的长度。
 * 示例：
 * 输入：
 * A: [1,2,3,2,1]
 * B: [3,2,1,4,7]
 * 输出：3
 * 解释：
 * 长度最长的公共子数组是 [3, 2, 1] 。
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
function findLength (A, B) {
  /**
   * 思考过程；
   * 1. 设 dp[i][j] 为包含A的 i 字符和B的 j 字符的最长公共子字符串的长度，则所求为 max(dp[i][j])
   * 2. 状态转移方程：
   *    if (A[i] === B[j]) {
   *        dp[i][j] = dp[i-1][j-1] + 1
   *    } else {
   *        dp[i][j] = 0
   *    }
   * 3. 初始化：
   *    当 i = 0，dp[0][j] = A[0] === B[j] ? 1 : 0
   *    当 j = 0, dp[i][0] = A[i] === B[0] ? 1 : 0
   */
  const lenA = A.length
  const lenB = B.length
  let maxNum = 0
  let dp = new Array(lenA).fill(0)
  for (let i = 0; i < lenA; i++) {
    dp[i] = new Array(lenB).fill(0)
  }
  for (let i = 0; i < lenA; i++) {
    if (A[i] === B[0]) {
      dp[i][0] = 1
      maxNum = 1
    } else {
      dp[i][0] = 0
    }
  }
  for (let j = 0; j < lenB; j++) {
    if (A[0] === B[j]) {
      dp[0][j] = 1
      maxNum = 1
    } else {
      dp[0][j] = 0
    }
  }

  for (let i = 1; i < lenA; i++) {
    for (let j = 1; j < lenB; j++) {
      if (A[i] === B[j]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
        maxNum = Math.max(dp[i][j], maxNum)
      } else {
        dp[i][j] = 0
      }
    }
  }
  return maxNum
}

console.log(findLength([1,2,3,2,4,7,9], [1,2,3,2,1,4,7,9]))
