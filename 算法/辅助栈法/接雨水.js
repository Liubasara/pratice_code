/**
  题解：https://leetcode.cn/problems/trapping-rain-water/solution/trapping-rain-water-by-ikaruga/

  42. 接雨水
  给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
  

  示例 1：

  输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
  输出：6
  解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
  示例 2：

  输入：height = [4,2,0,3,2,5]
  输出：9
 */

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const heightLen = height.length
  // 单调递减栈，相当于一个倒序数组
  const stack = []
  let res = 0
  for (let i = 0; i < heightLen; i++) {
    const heightI = height[i]
    // 单调递减栈，最新 push 进去的一定得是最小的，比它小的数全都要出栈进行判断
    while (stack.length && height[stack[stack.length - 1]] < heightI) {
      const rightIdx = i
      const right = heightI
      const midIdx = stack.pop()
      const mid = height[midIdx]
      if (!stack.length) {
        // 漏勺，左边没有墙，雨水接不住
        break
      }
      // left 只用于判断，不会出栈
      const leftIdx = stack[stack.length - 1]
      const left = height[leftIdx]
      const curWidth = rightIdx - leftIdx - 1
      const curHeight = Math.min(left, right) - mid
      res += curWidth * curHeight
    }
    stack.push(i)
  }
  return res
};

// 6
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
// 9
console.log(trap([4, 2, 0, 3, 2, 5]))

/**
 * 双指针 对撞指针做法
 * @param {numbers[]} height 
 * @returns 
 */
var trap = function (height) {
  let res = 0
  let left = 0
  let right = height.length - 1
  let leftMax = 0
  let rightMax = 0
  while (left < right) {
    leftMax = Math.max(leftMax, height[left])
    rightMax = Math.max(rightMax, height[right])
    if (height[left] < height[right]) {
      res += leftMax - height[left]
      left++
    } else {
      res += rightMax - height[right]
      right--
    }
  }
  return res
}
