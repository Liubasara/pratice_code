/**
  123. 买卖股票的最佳时机 III

  题解：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/solution/tong-su-yi-dong-de-dong-tai-gui-hua-jie-fa-by-marc/

  给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

  设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。

  注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

  

  示例 1:

  输入：prices = [3,3,5,0,0,3,1,4]
  输出：6
  解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
      随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
  示例 2：

  输入：prices = [1,2,3,4,5]
  输出：4
  解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。   
      注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。   
      因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
  示例 3：

  输入：prices = [7,6,4,3,1] 
  输出：0 
  解释：在这个情况下, 没有交易完成, 所以最大利润为 0。
  示例 4：

  输入：prices = [1]
  输出：0
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
  dp[0][0] = []
  dp[0][1] = []
  // dp[第 i 天][0: 持有股票 1: 未持有股票][0: 卖出过 0 次, 最大为 2]
  // 第一天持股买入
  dp[0][0][0] = -prices[0]
  // 不能同时参与多笔交易, 第一天不可能卖出，不存在的状态, 标记为无穷小
  dp[0][0][1] = -Infinity
  dp[0][0][2] = -Infinity

  // 第一天不买入
  dp[0][1][0] = 0
  // 不能同时参与多笔交易, 第一天不可能卖出，不存在的状态, 标记为无穷小，下同
  dp[0][1][1] = -Infinity
  dp[0][1][2] = -Infinity

  let i = 1
  for (; i < pricesLen; i++) {
    const priceI = prices[i]
    dp[i] = []
    // 第 i 天持有股票
    dp[i][0] = []
    // 第 i 天未持有股票
    dp[i][1] = []

    // 持有股票，未卖出过，其最大利润值为：之前持有股票， 之前未持有股票 - priceI
    dp[i][0][0] = Math.max(dp[i - 1][0][0], dp[i - 1][1][0] - priceI)
    // 持有股票，卖出过一次, 最大利润值为：今天买的=之前未持有股票 - priceI，今天不买=之前持有股票
    dp[i][0][1] = Math.max(dp[i - 1][1][1] - priceI, dp[i - 1][0][1])
    // 持有股票，卖出过两次，不存在的情况
    dp[i][0][2] = -Infinity

    // 未持有股票，未卖出过，最大利润值为：之前未持有股票
    dp[i][1][0] = dp[i - 1][1][0]
    // 未持有股票，卖出过一次，最大利润值为：之前持有股票 + priceI，之前卖过一次目前未持有股票
    dp[i][1][1] = Math.max(dp[i - 1][0][0] + priceI, dp[i - 1][1][1])
    // 未持有股票，卖出过两次，最大利润值为：之前持有股票且卖过一次 + priceI, 之前未持有股票 + 卖过2次
    dp[i][1][2] = Math.max(dp[i - 1][0][1] + priceI, dp[i - 1][1][2])
  }
  return Math.max(dp[i - 1][1][1], dp[i - 1][1][2], 0)
};

console.log(maxProfit([3, 3, 5, 0, 0, 3, 1, 4])) // 6
console.log(maxProfit([1, 2, 3, 4, 5])) // 4
console.log(maxProfit([7, 6, 4, 3, 1])) // 0