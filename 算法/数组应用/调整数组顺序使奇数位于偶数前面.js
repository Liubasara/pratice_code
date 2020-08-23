/**
 * 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
 * 示例：
 * 输入：nums = [1,2,3,4]
 * 输出：[1,3,2,4] 
 * 注：[3,1,2,4] 也是正确的答案之一。
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
function exchange(nums) {
  const len = nums.length
  if (len < 1) return nums
  let p1 = []
  let p2 = []
  let p = 0
  while (p < len) {
    if (nums[p] & 1 === 1) {
      p1.push(nums[p])
    } else {
      p2.push(nums[p])
    }
    p++
  }
  return p1.concat(p2)
}

function exchange2 (nums) {
  // 类似快排思路，不使用额外空间
  let p1 = 0, p2 = nums.length - 1
  while (p1 <= p2) {
    while (p1 <= p2 && (nums[p1] & 1) === 1) {
      p1++
    }
    while (p1 <= p2 && (nums[p2] & 1) === 0) {
      p2--
    }
    if (p1 <= p2) {
      // 此时 p2 位于奇数，p1 位于偶数
      ;[nums[p1], nums[p2]] = [nums[p2], nums[p1]]
      p1++
      p2--
    }
  }
  return nums
}

// console.log(exchange2([2, 1, 3, 4, 5]))
// console.log(exchange2([1, 2, 3, 4]))
console.log(exchange2([2, 4, 6]))
