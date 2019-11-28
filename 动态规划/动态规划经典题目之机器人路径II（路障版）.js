/**
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

网格中的障碍物和空位置分别用 1 和 0 来表示。

说明：m 和 n 的值均不超过 100。

示例 1:

输入:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
输出: 2
解释:
3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右
**/

/**
状态转移方程：
  1. 无障碍物情况下：dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
  2. 有障碍物的情况下，dp[i][j] 需要去掉有障碍物方向的所有数量
额外情况：
  1. 只有一行或一列的时候，需要留意判定当前该行或该列是否有障碍物
  2. 需要留意当起点就是障碍物的时候，直接返回 0
初始化：由于机器人只能向右或向下，所以当前一个点为障碍点的时候，到达该点的路径数为0，否则为1
**/

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
  var width = obstacleGrid[0].length
  var height = obstacleGrid.length
  // 额外情况
  if (height <= 1) {
    if (obstacleGrid[0].includes(1)) return 0
    return 1
  }
  
  if (width <= 1) {
    var res = 1
    obstacleGrid.forEach(function (item) {
      if (item.includes(1)) res = 0
    })
    return res
  }
  
  if (obstacleGrid[0][0]) return 0
  
  var dp = new Array(height)
  for (let w = 0; w < height; w++) {
    dp[w] = new Array(width)
  }
  // 初始化
  dp[0][0] = 1
  for (let i = 1; i < height; i++) {
    if (dp[i - 1][0] === 0 || obstacleGrid[i][0] === 1) {
      dp[i][0] = 0
    } else {
      dp[i][0] = 1
    }
  }
  for (let j = 1; j < width; j++) {
    if (dp[0][j - 1] === 0 || obstacleGrid[0][j] === 1) {
      dp[0][j] = 0
    } else {
      dp[0][j] = 1
    }
  }
  // 状态转移
  for (let i = 1; i < height; i++) {
    for (let j = 1; j < width; j++) {
      
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      
      if (dp[i][j - 1] === 0) {
        dp[i][j] = dp[i - 1][j]
      } else if (dp[i - 1][j] === 0) {
        dp[i][j] = dp[i][j - 1]
      }
      
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0
      }
    }
  }
  return dp[height - 1][width - 1]
};

// console.log(uniquePathsWithObstacles([[1,0],[0,0]]))
console.log(uniquePathsWithObstacles([
  [0,0,0],
  [0,1,0],
  [0,0,0]
]))