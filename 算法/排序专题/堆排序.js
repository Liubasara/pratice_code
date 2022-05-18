/**
  题解：
  - https://github.com/sisterAn/JavaScript-Algorithms/issues/60
  - https://segmentfault.com/a/1190000015487916

  leetcode 地址：
  - https://leetcode.cn/problems/kth-largest-element-in-an-array/solution/xie-gei-qian-duan-tong-xue-de-ti-jie-yi-kt5p2/
 */

/**
 * @param {Array<number>} nums 
 */
function heapSort(nums) {
  const numsLen = nums.length
  // 构建大顶堆
  function buildMaxHeap() {
    const lastLeafNode = Math.floor(numsLen / 2 - 1)
    for (let i = lastLeafNode; i >= 0; i--) {}
  }
}

console.log(heapSort([5, 2, 6, 1, 3, 0]))