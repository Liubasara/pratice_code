/**
  什么时候你需要联想到对撞指针？
  两个关键字——“有序”和“数组”。
  没错，见到这两个关键字，立刻把双指针法调度进你的大脑内存。普通双指针走不通，立刻想对撞指针！
*/

/**
  给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
  注意：答案中不可以包含重复的三元组。
  
  示例： 给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
*/

function threeSum (nums) {
  // 先对数组进行升序排序
  nums = nums.sort(function (a, b) {
    return a - b
  })
  const result = []
  const len = nums.length - 1
  for (let i = 0;i < len - 2;i++) {
    let j = i + 1
    let k = len
    // 跳过重复的数据
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    while (j < k) {
      if (nums[i] + nums[j] + nums[k] < 0) {
        // 三数之和小于0，左指针前进
        j++
        while (nums[j] === nums[j - 1]) {
          // 跳过重复的数据
          j++
        }
        continue
      }
      if (nums[i] + nums[j] + nums[k] > 0) {
        // 三数之和大于0，右指针后退
        k--
        while (nums[k] === nums[k + 1]) {
          // 跳过重复的数据
          k--
        }
        continue
      }
      if (nums[i] + nums[j] + nums[k] === 0) {
        // 三数之和等于0，入栈，左右指针变更
        result.push([nums[i], nums[j], nums[k]])
        j++
        k--
        while (nums[j] === nums[j - 1]) {
          // 跳过重复的数据
          j++
        }
        while (nums[k] === nums[k + 1]) {
          // 跳过重复的数据
          k--
        }
      }
    }
  }
  return result
}

threeSum([-1, 0, 1, 2, -1, -4])
