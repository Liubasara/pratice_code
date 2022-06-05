/**
  33. 搜索旋转排序数组
  整数数组 nums 按升序排列，数组中的值 互不相同 。

  在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

  给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
  要求时间复杂度 O(logn)
  示例 1：

  输入：nums = [4,5,6,7,0,1,2], target = 0
  输出：4
  示例 2：

  输入：nums = [4,5,6,7,0,1,2], target = 3
  输出：-1
  示例 3：

  输入：nums = [1], target = 0
  输出：-1
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  const numsLen = nums.length
  if (!numsLen) return -1
  if (numsLen === 1) return nums[0] === target ? 0 : -1
  let start = 0
  let end = numsLen - 1
  let pointIdx = -1
  while (start <= end) {
    pointIdx = Math.floor((start + end) / 2)
    if (nums[pointIdx] === target) return pointIdx
    if (nums[pointIdx] >= nums[0]) {
      if (nums[pointIdx] > target && nums[0] <= target) {
        end = pointIdx - 1
      } else {
        start = pointIdx + 1
      }
    } else {
      if (nums[pointIdx] < target && nums[numsLen - 1] >= target) {
        start = pointIdx + 1
      } else {
        end = pointIdx - 1
      }
    }
  }
  return -1
}

// 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 0))
// -1
console.log(search([4, 5, 6, 7, 0, 1, 2], 3))
// -1
console.log(search([1], 0))
// 1
console.log(search([3, 1], 1))
// 0
console.log(search([3, 5, 1], 3))
// 0
console.log(search([5, 1, 3], 5))
// 5
console.log(search([3, 4, 5, 6, 1, 2], 2))
