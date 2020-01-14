/**
  已排序数组的二分查找 递归实现
**/
function binarySearch (target, arr, start, end) {
  if (start > end) return -1
  var start = start || 0
  var end = end || arr.length - 1
  
  var mid = parseInt(start + (end - start) / 2)
  if (arr[mid] === target) {
    return mid
  } else if (arr[mid] > target) {
    return binarySearch(target, arr, start, mid - 1)
  } else {
    return binarySearch(target, arr, mid + 1, end)
  }
  return -1
}

console.log(binarySearch(3, [1,2,3,4,5]))

/**
  已排序数组的二分查找 非递归实现
**/
function binarySearch2 (target, arr) {
  var start = 0
  var end = arr.length - 1
  
  while (start <= end) {
    var mid = parseInt(start + (end - start) / 2)
    if (arr[mid] === target) {
      return mid
    } else if (arr[mid] > target) {
      end = mid - 1
    } else {
      start = mid + 1
    }
  }
  return -1
}

console.log(binarySearch2(3, [1,2,3,4,5]))