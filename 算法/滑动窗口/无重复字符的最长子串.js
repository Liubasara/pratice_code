/**
  3. 无重复字符的最长子串
  给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

  

  示例 1:

  输入: s = "abcabcbb"
  输出: 3 
  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
  示例 2:

  输入: s = "bbbbb"
  输出: 1
  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
  示例 3:

  输入: s = "pwwkew"
  输出: 3
  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
*/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const sLen = s.length
  if (sLen <= 1) return sLen
  let maxLen = 0
  let curLen = 0
  let sMap = {}
  let p1 = 0
  let p2 = 0
  while (p2 < sLen) {
    const sP2 = s[p2]
    curLen += 1
    while (sMap[sP2]) {
      curLen -= 1
      sMap[s[p1]] = false
      p1++
    }
    maxLen = Math.max(curLen, maxLen)
    sMap[sP2] = true
    p2++
  }
  return maxLen
};

console.log(lengthOfLongestSubstring('abcabcbb')) // 3