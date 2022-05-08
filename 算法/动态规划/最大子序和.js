/**
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 输入: [-2,1,-3,4,-1,2,1,-5,4],
 * 输出: 6
 * 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 */

/**
 * 动态规划法
 * 设 dp[i] 为以 nums[i] 结尾时最大的子序和，则所求的值为 dp 中的最大值
 * 状态转移方程 dp[i] = Math.max(nums[i], dp[i - 1] + nums[i])
 * 初始化条件：dp[0] = nums[0]
 * @param {number[]} nums 
 */
var maxSubArray = function (nums) {
  const numsLen = nums.length
  if (numsLen <= 1) return nums[0]
  const dp = []
  dp[0] = nums[0]
  let i = 1
  for (; i < numsLen; i++) {
    const numI = nums[i]
    dp[i] = Math.max(numI, dp[i - 1] + numI)
  }
  return Math.max(...dp)
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])) // 6
