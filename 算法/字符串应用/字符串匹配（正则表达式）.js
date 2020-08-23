/**
 * 剑指 Offer 19. 正则表达式匹配
 * 请实现一个函数用来匹配包含'. '和'*'的正则表达式。模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（含0次）。在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但与"aa.a"和"ab*a"均不匹配。
 * 示例 1:
 *  输入:
 *  s = "aa"
 *  p = "a"
 *  输出: false
 *  解释: "a" 无法匹配 "aa" 整个字符串。
 * 
 * 输入:
 * s = "ab"
 * p = ".*"
 * 输出: true
 * 解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
function isMatch (s, p) {
  if (s === '' && (p === '*' || p === '.*')) return true
  function matchCore (sIndex, pIndex) {
    if (!s.substr(sIndex, sIndex + 1) && !p[pIndex]) return true // 模式和字符串都递归完毕，成功比配
    if (s.substr(sIndex, sIndex + 1) && !p[pIndex]) return false // 字符还没匹配完，模式匹配完了，匹配失败
    if (p[pIndex + 1] === '*') {
      if (p[pIndex] === s[sIndex] || (p[pIndex] === '.' && s.substr(sIndex, sIndex + 1) !== '')) {
        return matchCore(sIndex + 1, pIndex + 2) ||
               matchCore(sIndex + 1, pIndex) ||
               matchCore(sIndex, pIndex + 2)
      } else {
        return matchCore(sIndex, pIndex + 2)
      }
    }
    if (s[sIndex] === p[pIndex] || (p[pIndex] === '.' && s.substr(sIndex, sIndex + 1) !== '')) {
      return matchCore(sIndex + 1, pIndex + 1)
    }
    return false
  }
  return matchCore(0, 0)
}

console.log(isMatch("", '.')) // false
console.log(isMatch('aa', 'a*a')) // true
console.log(isMatch('a', 'ab*')) // true
console.log(isMatch('ab', '.*c')) // false
console.log(isMatch('ab', '.*')) // true
console.log(isMatch('', 'c*')) // true
console.log(isMatch('', '')) // true
