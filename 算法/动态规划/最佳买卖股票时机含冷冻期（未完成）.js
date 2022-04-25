/**
309. 最佳买卖股票时机含冷冻期
给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​

设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:

你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
示例:

输入: [1,2,3,0,2]
输出: 3 
解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
**/


/**
  思考过程：
    1. 假设 dp[i] 为第 i 天时可以获得的最大利润，则所求目标为 dp[prices.length - 1]
    2. 推出状态转移方程：dp[i] = dp[i - 1] + prices
**/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const pricesLen = prices.length
  if (pricesLen <= 1) return 0;
  const dp = []
  dp[0] = []
  // 0: 持有股票  1: 未持有股票，处于冷冻期 2: 未持有股票，未处于冷冻期
  // dp[i] 代表第i天
  dp[0][0] = -prices[0]
  dp[0][1] = 0
  dp[0][2] = 0
  for (let i = 1; i < pricesLen; i++) {
    const priceI = prices[i]
    dp[i] = []
    // 持有股票，说明要么是昨天买了股票 f[i-1][0] , 要么今天买了股票（那么第 i-1 天就不能持有股票并且不能处于冷冻期中，对应的状态为 f[i-1][2] 加上买入股票的负收益 -priceI）
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][2] - priceI)
    // 没股票且处于冷冻期, 说明是在今天把股票卖了，收益与昨天的持有状态 dp[i - 1][0] 叠加
    dp[i][1] = dp[i - 1][0] + priceI
    // 没股票且处于非冷冻期, 说明昨天没有买入，今天没有卖出，最大收益是昨天操作结果的最大值
    dp[i][2] = Math.max(dp[i - 1][1], dp[i - 1][2])
  }
  return Math.max(dp[pricesLen - 1][1], dp[pricesLen - 1][2])
};

console.log(maxProfit([1, 2, 3, 0, 2])) // 3
