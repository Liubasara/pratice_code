/**
给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。

说明：

拆分时可以重复使用字典中的单词。
你可以假设字典中没有重复的单词。

示例 1：

输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。

示例 2：

输入: s = "applepenapple", wordDict = ["apple", "pen"]
输出: true
解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
     注意你可以重复使用字典中的单词。

示例 3：

输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
输出: false

**/

/**
  思考过程：
  1. 假设 dp[i] 表示 s 的前 i 位是否可以用 wordDict 中的单词表示，则所求应为 dp[s.length]
  2. 推出状态转移方程，遍历字符串的所有子串，if (wordDict.indexOf(s.slice(i, j)) !== -1 && dp[i] = true) {dp[j] = true}
  3. 搞定初始状态：
     - dp[0] = true ,空字符可以被表示
     
**/


/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  var len = s.length
  
  var dp = new Array(len + 1).fill(false)
  dp[0] = true
  
  for (var i = 0; i < len; i++) {
    for (var j = i + 1; j < len + 1; j++) {
      if (wordDict.indexOf(s.slice(i, j)) !== -1 && dp[i] === true) dp[j] = true
    }
  }
  
  return dp[len]
};

console.log(wordBreak('applepenapple', ["apple", "pen"]))
