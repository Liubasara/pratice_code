/**
* 409. 最长回文串
  给定一个包含大写字母和小写字母的字符串，找到通过这些字母构造成的最长的回文串。

  在构造过程中，请注意区分大小写。比如 "Aa" 不能当做一个回文字符串。

  注意:
  假设字符串的长度不会超过 1010。

  示例 1:

  输入:
  "abccccdd"

  输出:
  7

  解释:
  我们可以构造的最长的回文串是"dccaccd", 它的长度是 7。
*/

/**
 * @param {string} s
 * @return {number}
   我的思路：
    1. 设总长度为 n = 0
    2. 先找出所有个数比 2 大的字符，设dp[i] = i 在 s 中出现的次数，当 dp[i] 为奇数，则 n += dp[i] - 1，当 dp[i] 为偶数，则 n += dp[i]
    然后分出两种情况：
      i. 还有其余单个字符，n += 1
      ii. 没有其余单个字符，返回 n
    3. 特殊情况，经过第二步 n 依旧为 0，证明字符串中没有数量大于 2 的字符，此时会问字符串长度为 1
 */
var longestPalindrome = function(s) {
  var n = 0
  var dp = {}
  var hasSingle = false
  
  s.split('').forEach(item => {
    if (item in dp) {
      dp[item] += 1
    } else {
      dp[item] = 1
    }
  })
  
  Object.values(dp).forEach(value => {
    if (value < 2) {
      hasSingle = true
      return
    }
    if (value % 2 === 0) {
      n += value
    } else {
      hasSingle = true
      n += value - 1
    }
  })
  
  if (hasSingle) { n += 1 }
  
  if (n === 0) { n = 1 }
  
  return n
};
