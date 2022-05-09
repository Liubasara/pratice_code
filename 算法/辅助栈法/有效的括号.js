/**
  20. 有效的括号
  题解：https://leetcode.cn/problems/valid-parentheses/solution/you-xiao-de-gua-hao-by-leetcode-solution/
  给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

  有效字符串需满足：

  左括号必须用相同类型的右括号闭合。
  左括号必须以正确的顺序闭合。
  

  示例 1：

  输入：s = "()"
  输出：true
  示例 2：

  输入：s = "()[]{}"
  输出：true
  示例 3：

  输入：s = "(]"
  输出：false
  示例 4：

  输入：s = "([)]"
  输出：false
  示例 5：

  输入：s = "{[]}"
  输出：true
 */

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const sLen = s.length
  // 只有偶数才有可能凑成合法的括号
  if (sLen % 2 !== 0) return false
  const stack = []
  // 以结束的括号作为 key
  const sMap = {
    '}': '{',
    ')': '(',
    ']': '['
  }
  for (let i = 0; i < sLen; i++) {
    const sI = s[i]
    if (sI in sMap) {
      // 匹配到了结束的括号，此时如果栈中的最后一个括号不是相对应的开始括号，则判断为非法，匹配失败
      if (stack[stack.length - 1] !== sMap[sI]) {
        return false
      }
      // 若能匹配上，则说明凑成了一对括号，出栈
      stack.pop()
    } else {
      stack.push(sI)
    }
  }
  // 最终栈长度为空，则说明全部匹配上，返回 true。否则则说明没有匹配上
  return !stack.length
};

console.log(isValid('()[]{}')) // true
console.log(isValid('{[]}')) // true
console.log(isValid('([)]')) // false