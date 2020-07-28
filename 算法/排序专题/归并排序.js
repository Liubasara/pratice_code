/** 归并排序是对分治思想的典型应用
 * 首先重复地分割数组,接下来开始尝试解决每个子问题。将规模为1的子数组两两合并为规模为2的子数组，合并时确保有序,最终得到完全的有序数组
 * 时间复杂度为 O(nlog(n))
 * @param {Array<number>} arr 
 */
function mergeSort(arr) {
  const len = arr.length
  if (len <= 1) return arr
  const slice = len / 2
  const leftArr = mergeSort(arr.slice(0, slice))
  const rightArr = mergeSort(arr.slice(slice, len))
  arr = mergeArr(leftArr, rightArr)
  return arr
}

/**
 * 除此之外，这里还涉及到另一个小小的知识点——两个有序数组的合并, 涉及到双指针法
 * @param {Array<number>} arr1
 * @param {Array<number>} arr2
 * @returns {Array<number>}
 */
function mergeArr(arr1, arr2) {
  let p1 = 0, p2 = 0, res = []
  while (p1 < arr1.length && p2 < arr2.length) {
    if (arr1[p1] < arr2[p2]) {
      res.push(arr1[p1])
      p1++
    } else {
      res.push(arr2[p2])
      p2++
    }
  }

  if (p1 < arr1.length) {
    return res.concat(arr1.slice(p1))
  } else if (p2 < arr2.length) {
    return res.concat(arr2.slice(p2))
  }
}

console.log(mergeSort([1, 5, 8, 7, 2]))
