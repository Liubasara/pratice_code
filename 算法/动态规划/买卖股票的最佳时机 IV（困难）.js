/**
  188. 买卖股票的最佳时机 IV
  给定一个整数数组 prices ，它的第 i 个元素 prices[i] 是一支给定的股票在第 i 天的价格。

  设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。

  注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

  

  示例 1：

  输入：k = 2, prices = [2,4,1]
  输出：2
  解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
  示例 2：

  输入：k = 2, prices = [3,2,6,5,0,3]
  输出：7
  解释：在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
      随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。
  

  提示：

  0 <= k <= 100
  0 <= prices.length <= 1000
  0 <= prices[i] <= 1000
 */

// PS: 个人理解，就是 III 的进阶通用版本

/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  const pricesLen = prices.length
  if (pricesLen <= 1) return 0
  const dp = []
  dp[0] = []
  // dp[第 i 天][0: 持有股票][进行过 k 次交易]
  dp[0][0] = []
  dp[0][1] = []
  for (let j = 0; j <= k; j++) {
    if (j === 0) {
      dp[0][0][0] = -prices[0]
      dp[0][1][0] = 0
    } else {
      dp[0][0][j] = -Infinity
      dp[0][1][j] = -Infinity
    }
  }

  let i = 1
  for (; i < pricesLen; i++) {
    const priceI = prices[i]
    dp[i] = []
    dp[i][0] = []
    dp[i][1] = []
    for (let j = 0; j <= k; j++) {
      if (j === k) {
        // 不存在卖了 k 次还持有股票的情况
        dp[i][0][k] = -Infinity
      } else {
        // 其余情况下，要么是之前没有持有（今天买），要么是之前就持有
        dp[i][0][j] = Math.max(dp[i - 1][1][j] - priceI, dp[i - 1][0][j])
      }
      if (j === 0) {
        // 卖出次数为 0，且不持有股票，则说明一直没有买卖，利润为前一天的相同状态（其实就是 0）
        dp[i][1][0] = dp[i - 1][1][0]
      } else {
        // 其余情况下，要么是之前持有(今天卖了)，要么是之前就卖了（之前就达成了第 j 次交易）
        dp[i][1][j] = Math.max(dp[i - 1][0][j - 1] + priceI, dp[i - 1][1][j])
      }
    }
  }
  // 返回 dp[i - 1 天][1: 未持有股票] 中的最大值和 0 作对比
  const max = Math.max(...dp[i - 1][1])
  return Math.max(max,  0)
};

console.log(maxProfit(2, [2, 4, 1])) // 2
console.log(maxProfit(2, [3, 2, 6, 5, 0, 3])) // 7