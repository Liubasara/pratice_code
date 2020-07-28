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

 /**
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

console.log(combine(4, 2))
