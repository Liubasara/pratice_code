/**
  剑指 Offer II 060. 出现频率最高的 k 个数字
  给定一个整数数组 nums 和一个整数 k ，请返回其中出现频率前 k 高的元素。可以按 任意顺序 返回答案。

  

  示例 1:

  输入: nums = [1,1,1,2,2,3], k = 2
  输出: [1,2]
  示例 2:

  输入: nums = [1], k = 1
  输出: [1]
  

  提示：

  1 <= nums.length <= 105
  k 的取值范围是 [1, 数组中不相同的元素的个数]
  题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的
  

  进阶：所设计算法的时间复杂度 必须 优于 O(n log n) ，其中 n 是数组大小。
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const numsLen = nums.length
  const numsMap = {}
  for (let i = 0; i < numsLen; i++) {
    const numI = nums[i]
    numsMap[numI] = numsMap[numI] ? numsMap[numI] + 1 : 1
  }
  const numFreqs = Object.values(numsMap)
  const numFreqsLen = numFreqs.length
  const heap = []
  for (let i = 0; i < numFreqsLen; i++) {
    const freqI = numFreqs[i]
    if (heap.length < k) {
      heapInsert(freqI)
    } else {
      if (freqI > heap[0]) {
        heapPop()
        heapInsert(freqI)
      }
    }
  }
  const res = []
  const allNums = Object.keys(numsMap)
  for (let i = 0; i < allNums.length; i++) {
    const allNumI = +allNums[i]
    if (numsMap[allNumI] >= heap[0]) {
      res.push(allNumI)
    }
  }
  return res
  function swap(i, j) {
    ;[heap[i], heap[j]] = [heap[j], heap[i]]
  }
  function heapInsert(key) {
    heap.push(key)
    const last = heap.length - 1
    up(last)
    return key
  }
  function heapPop() {
    const last = heap.length - 1
    swap(0, last)
    const val = heap.pop()
    down(0)
    return val
  }
  function up(i) {
    const parent = Math.floor((i - 1) / 2)
    if (parent >= 0 && heap[parent] > heap[i]) {
      swap(parent, i)
      up(parent)
    }
  }
  function down(i) {
    const left = 2 * i + 1
    const right = 2 * i + 2
    let min = i
    if (left < heap.length && heap[left] < heap[min]) {
      min = left
    }
    if (right < heap.length && heap[right] < heap[min]) {
      min = right
    }
    if (min !== i) {
      swap(min, i)
      down(min)
    }
  }
}

// [1,2]
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2))

// [1]
console.log(topKFrequent([1], 1))

console.log(topKFrequent([4, 1, -1, 2, -1, 2, 3], 2))
