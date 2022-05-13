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
  const height = grid.length
  const width = grid[0].length
  let num = 0
  function dfs(y, x) {
    if (grid[y][x] === '0') {
      return
    }
    // 消消乐，将该片土地销毁以防重复计数
    grid[y][x] = '0'
    if (grid[y - 1] && grid[y - 1][x]) {
      dfs(y - 1, x)
    }
    if (grid[y + 1] && grid[y + 1][x]) {
      dfs(y + 1, x)
    }
    if (grid[y] && grid[y][x - 1]) {
      dfs(y, x - 1)
    }
    if (grid[y] && grid[y][x + 1]) {
      dfs(y, x + 1)
    }
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] === '1') {
        num++
      }
      dfs(y, x)
    }
  }
  return num
}

console.log(numIslands([
  ['1','1','1','1','0'],
  ['1','1','0','1','0'],
  ['1','1','0','0','1'],
  ['0','0','0','0','0']
]))