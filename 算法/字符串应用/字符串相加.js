/**
  415. 字符串相加
  给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。

  你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。

  

  示例 1：

  输入：num1 = "11", num2 = "123"
  输出："134"
  示例 2：

  输入：num1 = "456", num2 = "77"
  输出："533"
  示例 3：

  输入：num1 = "0", num2 = "0"
  输出："0"
 */

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  const num1Len = num1.length
  const num2Len = num2.length
  let p1 = num1Len - 1
  let p2 = num2Len - 1
  let isAdd = false
  let s = []
  while (p1 >= 0 || p2 >= 0) {
    const numP1 = num1[p1] > 0 ? (num1[p1].charCodeAt() - '0'.charCodeAt()) : 0
    const numP2 = num2[p2] > 0 ? (num2[p2].charCodeAt() - '0'.charCodeAt()) : 0
    const res = isAdd ? numP1 + numP2 + 1 : numP1 + numP2
    isAdd = res >= 10
    isAdd ? s.unshift(res - 10) : s.unshift(res)
    p1--
    p2--
  }
  isAdd && s.unshift(1)
  return s.join('')
};

console.log(addStrings('456', '77')) // 533
console.log(addStrings('0', '0')) // 0
console.log(addStrings('11', '123')) // 134
console.log(addStrings("123456789", "987654321")) // 1111111110
