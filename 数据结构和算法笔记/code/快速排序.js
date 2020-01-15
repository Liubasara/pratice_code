/**
快排解释
https://www.phpyuan.com/269759.html
**/

/**
  快速排序 递归实现
**/
function quickSort (arr, start, end) {
  var start, end , pivot, tmp, i, j
  start = i = start || 0
  end = j = end || arr.length -1
  pivot = arr[parseInt(start + (end - start) / 2)]
  while (i <= j) {
    while (arr[i] < pivot) {
      i++
    }
    while (arr[j] > pivot) {
      j--
    }
    if (i <= j) {
      tmp = arr[i]
      arr[i] = arr[j]
      arr[j] = tmp
      i++
      j--
    }
  }
  if (start < j) {
    quickSort(arr, start, j)
  }
  if (end > i) {
    quickSort(arr, i, end)
  }
  return arr
}
var arr = [10, 99, 1, 85, 65]
console.log(quickSort(arr))


/**
  快速排序 非递归实现
**/
function quickSort1 (arr, start, end) {
  var start, end , pivot, tmp, i, j, stack = []
  start = start || 0
  end = end || arr.length -1
  stack.push(start)
  stack.push(end)
  while (stack.length > 0) {
    end = j = stack.pop()
    start = i = stack.pop()
    
    pivot = arr[parseInt(start + (end - start) / 2)]
    
    while (i <= j) {
      while (arr[i] < pivot) {
        i++
      }
      while (arr[j] > pivot) {
        j--
      }
      if (i <= j) {
        tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
        i++
        j--
      }
    }
    if (start < j) {
      stack.push(start)
      stack.push(j)
    }
    if (end > i) {
      stack.push(i)
      stack.push(end)
    }
  }
  return arr
}
var arr = [10, 99, 1, 85, 65]
console.log(quickSort1(arr))