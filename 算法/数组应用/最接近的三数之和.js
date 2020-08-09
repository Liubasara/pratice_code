/**
 * 最接近的三数之和
 * 
 * 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。
 * 返回这三个数的和。假定每组输入只存在唯一答案。
 * 
 * 示例：
 * 输入：nums = [-1,2,1,-4], target = 1
 * 输出：2
 * 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
 */

 /**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function threeSumClosest (nums, target) {
  const len = nums.length
  if (len === 1) return nums[0]
  let minTarget
  let minInstance
  nums.sort((a, b) => a - b)
  for (let i = 0; i < len; i++) {
    let j = i + 1
    let k = len - 1
    while (j < k) {
      let curRes = nums[i] + nums[j] + nums[k]
      if (!minTarget && !minInstance) {
        minTarget = curRes
        minInstance = Math.abs(curRes - target)
      }
      if (curRes === target) {
        return curRes
      }
      if (curRes > target) {
        let distance = Math.abs(curRes - target)
        if (distance < minInstance) {
          minInstance = distance
          minTarget = curRes
        }
        k--
        while (nums[k] === nums[k + 1]) {
          k--
        }
        continue
      }
      if (target > curRes) {
        let distance = Math.abs(curRes - target)
        if (distance < minInstance) {
          minInstance = distance
          minTarget = curRes
        }
        j++
        while (nums[j] === nums[j - 1]) {
          j++
        }
        continue
      }
    }
  }
  return minTarget
}

console.log(threeSumClosest([0, 1, 2], 3))
