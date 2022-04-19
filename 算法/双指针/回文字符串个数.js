/**
 * 给定一个字符串 s ，请计算这个字符串中有多少个回文子字符串。
 *
 * 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "abc"
 * 输出：3
 * 解释：三个回文子串: "a", "b", "c"
 * 示例 2：
 *
 * 输入：s = "aaa"
 * 输出：6
 * 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
 * 
 * dp[n] 代表长度为 n 的字符，回文字符串的数量
 * n = 0, dp[n] = 0
 * n = 1, dp[n] = 1
 * n = 2, if s[n] === s[n - 1] dp[n] = dp[n - 1] + 2 else dp[n] = dp[n - 1] + 1
 * n = 3, if s[n] === s[]
 *
 */

/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  /**
   * @param {string} str 
   * @param {number} start 
   * @param {number} end 
   */
  function countPalinddrom(str, start, end) {
    let count = 0
    while(start >= 0 && end <= str.length && str[start] === str[end]) {
      --start
      ++end
      ++count
    }
    return count
  }
  if (!s.length) return 0
  let count = 0
  for (let i = 0; i < s.length; i++) {
    count += countPalinddrom(s, i, i) // 长度为奇数的情况
    count += countPalinddrom(s, i, i + 1) // 长度为偶数的情况
  }
  return count
}

console.log(countSubstrings('aaa'))
