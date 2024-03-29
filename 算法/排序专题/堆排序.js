/**
  题解：
  - https://github.com/sisterAn/JavaScript-Algorithms/issues/60
  - https://segmentfault.com/a/1190000015487916

  leetcode 地址：
  - https://leetcode.cn/problems/kth-largest-element-in-an-array/solution/xie-gei-qian-duan-tong-xue-de-ti-jie-yi-kt5p2/
 */

// PS: 个人理解，构建大顶堆只是第一步，后面的经过一步步排除和下沉构建大顶堆的步骤之后
// 数组最终其实是展现成一个小顶堆的状态的
/**
 堆的基本知识：
  - 最后一个叶子节点：Math.floor(len / 2 - 1)
  - 子节点的父节点：Math.floor((i - 1) / 2)
  - 叶子节点的左节点：2*i + 1
  - 叶子节点的右节点：2*i + 2
 */

/**
 * @param {Array<number>} nums 
 */
function heapSort(nums) {
  const numsLen = nums.length
  let heapSize = numsLen
  // 构建大顶堆
  buildMaxHeap()

  for (let i = heapSize - 1; i >= 1; i--) {
    // 第一步构建出了一个大顶堆，因此第一个元素一定是最大的元素
    // 将其放到数组的最后一位
    swap(0, i)
    // 元素被放到最后一位后不再参与接下来的大顶堆构建
    heapSize--
    // 再次下沉构建大顶堆，直到最后只剩下一个元素为止
    down(0)
  }
  return nums
  function buildMaxHeap() {
    // 拿到最后一个叶子根节点的位置
    const lastLeafNode = Math.floor(heapSize / 2 - 1)
    // 自下而上
    for (let i = lastLeafNode; i >= 0; i--) {
      // 对每一个叶子节点进行自上而下的节点调整
      down(i)
    }
  }
  function down(i) {
    let left = i * 2 + 1
    let right = i * 2 + 2
    // 拿到 根节点与左右子节点 之中的最大值
    let largestIdx = i
    if (left < heapSize && nums[left] > nums[largestIdx]) {
      largestIdx = left
    }
    if (right < heapSize && nums[right] > nums[largestIdx]) {
      largestIdx = right
    }

    if (largestIdx !== i) {
      // 节点调整
      swap(largestIdx, i)
      // 调整后需要连带继续下沉子节点继续调整
      down(largestIdx, heapSize)
    }
  }
  function swap(i, j) {
    ;[nums[i], nums[j]] = [nums[j], nums[i]]
  }
}

// 小顶堆排序
/**
 * @param {Array<number>} nums 
 */
function minHeapSort(nums) {
  const numsLen = nums.length
  const heap = []
  for (let i = 0; i < numsLen; i++) {
    const numI = nums[i]
    heapInsert(numI)
  }
  for (let i = 0; i < numsLen; i++) {
    nums[i] = heapPop()
  }
  return nums
  function swap(i, j) {
    ;[heap[i], heap[j]] = [heap[j], heap[i]]
  }
  function heapInsert(key) {
    heap.push(key)
    const last = heap.length - 1
    up(last)
  }
  function heapPop() {
    const last = heap.length - 1
    swap(last, 0)
    const key = heap.pop()
    down(0)
    return key
  }
  function up(i) {
    const parent = Math.floor((i - 1) / 2)
    if (parent >= 0 && heap[i] < heap[parent]) {
      swap(parent, i)
      up(parent)
    }
  }
  function down(i) {
    const heapLen = heap.length
    const left = 2 * i + 1
    const right = 2 * i + 2
    let min = i
    if (left < heapLen && heap[left] < heap[min]) {
      min = left
    }
    if (right < heapLen && heap[right] < heap[min]) {
      min = right
    }

    if (min !== i) {
      swap(min, i)
      down(min)
    }
  }
}

console.log(heapSort([5, 2, 6, 1, 3, 0]))
console.log(minHeapSort([5, 2, 6, 1, 3, 0]))