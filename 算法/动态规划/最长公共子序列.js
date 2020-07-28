/** 1143. 最长公共子序列长度
 * 示例 1:
 * 输入：text1 = "abcde", text2 = "ace" 
 * 输出：3  
 * 解释：最长公共子序列是 "ace"，它的长度为 3。
 * 示例 2:
 * 
 * 输入：text1 = "abc", text2 = "abc"
 * 输出：3
 * 解释：最长公共子序列是 "abc"，它的长度为 3。
 * 示例 3:
 * 
 * 输入：text1 = "abc", text2 = "def"
 * 输出：0
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
function longestCommonSubsequence (text1, text2) {
  /**
   * 思考过程：
   *  1. 设 dp[i][j] 为以 text1[i] 和 text2[j] 为结尾的字符串的最长公共子序列，所求为 dp[text1.length - 1][text2.length - 1]
   *  2. 列出状态转移方程：dp[i][j] = if text1[i] === text2[j] (dp[i - 1][j - 1] + 1) else Math.max(dp[i - 1][j], dp[i][j - 1])
   */
  const dp = new Array(text1.length)
  const len1 = text1.length
  const len2 = text2.length
  const text1Arr = text1.split('')
  const text2Arr = text2.split('')
  for (let i = 0; i < len1; i++) {
    dp[i] = new Array(len2).fill(0)
  }

  // 初始化
  for (let j = 0; j < len2; j++) {
    if (text1Arr[0] === text2Arr[j]) {
      dp[0][j] = 1
    } else {
      dp[0][j] = (dp[0] && dp[0][j - 1]) || 0
    }
  }

  for (let i = 0; i < len1; i++) {
    if (text1Arr[i] === text2Arr[0]) {
      dp[i][0] = 1
    } else {
      dp[i][0] = (dp[i - 1] && dp[i - 1][0]) || 0
    }
  }
  // 开始遍历
  for (let i = 1; i < len1; i++) {
    for (let j = 1; j < len2; j++) {
      if (text1Arr[i] === text2Arr[j]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return dp[len1 - 1][len2 - 1]
}

console.log(longestCommonSubsequence('abc', 'abc'))
