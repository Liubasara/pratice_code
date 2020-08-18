/**
 * 剑指 Offer 16. 数值的整数次方
 * 实现函数double Power(double base, int exponent)，求base的exponent次方。不得使用库函数，同时不需要考虑大数问题。
 * 示例 1:
 * 输入: 2.00000, 10
 * 输出: 1024.00000
 */

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
function myPow (x, n) {
  /**
   * 正常做法：1. n 个 x 循环相乘
   *          2. 如果 n = 0，直接返回 1
   *          3. 如果 n < 0，需要取倒数，意思即是 1 / abs(n) 个 x 相乘
   */
  if (n === 0) return 1
  let times = n
  let flag = false
  let sum = 1
  if (n < 0) {
    times = parseInt(-n)
    flag = true
  }
  while (times > 0) {
    sum = sum * x
    times--
  }
  flag && (sum = 1 / sum)
  return sum
}

function myPow2 (x, n) {
  /**
   * 优化做法，上面的 1 做法在遇到大数时行不通，且时间复杂度为 O(N)
   * 优化的思路如下，将 a 的 n 次方做成 a 的 n/2 次方相乘，而 a 的 n/2 次方又可以继续拆分，最后拆成两种情况
   * - n 为偶数的时候，a 的 n 次方拆成两个 a 的 n/2 次方相乘
   * - n 为奇数的时候，a 的 n 次方拆成两个 a 的 (n-1)/2 次方相乘再乘以一个 a
   */
  if (n === 0) return 1
  let result = 1
  let tmp = Math.abs(n)
  while (tmp) {
    if (tmp & 1 === 1) {
      // 用 & 运算符可以代替 % 运算符来判断一个数的奇偶，若 n & 1 为 1 则是奇数
      result *= x
    }
    x *= x
    // tmp = tmp >> 1 // 可以使用右移位运算来代替除以2，还能顺便向下取整，但是会无法应对某些大数的情况
    // [为什么不要在 JavaScript 中使用位操作符](https://jerryzou.com/posts/do-you-really-want-use-bit-operators-in-JavaScript/)
    tmp = Math.floor(tmp / 2)
  }
  return n > 0 ? result : (1 / result)
}

console.log(myPow2(1.00000, -2147483648))
