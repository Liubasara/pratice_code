function quickSortOneFunc(arr) {
  const arrLen = arr.length
  function start(left = 0, right = arrLen - 1) {
    const pointIdx = Math.floor((left + right) / 2)
    const pointValue = arr[pointIdx]
    let p1 = left
    let p2 = right
    while (p1 <= p2) {
      while (arr[p1] < pointValue && p1 <= p2) {
        p1++
      }
      while (arr[p2] > pointValue && p1 <= p2) {
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

/**
 * 快速排序在基本思想上和归并排序是一致的，仍然坚持“分而治之”的原则不动摇。
 * 区别在于，快速排序并不会把真的数组分割开来再合并到一个新数组中去，而是直接在原有的数组内部进行排序。
 * 快速排序会将原始的数组筛选成较小和较大的两个子数组，然后递归地排序两个子数组。
 * 时间复杂度为 O(nlog(n))
 * @param {Array<number>} arr
 * @param {number} left
 * @param {number} right
 * @returns {Array<number>}
 */
function quickSort(arr, left = 0, right = arr.length - 1) {
  const len = arr.length
  if (len > 1) {
    const nextPivot = partition(arr, left, right)
    if (left < nextPivot - 1) {
      quickSort(arr, left, nextPivot - 1)
    }
    if (nextPivot < right) {
      quickSort(arr, nextPivot, right)
    }
  }
  return arr
}

/**
 * 寻找基准值并保证其两侧有序的过程
 * @param {number} left
 * @param {number} right
 * @returns {number}
 */
function partition(arr, left, right) {
  let p1 = left,
    p2 = right
  // 选取数组中间的值作为基准值可以让最终 p1 指针落在其下一个元素上，从而刚好达到左右两边分组的效果
  const pivotValue = arr[Math.floor((right - left) / 2) + left]
  while (p1 <= p2) {
    // 左指针所指元素若不大于基准值，则右移左指针
    while (arr[p1] < pivotValue) {
      p1++
    }
    // 右指针所指元素若不小于基准值，则左移右指针
    while (arr[p2] > pivotValue) {
      p2--
    }
    if (p1 <= p2) {
      // 交换两个元素确保左右两侧有序
      ;[arr[p1], arr[p2]] = [arr[p2], arr[p1]]
      p1++
      p2--
    }
  }
  return p1
}

console.log(quickSortOneFunc([0, 27, 99, 6, 38, 1, 9]))
