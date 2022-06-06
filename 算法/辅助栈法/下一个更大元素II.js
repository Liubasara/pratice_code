/**
  503. 下一个更大元素 II
  给定一个循环数组 nums （ nums[nums.length - 1] 的下一个元素是 nums[0] ），返回 nums 中每个元素的 下一个更大元素 。

  数字 x 的 下一个更大的元素 是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1 。

  

  示例 1:

  输入: nums = [1,2,1]
  输出: [2,-1,2]
  解释: 第一个 1 的下一个更大的数是 2；
  数字 2 找不到下一个更大的数； 
  第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
  示例 2:

  输入: nums = [1,2,3,4,3]
  输出: [2,3,4,-1,4]

  题解：https://leetcode.cn/problems/next-greater-element-ii/solution/dong-hua-jiang-jie-dan-diao-zhan-by-fuxu-4z2g/
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
  const numsLen = nums.length
  // 单调递增栈，存储元素的下标，确保下标代表的元素，从栈底到栈顶元素递增
  // 如果元素是单调递减的（则他们的「下一个更大元素」相同），我们就把这些元素保存
  // 直到找到一个较大的元素；把该较大元素逐一跟保存了的元素比较，如果该元素更大，那么它就是前面元素的「下一个更大元素」。
  const stack = []
  const res = new Array(numsLen).fill(-1)
  for (let i = 0; i < 2 * numsLen - 1; i++) {
    // 循环数组 nums[i % numsLen], i++ 可以一直循环获取数组中的元素
    const idx = i % numsLen
    const numI = nums[idx]
    while (stack.length && nums[stack[stack.length - 1]] < numI) {
      res[stack.pop()] = numI
    }
    stack.push(idx)
  }
  return res
};

// [2,3,4,-1,4]
console.log(nextGreaterElements([1, 2, 3, 4, 3]))
