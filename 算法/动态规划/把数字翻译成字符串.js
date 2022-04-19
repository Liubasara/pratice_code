/**
 * 剑指 Offer 46. 把数字翻译成字符串
 * 给定一个数字，我们按照如下规则把它翻译为字符串：0 翻译成 “a” ，1 翻译成 “b”，……，11 翻译成 “l”，……，25 翻译成 “z”。一个数字可能有多个翻译。请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。
 * 示例 1:
 *
 * 输入: 12258
 * 输出: 5
 * 解释: 12258有5种不同的翻译，分别是"bccfi", "bwfi", "bczi", "mcfi"和"mzi"
 *
 * dp[i] 为数字长度为 i 时有几种不同的翻译
 */

/**
 * @param {number} num
 * @return {number}
 */
var translateNum = function (num) {
  if (num < 0) return 0
  if (num <= 9) return 1
  const dp = []
  const numArr = (num + '').split('').map((item) => +item)
  dp[0] = 1
  dp[1] = 1
  for (let i = 2; i <= numArr.length; i++) {
    if (
      (numArr[i - 2] * 10 + numArr[i - 1]) >= 10 &&
      (numArr[i - 2] * 10 + numArr[i - 1]) <= 25
    ) {
      dp[i] = dp[i - 2] + dp[i - 1]
    } else {
      dp[i] = dp[i - 1]
    }
  }
  return dp[numArr.length]
}

// 5
console.log(translateNum(12258))
