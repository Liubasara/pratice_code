/**
 * 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 * 示例:
 * 
 * 输入: n = 4, k = 2
 * 输出:
 * [
 *   [2,4],
 *   [3,4],
 *   [2,3],
 *   [1,2],
 *   [1,3],
 *   [1,4],
 * ]
 */

 /** 讨巧回溯法 以坑位为基准进行回溯
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  const path = []
  const cur = []
  function dfs (nth) {
    if (cur.length === k) {
      path.push([...cur])
      return
    }
    for (let i = nth; i <= n; i++) {
      cur.push(i)
      dfs(i + 1) // 下一个数字
      cur.pop(i)
    }
  }
  // 入参为第一个数字
  dfs(1)
  return path
}

 /** 正儿八经回溯法 以数字取或不取为基准进行回溯
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine2 = function(n, k) {
  const path = []
  const cur = []
  function dfs (nth) {
    if (nth === n) {
      if (cur.length === k) {
        path.push([...cur])
      }
      return
    }
    let optionArr = [nth + 1, null]
    for (let i = 0; i < 2; i++) {
      const value = optionArr[i]
      if (value) {
        cur.push(value)
      }
      dfs(nth + 1)
      if (value) {
        cur.pop()
      }
    }
  }
  dfs(0)
  return path
}

console.log(combine2(4, 2))
