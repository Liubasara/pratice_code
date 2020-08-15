/**
 * 剑指 Offer 12. 矩阵中的路径
 * 请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一格开始，每一步可以在矩阵中向左、右、上、下移动一格。
 * 如果一条路径经过了矩阵的某一格，那么该路径不能再次进入该格子。
 * 例如，在下面的3×4的矩阵中包含一条字符串“bfce”的路径（路径中的字母用加粗标出）。
 * 示例 1：
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
 * 输出：true
 * 示例 2：
 * 
 * 输入：board = [["a","b"],["c","d"]], word = "abcd"
 * 输出：false
 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
function exist (board, word) {
  /**
   * 我的 dfs 解决方案，孤岛 dfs 问题的变种解决方案，代码看着有点累赘
   */
  const wordLen = word.length
  const rowLen = board.length
  if (rowLen < 1) return false
  const ceilLen = board[0].length
  if (ceilLen < 1) return false
  if ((rowLen * ceilLen) < wordLen) return false
  let cur = []
  const wordArr = word.split('')
  let findFlag = false
  function dfs (row, ceil, wordIndex) {
    cur.push(wordArr[wordIndex])
    if (cur.length === wordLen) {
      findFlag = true
      return
    }
    let tmp = board[row][ceil]
    board[row][ceil] = 'visited'
    if (row - 1 >= 0 && board[row - 1][ceil] === wordArr[wordIndex + 1]) {
      dfs(row - 1, ceil, wordIndex + 1)
      if (findFlag) return
    }
    if (row + 1 < rowLen && board[row + 1][ceil] === wordArr[wordIndex + 1]) {
      dfs(row + 1, ceil, wordIndex + 1)
      if (findFlag) return
    }
    if (ceil - 1 >= 0 && board[row][ceil - 1] === wordArr[wordIndex + 1]) {
      dfs(row, ceil - 1, wordIndex + 1)
      if (findFlag) return
    }
    if (ceil + 1 < ceilLen && board[row][ceil + 1] === wordArr[wordIndex + 1]) {
      dfs(row, ceil + 1, wordIndex + 1)
      if (findFlag) return
    }
    cur.pop()
    board[row][ceil] = tmp
  }
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < ceilLen; j++) {
      if (board[i][j] === wordArr[0]) {
        // 找到开头的数字，进行深度优先遍历
        cur = []
        dfs(i, j, 0)
        if (findFlag) return true
      }
    }
  }
  // 整个二维数组中都没有找到开头的数字
  return findFlag
}

/** 正儿八经回溯法，但耗时比第一种方法多
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
function exist2 (board, word) {
  const wordLen = word.length
  const rowLen = board.length
  if (rowLen < 1) return false
  const ceilLen = board[0].length
  if (ceilLen < 1) return false
  if ((rowLen * ceilLen) < wordLen) return false
  let cur = []
  const wordArr = word.split('')
  let findFlag = false
  let visited = new Array(rowLen).fill(false).map(() => new Array(ceilLen).fill(false))
  function dfs (row, ceil, wordIndex) {
    if (cur.length === wordLen) {
      findFlag = true
      return
    }
    // 列出选项
    const optionArr = [
      [row + 1, ceil], // 上
      [row - 1, ceil], // 下
      [row, ceil - 1], // 左
      [row, ceil + 1] // 右
    ]
    for (let i = 0; i < 4; i++) {
      const [nextRow, nextCeil] = optionArr[i]
      if (
        nextRow < 0 ||
        nextRow >= rowLen ||
        nextCeil < 0 ||
        nextCeil >= ceilLen ||
        visited[nextRow][nextCeil] ||
        board[nextRow][nextCeil] !== wordArr[wordIndex + 1]
      ) {
        // 剪枝
        continue
      }
      visited[nextRow][nextCeil] = true
      cur.push(board[nextRow][nextCeil])
      dfs(nextRow, nextCeil, wordIndex + 1)
      if (findFlag) return true
      cur.pop()
      visited[nextRow][nextCeil] = false
    }
  }

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < ceilLen; j++) {
      if (board[i][j] === wordArr[0]) {
        // 找到开头的数字，进行深度优先遍历
        visited[i][j] = true
        cur = [wordArr[0]]
        dfs(i, j, 0)
        if (findFlag) return true
        visited[i][j] = false
      }
    }
  }
  // 整个二维数组中都没有找到开头的数字
  return findFlag
}

// true
// console.log(exist2([
//   ["A","B","C","E"],
//   ["S","F","C","S"],
//   ["A","D","E","E"]
// ], 'ABCCED'))

// true
// console.log(exist2([
//   ["A","B","C","E"],
//   ["S","F","E","S"],
//   ["A","D","E","E"]
// ], 'ABCESEEEFS'))

// false
// console.log(exist2([
//   ["a","a","a","a"],
//   ["a","a","a","a"],
//   ["a","a","a","a"]
// ], 'aaaaaaaaaaaaa'))

// false
// console.log(exist2([
//   ["a","a","a","a"],
//   ["a","a","a","a"],
//   ["a","a","a","a"]
// ], 'aaaaaaaaaaab'))

// true
// console.log(exist2(
//   [["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","b"]],
//   "baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
// ))

console.log(exist2([
  ["C","A","A"],
  ["A","A","A"],
  ["B","C","D"]
],
  "AAB"
))
