/**
  剑指 Offer 51. 数组中的逆序对
  在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。

  

  示例 1:

  输入: [7,5,6,4]
  输出: 5
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function (nums) {
  if (!nums.length) return 0
  let res = 0
  function mergeArr(arr1, arr2) {
    const arr1Len = arr1.length
    const arr2Len = arr2.length
    let p1 = 0
    let p2 = 0
    const newArr = []
    while (p1 < arr1Len && p2 < arr2Len) {
      if (arr1[p1] > arr2[p2]) {
        // 因为是升序数组, 如果当前 arr1[p1] 的数字可以与 arr2[p2] 组成逆序数组，则说明 arr1[p1] 后续的数字都可以，一共有 arr1Len - p1 个
        res += arr1Len - p1
        newArr.push(arr2[p2])
        p2++
      } else {
        newArr.push(arr1[p1])
        p1++
      }
    }
    if (p1 < arr1Len) {
      return newArr.concat(arr1.slice(p1))
    } else if (p2 < arr2Len) {
      return newArr.concat(arr2.slice(p2))
    }
  }
  function start(arr) {
    const arrLen = arr.length
    if (arrLen <= 1) return arr
    const pointIdx = Math.floor(arrLen / 2)
    const leftArr = start(arr.slice(0, pointIdx))
    const rightArr = start(arr.slice(pointIdx))
    return mergeArr(leftArr, rightArr)
  }
  start(nums)
  return res
};

// 5
console.log(reversePairs([7, 5, 6, 4]))
// 0
console.log(reversePairs([]))
