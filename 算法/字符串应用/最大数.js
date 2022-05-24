/**
  179. 最大数
  给定一组非负整数 nums，重新排列每个数的顺序（每个数不可拆分）使之组成一个最大的整数。

  注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数。

  

  示例 1：

  输入：nums = [10,2]
  输出："210"
  示例 2：

  输入：nums = [3,30,34,5,9]
  输出："9534330"
 */

/** 题解： https://leetcode.cn/problems/largest-number/solution/js-zui-da-shu-by-bertil-5d4w/ */

/**复杂度：O(nlognlogm)
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
  const s = nums.sort((a, b) => {
    return `${b}${a}` - `${a}${b}`
  }).join('')
  return s[0] === '0' ? '0' : s
};

console.log(largestNumber([3,30,34,5,9])) // 9534330