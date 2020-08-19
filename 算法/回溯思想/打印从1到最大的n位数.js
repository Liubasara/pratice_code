/**
 * 剑指 Offer 17. 打印从1到最大的n位数
 * 输入数字 n，按顺序打印出从 1 到最大的 n 位十进制数。比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。
 * 示例 1:
 * 输入: n = 1
 * 输出: [1,2,3,4,5,6,7,8,9]
 */

/**
 * @param {number} n
 * @return {number[]}
 */
function printNumbers (n) {
  // 思路一：每个位置都有 10 个数（0到9），所以一共有 10 的 n 次方 - 1 个数
  // 但该思路无法解决大数问题
  return Array.from({length: Math.pow(10, n) - 1}, (item, index) => index + 1)
}

function printNumbers2 (n) {
  // 思路2，使用回溯的全排序方法得到所有数字
  const path = []
  const cur = []
  function dfs (nth) {
    if (cur.length !== 0) {
      path.push(cur.join(''))
    }
    if (nth === n) return
    for (let i = 0; i <= 9; i++) {
      if (nth === 0 && i === 0) continue
      let str = i + ''
      cur.push(str)
      dfs(nth + 1)
      cur.pop()
    }
  }
  dfs(0)
  return path
}

console.log(printNumbers(2))
