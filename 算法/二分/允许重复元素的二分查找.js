/**
  NC105 二分查找-II
  描述
  请实现有重复数字的升序数组的二分查找
  给定一个 元素有序的（升序）长度为n的整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的第一个出现的target，如果目标值存在返回下标，否则返回 -1

  数据范围：0 \le n \le 100000\0≤n≤100000 
  进阶：时间复杂度O(logn)\O(logn) ，空间复杂度O(n)\O(n) 
  示例1
  输入：
  [1,2,4,4,5],4
  复制
  返回值：
  2
  复制
  说明：
  从左到右，查找到第1个为4的，下标为2，返回2    
  示例2
  输入：
  [1,2,4,4,5],3
  复制
  返回值：
  -1
  复制
  示例3
  输入：
  [1,1,1,1,1],1
  复制
  返回值：
  0

  PS: 如果将问题进一步拓展，要求输出target在nums中的「第一个」和「最后一个」位置 的话，该如何求解？
  题解：https://www.nowcoder.com/practice/4f470d1d3b734f8aaf2afb014185b395?tpId=188&&tqId=38588&rp=1&ru=/activity/oj&qru=/ta/job-code-high-week/question-ranking
 */

/**
 * 
 * @param {number[]} nums 
 * @param {number} target 
 */
function search(nums, target) {
  const numsLen = nums.length
  const res = [-1, -1]
  // 第一次二分, 找出第一次出现的位置
  let start = 0
  let end = numsLen - 1
  let pointIdx = -1
  while (start < end) {
    pointIdx = Math.floor((start + end) / 2)
    if (nums[pointIdx] >= target) {
      end = pointIdx
    } else {
      start = pointIdx + 1
    }
  }
  if (nums[start] === target) {
    res[0] = start
  }
  // 第二次二分, 找出最后一次出现的位置
  start = 0
  end = numsLen - 1
  pointIdx = -1
  while (start < end) {
    // 差异点1
    pointIdx = Math.floor((start + end + 1) / 2)
    // 差异点2
    if (nums[pointIdx] <= target) {
      start = pointIdx
    } else {
      end = pointIdx - 1
    }
  }
  if (nums[start] === target) {
    res[1] = start
  }
  return res
}

console.log(search([1, 2, 4, 4, 5], 4))
