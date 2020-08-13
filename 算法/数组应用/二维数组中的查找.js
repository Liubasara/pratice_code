
/** 
 * 剑指 Offer 04. 二维数组中的查找
 * 示例:
 * 
 * 现有矩阵 matrix 如下：
 * 
 * [
 *   [1,   4,  7, 11, 15],
 *   [2,   5,  8, 12, 19],
 *   [3,   6,  9, 16, 22],
 *   [10, 13, 14, 17, 24],
 *   [18, 21, 23, 26, 30]
 * ]
 * 给定 target = 5，返回 true。
 * 
 * 给定 target = 20，返回 false。
 * 注意不能用暴力解法，复杂度最好降到 O(N) 以下

*/

/** 二分解法，O(n + logm) 不符合
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
  const row = matrix.length
  if (row < 1) return false
  const ceil = matrix[0].length
  if (ceil < 1) return false
  for (let i = 0; i < row; i++) {
      if (matrix[i][0] > target || matrix[i][ceil - 1] < target) continue
      let targetRow = matrix[i]
      let start = 0
      let end = ceil - 1
      while (start <= end) {
          let middle = Math.floor((end - start) / 2 + start)
          if (targetRow[middle] === target) return true
          if (targetRow[middle] > target) {
              end = middle - 1
          } else {
              start = middle + 1
          }
      }
  }
  
  return false
}

/**
 * 右上角开始的标志位解法
 * 从右上角开始找有个方便的地方就是他左边的都是比他小的，他下边的都是比他大的，如果target大于当前值我们就往下边找，如果target小于当前值我们就往左边找
 */
function findNumberIn2DArray2 (matrix, target) {
  const row = matrix.length
  if (row < 1) return false
  const ceil = matrix[0].length
  if (ceil < 1) return false
  let rowP = 0
  let ceilP = ceil - 1
  while (rowP < row && ceilP >= 0) {
    if (matrix[rowP][ceilP] === target) {
      return true
    }
    if (matrix[rowP][ceilP] > target) {
      ceilP--
      continue
    }
    if (matrix[rowP][ceilP] < target) {
      rowP++
      continue
    }
  }
  return false
}

console.log(findNumberIn2DArray2(
  [[-5]],
  -10
))
