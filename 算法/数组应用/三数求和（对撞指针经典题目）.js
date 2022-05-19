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

// 题解：https://leetcode.cn/problems/3sum/solution/pai-xu-shuang-zhi-zhen-zhu-xing-jie-shi-python3-by/

function threeSum(nums) {
  function quickSort(arr) {
    const arrLen = arr.length
    function start(left = 0, right = arrLen - 1) {
      let p1 = left
      let p2 = right
      let pointIdx = Math.floor((left + right) / 2)
      const pointVal = arr[pointIdx]
      while (p1 <= p2) {
        while (arr[p1] < pointVal && p1 <= p2) {
          p1++
        }
        while (arr[p2] > pointVal && p1 <= p2) {
          p2--
        }
        if (p1 <= p2) {
          ;[arr[p1], arr[p2]] = [arr[p2], arr[p1]]
          p1++
          p2--
        }
      }
      if (p1 > left + 1) {
        start(left, p1 - 1)
      }
      if (p1 < right) {
        start(p1, right)
      }
    }
    start()
    return arr
  }
  // 快速排序 O(NlogN)
  quickSort(nums)
  const numsLen = nums.length
  const res = []
  for (let i = 0; i < numsLen; i++) {
    const numI = nums[i]
    // 若 nums[i]>0 因为已经排序好，所以后面不可能有三个数加等于 0，直接返回结果
    if (numI > 0) return res
    // 去重
    if (i > 0 && numI === nums[i - 1]) continue
    let p1 = i + 1
    let p2 = numsLen - 1
    // 双指针降格为两数求和
    while (p1 < p2) {
      const numP1 = nums[p1]
      const numP2 = nums[p2]
      if (numI + numP1 + numP2 === 0) {
        res.push([numI, numP1, numP2])
        while (p1 < p2 && nums[p1] === nums[p1 + 1]) {
          p1++
        }
        while (p1 < p2 && nums[p2] === nums[p2 - 1]) {
          p2--
        }
        p1++
        p2--
      } else if (numI + numP1 + numP2 < 0) {
        p1++
      } else if (numI + numP1 + numP2 > 0) {
        p2--
      }
    }
  }
  return res
}

// [ [-1, 0, 1], [-1, -1, 2] ]
console.log(threeSum([-1, 0, 1, 2, -1, -4]))
