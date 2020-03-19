/** 最长回文子串
给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：

输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。

示例 2：

输入: "cbbd"
输出: "bb"
**/

/**
  思考过程：
  1. 假设 dp[i][j] 代表 s[i] 开始 s[j] 为止的字符串是否为回文串，则该题所求答案应为 dp[i][j] === true && s[min(i)][max(j)] 
  2. 推出状态转移方程：当一个字符为回文串，而其两边的字符又恰好相等时，可以得出该新字符串也是回文串。
     所以有当 s[i] === s[j] && dp[i + 1][j - 1] === true 时，dp[i][j] = true
  3. 解决初始状态：
      - 所有单个字符串都是回文字符，即 i === j 时，dp[i][j] = true
      - 当 j - i === 1 && s[i] === s[j] 时，该字符串为相等的回文串
**/


/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  var len = s.length
  if (len === 0) return ''
  if (len === 1) return s
  
  var dp = new Array(len)
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len)
  }
  var targetI = 0
  var targetJ = 0
  
  // 初始化
  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      if (i === j) {
        dp[i][j] = true
      }
      if (j - i === 1 && s[i] === s[j]) {
        dp[i][j] = true
        if (j - i > targetJ - targetI) {
          targetI = i
          targetJ = j
        }
      }
    }
  }
  
  // PS：由于 dp[i][j] 依赖的是 dp[i + 1][j - 1]，即数组的下一行和上一列，所以在计算时应该按列来遍历计算，以防止某些项在计算时无法找到依赖
  for (let j = 2; j < len; j++) {
    for (let i = 0; i < j; i++) {
      if (s[i] === s[j] && dp[i + 1][j - 1] === true) {
        dp[i][j] = true
        if (j - i > targetJ - targetI) {
          targetI = i
          targetJ = j
        }
      }
    }
  }

  return s.slice(targetI, targetJ + 1)
};

console.log(longestPalindrome("abcba"))