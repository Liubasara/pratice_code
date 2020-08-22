/**
 * 剑指 Offer 20. 表示数值的字符串
 * 请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。
 * 例如，字符串"+100"、"5e2"、"-123"、"3.1416"、"-1E-16"、"0123"都表示数值，但"12e"、"1a3.14"、"1.2.3"、"+-5"及"12e+5.4"都不是。
 */

/**
 * @param {string} s
 * @return {boolean}
 */
function isNumber (s) {
  // 简单偷鸡版本
  if (s.trim() === '') return false
  return !isNaN(Number(s))
}

/**
 * @param {string} s
 * @return {boolean}
 */
function isNumber2 (s) {
  function scanInteger (tmp) {
    // 扫描可能以表示正负或者以 '-' 为起始的 0 ～ 9 的数位
    let { index } = tmp
    if (s[index] === '+' || s[index] === '-') {
      index++
    }
    tmp.index = index
    return scanUnsignedInteger(tmp)
  }
  function scanUnsignedInteger (tmp) {
    // 用于扫描字符串中 0 ～ 9 的无符号数位
    let { index } = tmp
    const before = index
    while (
      s.slice(index, index + 1) !== '' &&
      s.slice(index, index + 1) !== ' ' &&
      s.slice(index, index + 1) >= 0 &&
      s.slice(index, index + 1) <= 9
    ) {
      index++
    }
    tmp.index = index
    return index > before
  }
  if (!s || s.trim() === '' || s.trim() === '.') return false
  let tmp = { index: 0 }
  s = s.trim()
  let numeric = scanInteger(tmp)
  if (s[tmp.index] === '.') {
    // 小数部分
    tmp.index++
    numeric = scanUnsignedInteger(tmp) || numeric
  }
  if (s[tmp.index] === 'e' || s[tmp.index] === 'E') {
    // 如果出现 e，接下来则是指数部分
    tmp.index++
    numeric = numeric && scanInteger(tmp)
  }
  return numeric && s.slice(tmp.index, tmp.index + 1) === ''
}

// console.log(isNumber2('+100e1')) // true
// console.log(isNumber2('1 2')) // false
// console.log(isNumber2('1 ')) // true
// console.log(isNumber2('.')) // false
// console.log(isNumber2('.23')) // true
