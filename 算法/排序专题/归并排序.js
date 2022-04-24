function mergeSortOneFunc(nums) {
  const len = nums.length
  if (len <= 1) return nums
  const pivot = len / 2
  const leftArr = mergeSortOneFunc(nums.slice(0, pivot))
  const rightArr = mergeSortOneFunc(nums.slice(pivot, len))

  /** 合并 leftArr 和 rightArr */
  let p1 = 0
  let p2 = 0
  let res = []
  while (p1 < leftArr.length && p2 < rightArr.length) {
    if (leftArr[p1] < rightArr[p2]) {
      res.push(leftArr[p1])
      p1++
    } else {
      res.push(rightArr[p2])
      p2++
    }
  }

  if (p1 < leftArr.length) {
    res = res.concat(leftArr.slice(p1))
  } else {
    res = res.concat(rightArr.slice(p2))
  }
  return res
}

/** 归并排序是对分治思想的典型应用
 * 首先重复地分割数组,接下来开始尝试解决每个子问题。将规模为1的子数组两两合并为规模为2的子数组，合并时确保有序,最终得到完全的有序数组
 * 时间复杂度为 O(nlog(n))
 * @param {Array<number>} nums
 */
function mergeSort(nums) {
  /**
   * 除此之外，这里还涉及到另一个小小的知识点——两个有序数组的合并, 涉及到双指针法
   * @param {Array<number>} arr1
   * @param {Array<number>} arr2
   * @returns {Array<number>}
   */
  function mergeArr(arr1, arr2) {
    let p1 = 0
    let p2 = 0
    let res = []
    while (p1 < arr1.length && p2 < arr2.length) {
      if (arr1[p1] > arr2[p2]) {
        res.push(arr2[p2])
        p2++
      } else {
        res.push(arr1[p1])
        p1++
      }
    }
    if (p1 < arr1.length) {
      res = res.concat(arr1.slice(p1))
    } else if (p2 < arr2.length) {
      res = res.concat(arr2.slice(p2))
    }
    return res
  }
  function start(curNums) {
    const curNumsLen = curNums.length
    if (curNumsLen <= 1) {
      return curNums
    }
    const pointIdx = Math.floor(curNumsLen / 2)
    const leftArr = start(curNums.slice(0, pointIdx))
    const rightArr = start(curNums.slice(pointIdx, curNumsLen))
    return mergeArr(leftArr, rightArr)
  }
  return start(nums)
}

console.log(mergeSort([1, 5, 8, 7, 2]))
