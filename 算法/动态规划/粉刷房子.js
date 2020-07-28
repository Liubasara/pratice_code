/**
 * “粉刷房子”问题
 * 题目描述: 假如有一排房子，共 n 个，每个房子可以被粉刷成红色、蓝色或者绿色这三种颜色中的一种，你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。
 * 当然，因为市场上不同颜色油漆的价格不同，所以房子粉刷成不同颜色的花费成本也是不同的。每个房子粉刷成不同颜色的花费是以一个 n x 3 的矩阵来表示的。
 * 例如，costs[0][0] 表示第 0 号房子粉刷成红色的成本花费；costs[1][2] 表示第 1 号房子粉刷成绿色的花费，以此类推。请你计算出粉刷完所有房子最少的花费成本。
 * 注意： 所有花费均为正整数。
 *                红|蓝|绿
 * 示例： 输入: [[17,2,17],[16,16,5],[14,3,19]]
 * 输出: 10
 * 解释: 将 0 号房子粉刷成蓝色，1 号房子粉刷成绿色，2 号房子粉刷成蓝色。
 * 最少花费: 2 + 5 + 3 = 10。
 * @param {Array<Array<number>>} costs 
 */
function minCost (costs) {
  /**
   * 解题思路：房子数量 n: costs.length，油漆种类：j: 0、x: 1、k: 2
   *  1. 假设 dp[i][j] 为粉刷至第 i 个房子时，使用 j 号油漆对应的最小总花费，则所要求的答案则为 dp[costs.length - 1][j]
   *  2. 列出状态转移方程：dp[i][j] = costs[i][j] + Math.min(dp[i - 1][x], dp[i - 1][k])
   *  3. 解决初始状态: 当 i = 0 时，dp[0][j] = costs[0][0], dp[0][1] = costs[0][1], dp[0][2] = costs[0][2]
   */
  const len = costs.length
  const dp = new Array(len)
  for (let w = 0; w < len; w++) {
    dp[w] = new Array(3).fill(0)
  }
  // 初始化
  dp[0][0] = costs[0][0]
  dp[0][1] = costs[0][1]
  dp[0][2] = costs[0][2]
  for (let i = 1; i < len; i++) {
    dp[i].forEach((item, index) => {
      switch (index) {
        case 0:
          dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + costs[i][0]
          break;
        case 1:
          dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + costs[i][1]
          break;
        case 2:
          dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + costs[i][2]
          break;
        default:
          break;
      }
    })
  }
  return Math.min(dp[len - 1][0], dp[len - 1][1], dp[len - 1][2])
}

minCost([[17,2,17],[16,16,5],[14,3,19]])

/**
 * 滚动数组优化
 * 其实只要前一行数据来生成下一行就够了，所以可以使用一个一维数组进行循环覆盖替代
 * @param {number[][]} costs 
 */
function minCost2 (costs) {
  const len = costs.length
  const dp = new Array(len)
  // 初始化
  dp[0] = costs[0][0]
  dp[1] = costs[0][1]
  dp[2] = costs[0][2]
  for (let i = 1; i < len; i++) {
    const now = costs[i]
    const prev0 = dp[0]
    const prev1 = dp[1]
    const prev2 = dp[2]
    dp[0] = Math.min(prev1, prev2) + now[0]
    dp[1] = Math.min(prev0, prev2) + now[1]
    dp[2] = Math.min(prev0, prev1) + now[2]
  }
  return Math.min(dp[0], dp[1], dp[2])
}

minCost2([[17,2,17],[16,16,5],[14,3,19]])
