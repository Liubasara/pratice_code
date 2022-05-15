/**
  72. 编辑距离
  给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。

  你可以对一个单词进行如下三种操作：

  插入一个字符
  删除一个字符
  替换一个字符
  

  示例 1：

  输入：word1 = "horse", word2 = "ros"
  输出：3
  解释：
  horse -> rorse (将 'h' 替换为 'r')
  rorse -> rose (删除 'r')
  rose -> ros (删除 'e')
  示例 2：

  输入：word1 = "intention", word2 = "execution"
  输出：5
  解释：
  intention -> inention (删除 't')
  inention -> enention (将 'i' 替换为 'e')
  enention -> exention (将 'n' 替换为 'x')
  exention -> exection (将 'n' 替换为 'c')
  exection -> execution (插入 'u')
 */

/**
 * 题解：
 *  - https://mp.weixin.qq.com/s/HYvKIHhh7pFLnEM1GUe4pQ
 *  - Lucien评论：https://leetcode.cn/problems/edit-distance/solution/bian-ji-ju-chi-by-leetcode-solution/
 */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const word1Len = word1.length
  const word2Len = word2.length
  if (!word1Len && !word2Len) return 0
  const dp = []
  for (let i = 0; i < word1Len + 1; i++) {
    dp[i] = []
    for (let j = 0; j < word2Len + 1; j++) {
      if (i === 0) {
        dp[0][j] = j
        continue
      }
      if (j === 0) {
        dp[i][0] = i
        continue
      }
      // 增: 知道"abcd"变成"fgh"多少步（假设X步），那么从"abcde"到"fgh"就是"abcde"->("abcd"->"fgh" X步)。（一次删除，加X步，总共X+1步）
      const add = dp[i][j - 1] + 1
      // 删：知道"abcde"变成“fg”多少步（假设Y步），那么从"abcde"到"fgh"就是("abcde"->"fg" Y步)->"fgh"。（先Y步，再一次添加，加X步，总共Y+1步）
      const remove = dp[i - 1][j] + 1
      // 改：知道"abcd"变成“fg”多少步（假设Z步），那么从"abcde"到"fgh"就是("abcde"->"fge" Z步)->"fgh"。（先不管最后一个字符，把前面的先变好，用了Z步，然后把最后一个字符给替换了。这里如果最后一个字符碰巧就一样，那就不用替换，省了一步）
      const edit = word1[i - 1] === word2[j - 1] ? dp[i - 1][j - 1] : dp[i - 1][j - 1] + 1
      dp[i][j] = Math.min(add, remove, edit)
    }
  }
  return dp[word1Len][word2Len]
};

console.log(minDistance("horse", "ros")) // 3