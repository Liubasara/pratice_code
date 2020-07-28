/**
 * 滑动窗口的最大值
 * @param {Array<number>} nums 
 * @param {number} k 
 */
function maxSlidingWindow (nums, k) {
  const len = nums.length
  let p1 = 0, p2 = k - 1, max = -1, res = []
  while (p2 < len) {
    if (max < p1) {
      max = p1
      for (let i = p1; i <= p2; i++) {
        if (nums[i] > nums[max]) {
          max = i
        }
      }
    } else {
      max = nums[max] > nums[p2] ? max : p2
    }
    res[p1] = nums[max]
    p1++
    p2++
  }
  return res
}

console.log(maxSlidingWindow([1, 2, 3, 4, 5], 3))
