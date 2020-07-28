/**
 * 删除字符串中出现次数大于等于2次的相邻字符
 * 例：abbbaca => aaca => ca
 * @param {string} str
 * @returns {string}
 * 思路：快慢指针
 */
function removeDuplicates (str) {
  let p1 = 0
  let p2 = 1
  let arr = str.split('')
  while (p1 < arr.length) {
    if (arr[p2] === arr[p1]) {
      p2++
    } else {
      if (arr[p2 - 1] === arr[p1] && p2 - 1 !== p1) {
        arr.splice(p1, p2 - p1)
        p1 = 0
        p2 = 1
      } else {
        p1++
        p2++
      }
    }
  }
  return arr.join('')
}

console.log(removeDuplicates('abbbaca'))
