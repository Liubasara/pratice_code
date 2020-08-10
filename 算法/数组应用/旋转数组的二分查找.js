/**
 * 对旋转1次的有序列表（例如 [40 50 100 1 2 3 4 5 7 9 20]）进行二分查找
 * input: [40, 50, 100, 1, 2, 3, 4, 5, 7, 9, 20]
 * 5
 * output: 7
 * 要求时间复杂度为 O(logn)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search (nums, target) {
  /**
   * 对于这类问题，需要先通过二分查找找到旋转点，再从剩余的两个数组中选一个进行二分查找
   */
  const len = nums.length
  let start = 0
  let end = len - 1
  let splitPointIndex = Math.floor((end - start) / 2 + start)
  while (start <= end) {
    // 先通过二分查找找到旋转点
    if (nums[splitPointIndex] > nums[splitPointIndex + 1]) break
    if (nums[splitPointIndex] < nums[start]) {
      end = splitPointIndex
      splitPointIndex = Math.floor((end - start) / 2 + start)
    } else {
      start = splitPointIndex
      splitPointIndex = Math.floor((end - start) / 2 + start)
    }
  }
  if (target <= nums[len - 1]) {
    // target 在切割点右边的有序数组里
    start = splitPointIndex + 1
    end = len - 1
  } else {
    // target 比右边有序数组最大的一位还要大，意味着他在旋转后的这部分数组里
    start = 0
    end = splitPointIndex
  }
  let targetIndex = Math.floor((end - start) / 2 + start)
  while (start <= end) {
    if (nums[targetIndex] === target) return targetIndex
    if (nums[targetIndex] < target) {
      start = targetIndex + 1
      targetIndex = Math.floor((end - start) / 2 + start)
    } else {
      end = targetIndex - 1
      targetIndex = Math.floor((end - start) / 2 + start)
    }
  }
}

console.log(search([40, 50, 100, 1, 2, 3, 4, 5, 7, 8, 9, 20], 20))
