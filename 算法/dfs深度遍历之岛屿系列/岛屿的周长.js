/**
  463. 岛屿的周长
  给定一个 row x col 的二维网格地图 grid ，其中：grid[i][j] = 1 表示陆地， grid[i][j] = 0 表示水域。

  网格中的格子 水平和垂直 方向相连（对角线方向不相连）。整个网格被水完全包围，但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）。

  岛屿中没有“湖”（“湖” 指水域在岛屿内部且不和岛屿周围的水相连）。格子是边长为 1 的正方形。网格为长方形，且宽度和高度均不超过 100 。计算这个岛屿的周长。

  

  示例 1：



  输入：grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
  输出：16
  解释：它的周长是上面图片中的 16 个黄色的边
  示例 2：

  输入：grid = [[1]]
  输出：4
  示例 3：

  输入：grid = [[1,0]]
  输出：4
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
  const height = grid.length
  const width = grid[0].length
  let perimeter = 0
  function dfs(y, x) {
    if (grid[y][x] !== 1) {
      return
    }
    let meter = 0
    grid[y][x] = 2
    if (grid[y - 1]) {
      const gridElm = grid[y - 1][x]
      if (gridElm === 0) {
        meter++
      }
      dfs(y - 1, x)
    } else {
      meter++
    }

    if (grid[y + 1]) {
      const gridElm = grid[y + 1][x]
      if (gridElm === 0) {
        meter++
      }
      dfs(y + 1, x)
    } else {
      meter++
    }

    if (grid[y][x + 1] !== undefined) {
      const gridElm = grid[y][x + 1]
      if (gridElm === 0) {
        meter++
      }
      dfs(y, x + 1)
    } else {
      meter++
    }

    if (grid[y][x - 1] !== undefined) {
      const gridElm = grid[y][x - 1]
      if (gridElm === 0) {
        meter++
      }
      dfs(y, x - 1)
    } else {
      meter++
    }
    perimeter += meter
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      dfs(y, x)
    }
  }
  return perimeter
};

// 16
console.log(islandPerimeter([
  [0, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 0]
]))