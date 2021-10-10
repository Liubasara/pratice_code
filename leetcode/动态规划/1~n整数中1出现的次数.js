/**
 * 输入一个整数 n ，求1～n这n个整数的十进制表示中1出现的次数。
 *
 * 例如，输入12，1～12这些整数中包含1 的数字有1、10、11和12，1一共出现了5次。
 *
 *
 * 示例 1：
 *
 * 输入：n = 12
 * 输出：5
 *
 * 示例 2：
 *
 * 输入：n = 13
 * 输出：6
 */

// 详细解析：https://www.bilibili.com/video/BV1uJ411573j

/**
 * @param {number} n
 * @return {number}
 */
var countDigitOne = function (n) {
  if (n < 0) {
    return 0
  }
  let count = 0
  const str = n + ''

  const len = str.length

  for (let i = 1; i <= len; i++) {
    const high = Math.floor(n / Math.pow(10, i))
    count += high * Math.pow(10, i - 1)
    const cur = +str[len - i]
    if (cur > 1) {
      count += Math.pow(10, i - 1)
    } else if (cur === 1) {
      count += (n % Math.pow(10, i - 1)) + 1
    }
  }
  return count
}
