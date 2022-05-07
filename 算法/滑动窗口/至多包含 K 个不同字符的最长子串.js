/**
LeetCode 340. 至多包含 K 个不同字符的最长子串（滑动窗口）

1. 题目
给定一个字符串 s ，找出 至多 包含 k 个不同字符的最长子串 T。

示例 1:
输入: s = "eceba", k = 2
输出: 3
解释: 则 T 为 "ece"，所以长度为 3。

示例 2:
输入: s = "aa", k = 1
输出: 2
解释: 则 T 为 "aa"，所以长度为 2。
*/

/**
 * 题解: 
 *  - https://cloud.tencent.com/developer/article/1787708
 *  - https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/hua-dong-chuang-kou-by-powcai/
 * @param {string} s 
 * @param {number} k 
 */
function lengthOfLongestSubstringKDistinct(s, k) {
  const sLen = s.length
  if (sLen <= 1) return sLen
  let p1 = 0
  let p2 = 0
  let curLen = 0
  let maxLen = 0
  const sMap = {}
  let counter = 0
  while (p2 < sLen) {
    if (!sMap[s[p2]]) {
      counter++
    }
    sMap[s[p2]] = sMap[s[p2]] ? sMap[s[p2]] + 1 : 1
    curLen++
    p2++
    while (counter > k) {
      sMap[s[p1]] -= 1
      if (sMap[s[p1]] === 0) {
        counter--
      }
      curLen--
      p1++
    }
    maxLen = Math.max(curLen, maxLen)
  }
  return maxLen
}

console.log(lengthOfLongestSubstringKDistinct('eceba', 2)) // 3
console.log(lengthOfLongestSubstringKDistinct('aa', 1)) // 2