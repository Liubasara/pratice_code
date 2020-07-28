/**
32. 最长有效括号
给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。

示例 1:

输入: "(()"
输出: 2
解释: 最长有效括号子串为 "()"

示例 2:

输入: ")()())"
输出: 4
解释: 最长有效括号子串为 "()()"

**/

/**
  思考过程：
    1. 有一个字符串 s，假设 dp[i][j] 代表从 s[i] 到 s[j] 的最长有效括号子串，则该题目标是 dp[0][s.length - 1]
    2. 对于 dp[i][j]，推出状态转移方程：
      - 若最后一位是开括号，则无法组成有效括号，所以有 if s[j] === '(' { dp[i][j] = dp[i][j - 1] }
      - else 最后一位是闭括号:
        - 当 s[j - 1] === '(' 时，可以得出关系式 dp[i][j] = dp[i][j - 2] + 2
        - else 当 s[j - 1] === ')' 时：
          - 类似回文字符串，当 dp[i + 1][j - 1] !== 0 && s[i] == '(' 时，可以得出关系式 dp[i][j] = dp[i + 1][j - 1] + 2
          - else dp[i][j] = dp[i][j - 1]
    3. 搞定初始状态：
      - s.length <= 1时，无有效括号，返回 0
      - s.length === 2 时，若非 '()'，返回 0，否则返回 2
      - 当 i === j 时，无有效括号，dp[i][j] =  0
      - 当 i + 1 === j 时，若 s[i] + s[j] !== '()'，dp[i][j] =  0，否则 dp[i][j] =  2
**/

/**
 * @param {string} s
 * @return {number}
 */
var wrongLongestValidParentheses = function(s) {
  var len = s.length
  if (len <= 1) return 0
  if (len === 2) {
    return s === '()' ? 2 : 0
  }
  
  var dp = new Array(len)
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len)
  }
  
  // 初始化
  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      if (i === j) {
        dp[i][j] = 0
      }
      if (i + 1 === j) {
        s[i] + s[j] !== '()' ? (dp[i][j] = 0) : (dp[i][j] = 2)
      }
    }
  }
  
  // PS: 由于状态转移方程关联到了 dp[i + 1][j - 1]，所以应该按列遍历
  for (let j = 2; j < len; j++) {
    for (let i = 0; i < j - 1; i++) {
      if (s[j] === '(') {
        dp[i][j] = dp[i][j - 1]
      } else {
        if (s[j - 1] === '(') {
          dp[i][j] = dp[i][j - 2] + 2
        } else {
          if (dp[i + 1][j - 1] !== 0 && s[i] == '(') {
            dp[i][j] = dp[i + 1][j - 1] + 2
          } else {
            dp[i][j] = dp[i][j - 1]
          }
        }
      }
    }
  }
  
  return dp[0][s.length - 1]
  // return dp
};

wrongLongestValidParentheses('()(())') // 错误：结果应为 6，得出 4。错误原因：想用之前做最长回文串的思路来做，但是后来发现它的括号并不一定是嵌套的，比如()()，这种情况下用之前的方法就不行了。


/**以上为自己思考的错误解法QAQ，以下为正确答案**/

/**
  思考过程（摘自[leetcode 题解](https://leetcode-cn.com/problems/longest-valid-parentheses/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-w-7/)）：
  1. dp [ i ] 代表以下标 i 结尾的合法序列的最长长度，则所求目标为 Math.max.apply(null, dp)
     示例：()()(())
  2.  以左括号结尾的字符串一定是非法序列，所以 dp 是零，不用更改。
      以右括号结尾的字符串分两种情况。
      右括号前边是 ( ，类似于 ……（）。
      dp [ i ] = dp [i - 2] + 2 （前一个合法序列的长度，加上当前新增的长度 2）
      类似于上面例子中 index = 3 的时候的情况。
      dp [ 3 ] = dp [ 3 - 2 ] + 2 = dp [ 1 ] + 2 = 2 + 2 = 4
      右括号前边是 )，类似于 ……））。
      此时我们需要判断 i - dp[i - 1] - 1 （前一个合法序列的前边一个位置） 是不是左括号。
      而刚好 index = 4 的位置是左括号，此时 dp [ i ] = dp [ i - 1 ] + dp [ i - dp [ i - 1] - 2 ] + 2 ，也就是 dp [ 7 ] = dp [ 7 - 1 ] + dp [ 7 - dp [ 7 - 1] - 2 ] + 2 = dp [ 6 ] + dp [7 - 2 - 2] + 2 = 2 + 4 + 2 = 8。
      （即当前位置的前一个合法序列的长度 dp [ i - 1 ]，加上匹配的左括号前边的合法序列的长度 dp [ i - dp [ i - 1] - 1 - 1 ]，加上新增的长度 2）
      如果 index = 4 不是左括号，那么此时位置 7 的右括号没有匹配的左括号，所以 dp [ 7 ] = 0 ，不需要更新。
      
  
  时间复杂度：遍历了一次，O（n）。
  空间复杂度：O（n）。
**/

var longestValidParentheses = function (s) {
  var maxans = 0
  var len = s.length
  var dp = new Array(len).fill(0)
  for (var i = 1; i < len; i++) {
    if (s[i] === ')') {
      if (s[i - 1] === '(') {
        // 右括号前边是左括号
        dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2
      } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
        // 右括号前边是右括号
        dp[i] = dp[i - 1] + ((i - dp[i - 1]) >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2
      }
      maxans = Math.max(maxans, dp[i])
    }
  }
  
  return maxans
};

/**
 * 简单做法：入栈出栈
 */
function longestValidParentheses (s) {
  if (s.length <= 1) return 0
  const stack = []
  const strArr = s.split('')
  let maxNum = 0
  for (let i = 1; i < strArr.length; i++) {
    if (stack.length === 0 ||
        strArr[i] === '(' ||
        strArr[stack[stack.length - 1]] === ')' // 防止 )( 这样的情况
       ) 
    {
      stack.push(i)
    } else {
      stack.pop()
      maxNum = i - (stack[stack.length - 1] || -1)
    }
  }
  return maxNum
}

console.log(longestValidParentheses('()(())'))

