/**
120. 三角形最小路径和
给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。

例如，给定三角形：
[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]

自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）
**/

/**
思考过程：
  1. 假设 dp[i][j] 为自顶向下移动到该点所需的最小路径和，则当传入一个宽为 width 的二维数组 triangle，目标返回的应为 Math.min.apply(null, dp[width - 1])
  2. 推断状态转移方程：
    - 由于三角形只能自顶而下移动到下一行相邻的节点上，所以对于 dp[i][j]，其上一步应为 dp[i - 1][j - 1] 或 dp[i - 1][j]
    - 所以可以得出状态转移方程为: dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j]
  3. 搞定初始状态
    - 当 i 为 1 时，dp[0][0] = triangle[0][0]
    - 当 j 为 0 时，dp[i][0] = dp[i - 1][0] + triangle[i][0]
    - 当 j 为 dp[i].length - 1 时，dp[i][length - 1] = dp[i - 1][dp[i - 1].length - 1] + triangle[i][dp[i].length - 1]
**/

/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
  var width = triangle.length
  if (width === 1) {
    return triangle[0][0]
  }
  
  var dp = new Array(width)
  for (var w = 0; w < width; w++) {
    dp[w] = new Array(triangle[w].length).fill(0)
  }
  
  // 初始化
  dp[0][0] = triangle[0][0]
  for (var i = 1; i < width; i++) {
    var len = dp[i].length
    for (var j = 0; j < len; j++) {
      if (j === 0) {
        dp[i][0] = dp[i - 1][0] + triangle[i][0]
      } else if (j === len - 1) {
        dp[i][j] = dp[i - 1][dp[i - 1].length - 1] + triangle[i][j]
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j]
      }
    }
  }
  return Math.min.apply(null, dp[width - 1])
};

/** 优化版 **/
var minimumTotal = function(triangle) {
    for(var i = triangle.length-2;i >= 0;i--){
        for(var j = 0;j < triangle[i].length;j++){
            triangle[i][j] = Math.min(triangle[i+1][j],triangle[i+1][j+1]) + triangle[i][j];
        }
    }
    return triangle[0][0];
}

console.log(minimumTotal([
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]))
