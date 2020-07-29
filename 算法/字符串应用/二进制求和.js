/**
 * 给你两个二进制字符串，返回它们的和（用二进制表示）。
 * 输入为 非空 字符串且只包含数字 1 和 0。
 */

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
function addBinary (a, b) {
  const lenA = a.length
  const lenB = b.length
  let listA = a.split('')
  let listB = b.split('')
  if (lenA > lenB) {
    listB = new Array(lenA - lenB).fill('0').concat(listB)
  } else {
    listA = new Array(lenB - lenA).fill('0').concat(listA)
  }
  let p1 = listA.length - 1, p2 = listB.length - 1
  let needUp = false
  let res = []
  while (p1 >= 0 && p2 >= 0) {
    // 从后往前累加
    if (listA[p1] === '0' && listB[p2] === '0') {
      if (needUp) {
        res.unshift('1')
        needUp = false
      } else {
        res.unshift('0')
        needUp = false
      }
    } else if (listA[p1] === '0' && listB[p2] === '1' || listA[p1] === '1' && listB[p2] === '0') {
      if (needUp) {
        res.unshift('0')
        needUp = true
      } else {
        res.unshift('1')
        needUp = false
      }
    } else if (listA[p1] === '1' && listB[p2] === '1') {
      if (needUp) {
        res.unshift('1')
        needUp = true
      } else {
        res.unshift('0')
        needUp = true
      }
    }
    p1--
    p2--
  }
  if (needUp) {
    res.unshift('1')
  }
  return res.join('')
}

// console.log(addBinary('1010', '1011'))
console.log(addBinary('11', '1'))
