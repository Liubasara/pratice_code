/**
 * 真题描述：给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
 * 示例 1: 输入: "aba"
 * 输出: True
 * 示例 2:
 * 输入: "abca"
 * 输出: True
 * 解释: 你可以删除c字符。
 * 注意: 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。
 */

/**思路：
 * 字符串题干中若有“回文”关键字，那么做题时脑海中一定要冒出两个关键字——对称性 和 双指针。这两个工具一起上，足以解决大部分的回文字符串衍生问题。 
 * 
 * 使用两个指针一个指向头部p1一个指向尾部p2，向中间移动，若发生不相等，则尝试跳过左边继续判断 p1+1,p2 和跳过右边判断 p1,p2-1，如接下来能成功，则返回 True，否则为 False
 * */

function validPalindrome (s) {
  const arr = s.split('')
  let isPalindrome = true
  let len = arr.length
  let p1 = 0
  let p2 = len - 1
  let tmp_p1 = null
  let tmp_p2 = null
  let chance = 2 // 游戏币，左边一次失败机会，右边一次失败机会
  while (p2 >= p1 && chance >= 0) {
    if (arr[p1] !== arr[p2]) {
      if (chance === 2) {
        // 机会减少一次，跳过左边继续进行
        tmp_p1 = p1++
        tmp_p2 = p2
        chance--
      } else if (chance === 1) {
        // 跳过左边不行，尝试回档跳过右边
        p1 = tmp_p1
        p2 = --tmp_p2
        chance--
      } else {
        chance--
        isPalindrome = false
      }
      continue
    }
    p1++
    p2--
  }
  return isPalindrome
}

validPalindrome('aba')
