/**
 * 200. 岛屿数量
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向或竖直方向上相邻的陆地连接形成。
 * 
 * 此外，你可以假设该网格的四条边均被水包围。
 * 实例：
 * 输入:
 * [
 * ['1','1','1','1','0'],
 * ['1','1','0','1','0'],
 * ['1','1','0','0','0'],
 * ['0','0','0','0','0']
 * ]
 * 输出: 1
 */

/**
 * 解决该类题目的核心思路是消除法，从首个元素开始进行尽可能多的深度遍历，每递归到一个元素就打上标记，这样在下次递归到该元素的时候该元素就不会被进行计数了
 */

/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands (grid) {
  let row = grid.length
  if (row < 1) return 0
  let ceil = grid[0].length
  let countIslandNum = 0
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < ceil; j++) {
      if (grid[i][j] === '1') {
        countIslandNum++
        dfs(grid, i, j) // 将周围相连的陆地尽可能的打上标记，这样在遍历到周围元素的时候 countIslandNum 就不会 +1 了
      }
    }
  }
  function dfs (grid, i, j) {
    grid[i][j] = '2' // 已访问
    if (i + 1 < row && grid[i + 1][j] === '1') dfs(grid, i + 1, j)
    if (i - 1 >= 0 && grid[i - 1][j] === '1') dfs(grid, i - 1, j)
    if (j + 1 < ceil && grid[i][j + 1] === '1') dfs(grid, i, j + 1)
    if (j - 1 >= 0 && grid[i][j - 1] === '1') dfs(grid, i, j - 1)  
  }
  return countIslandNum
}

console.log(numIslands([
  ['1','1','1','1','0'],
  ['1','1','0','1','0'],
  ['1','1','0','0','1'],
  ['0','0','0','0','0']
]))