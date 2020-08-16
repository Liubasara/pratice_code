/**
 * 剑指 Offer 13. 机器人的运动范围
 * 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。
 * 但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？
 * 
 * 示例 1：
 * 输入：m = 2, n = 3, k = 1
 * 输出：3
 * 示例 2：
 * 
 * 输入：m = 3, n = 1, k = 0
 * 输出：1
 */

/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
function movingCount (m, n, k) {
  if (k < 0) return 0
  const visited = new Array(m).fill(false).map(() => new Array(n).fill(false))
  let countNum = 0

  function dfs (row, ceil) {
    let sumI = 0
    let sumJ = 0
    let tmpI = row
    let tmpJ = ceil
    while (tmpI !== 0) {
      // row 各位数相加
      sumI += tmpI % 10
      tmpI = Math.floor(tmpI / 10)
    }
    while (tmpJ !== 0) {
      // ceil 各位数相加
      sumJ += tmpJ % 10
      tmpJ = Math.floor(tmpJ / 10)
    }
    if (sumI + sumJ > k) {
      return
    }
    countNum++
    let optionArr = [
      [row + 1, ceil],
      [row - 1, ceil],
      [row, ceil + 1],
      [row, ceil - 1]
    ]
    for (let i = 0; i < 4; i++) {
      const [nextRow, nextCeil] = optionArr[i]
      if (
        nextRow >= m ||
        nextRow < 0 ||
        nextCeil < 0 ||
        nextCeil >= n ||
        visited[nextRow][nextCeil]
      ) {
        // 剪枝
        continue
      }
      visited[nextRow][nextCeil] = true
      dfs(nextRow, nextCeil)
    }
  }
  visited[0][0] = true
  dfs(0, 0)
  return countNum
}

console.log(movingCount(2, 3, 0))
