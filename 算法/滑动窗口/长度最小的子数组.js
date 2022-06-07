/**
  209. 长度最小的子数组
  给定一个含有 n 个正整数的数组和一个正整数 target 。

  找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

  

  示例 1：

  输入：target = 7, nums = [2,3,1,2,4,3]
  输出：2
  解释：子数组 [4,3] 是该条件下的长度最小的子数组。
  示例 2：

  输入：target = 4, nums = [1,4,4]
  输出：1
  示例 3：

  输入：target = 11, nums = [1,1,1,1,1,1,1,1]
  输出：0

  变式: 要求列出所有满足 >= target 的连续子序列
 */

/** 注意这题是 >= target
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  const numsLen = nums.length
  if (numsLen <= 1) return nums[0] >= target ? 1 : 0
  let p1 = 0
  let p2 = 0
  let curLen = 0
  let minLen = 0
  let sum = target
  const res = []
  while (p2 < numsLen) {
    curLen++
    sum -= nums[p2]
    while (sum < 0) {
      // 因为条件是 >=，所以 sum 不能真的 > 0，只能尽可能取最短的连续数组
      if (sum + nums[p1] > 0) {
        break
      }
      sum += nums[p1]
      p1++
      curLen--
    }

    if (sum <= 0) {
      res.push(nums.slice(p1, p2 + 1))
      minLen = minLen ? Math.min(minLen, curLen) : curLen
    }
    p2++
  }
  return [minLen, res]
};

// 2
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]))
// 0
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]))
// 1
console.log(minSubArrayLen(4, [1, 4, 4]))
// 3
console.log(minSubArrayLen(11, [1, 2, 3, 4, 5]))