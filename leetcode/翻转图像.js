/**
 * @param {number[][]} A
 * @return {number[][]}
 */
var flipAndInvertImage = function(A) {
  function reverseNum (num) {
    return num === 0 ? 1 : 0
  }
  for (let row of A) {
    let start = 0
    let end = row.length - 1
    while (start < end) {
      // 翻转每一行
      [row[start], row[end]] = [row[end], row[start]]
      // 反转
      row[start] = reverseNum(row[start])
      row[end] = reverseNum(row[end])
      end--
      start++
    }
    if (row.length % 2 !== 0) {
      row[start] = reverseNum(row[start])
    }
  }
  return A
}

var arr = [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
flipAndInvertImage(arr)
console.log(arr)