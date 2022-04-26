/**
 *122. 买卖股票的最佳时机 II
  给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。

  在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。

  返回 你能获得的 最大 利润 。

  

  示例 1：

  输入：prices = [7,1,5,3,6,4]
  输出：7
  解释：在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
      随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3 。
      总利润为 4 + 3 = 7 。
  示例 2：

  输入：prices = [1,2,3,4,5]
  输出：4
  解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
      总利润为 4 。
  示例 3：

  输入：prices = [7,6,4,3,1]
  输出：0
  解释：在这种情况下, 交易无法获得正利润，所以不参与交易可以获得最大利润，最大利润为 0 。
  

  提示：

  1 <= prices.length <= 3 * 104
  0 <= prices[i] <= 104
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const pricesLen = prices.length
  if (pricesLen <= 1) return 0
  const dp = []
  dp[0] = []
  // 代表持有股票
  dp[0][0] = -prices[0]
  // 代表未持有股票
  dp[0][1] = 0

  for (let i = 1; i < pricesLen; i++) {
    const priceI = prices[i]
    dp[i] = []
    // 第 i 天持有股票的情况下，最大利润为 Math.max(昨天持有股票的利润, 昨天未持有股票的利润 - 今日股价)
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - priceI)
    // 第 i 天未持有股票的情况下，最大利润为 Math.max(昨天持有股票的利润 + 今日股价, 昨天未持有股票的利润)
    dp[i][1] = Math.max(dp[i - 1][0] + priceI, dp[i - 1][1])
  }
  return dp[pricesLen - 1][1]
};

console.log(maxProfit([1, 2, 3, 4, 5])) // 4