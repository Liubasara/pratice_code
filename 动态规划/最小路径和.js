/**
给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

示例:

输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 7
解释: 因为路径 1→3→1→1→1 的总和最小。
**/

/**
  思考过程：
    1. 假设有某个宽为 width，高为 height 的网格 grid，统计到某个点的路径总和为 dp[i][j]，则最终所求的点应为 dp[height - 1][width - 1]
    2. 由于机器人每次只能向下或向右移动，那么可以得出状态转移方程为： dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    3. 确立初始条件：
      - 当网格的宽高都为 0 的时候，返回 0
      - 当网格只有第一行或者第一列的时候，只能向右或者向下移动，把当前列或者当前行叠加便能得到答案
      - 初始化，当 dp[i][j] 位于第一列或者第一行的时候，只能向右或者向下移动，把当前列或者当前行叠加便能得到答案
**/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  var height = grid.length
  var width = grid[0].length
  
  if (width === 0 || height === 0) return 0
  
  if (height === 1) return grid[0].reduce(function (acc, current) { return acc + current })
  
  if (width === 1) {
    var total = 0
    grid.forEach(function (item) { total += item[0] })
    return total
  }
  
  var dp = new Array(height)
  for (var h = 0; h < height; h++) {
    dp[h] = new Array(width)
  }
  
  // 初始化
  dp[0][0] = grid[0][0]
  for (var i = 1; i < height; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0]
  }
  for (var j = 1; j < width; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j]
  }
  
  for (var i = 1; i < height; i++) {
    for (var j = 1;j < width; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    }
  }
  
  return dp[height - 1][width - 1]
}

console.log(minPathSum([
  [1,3,1],
  [1,5,1],
  [4,2,1]
]))