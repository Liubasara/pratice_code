/**
 * 选择排序，感觉有点像逆向的冒泡排序，每一轮会将一个最小值放到剩余数组的头部
 * 循环遍历数组，每次都找出当前范围内的最小值，把它放在当前范围的头部；然后缩小排序范围，继续重复以上操作，直至数组完全有序为止。
 * 与冒泡排序不同的是，无论什么情况下，选择排序都是要走内层循环作比较，所以时间复杂度恒定为 O(n^2)
 * 
 * @param {Array<number>} arr 
 */
function selectSort (arr) {
  const len = arr.length
  // 定义 minIndex，缓存当前区间最小值的索引，注意是索引
  let minIndex
  // i 是当前排序区间的起点
  // 最后一个元素就没必要比较了
  for (let i = 0; i < len - 1; i++) {
    minIndex = i
    // i、j分别定义当前区间的上下界，i是左边界，j是右边界
    for (let j = i; j < len; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]]
    }
  }
  return arr
}

console.log(selectSort([5, 2, 6, 1, 3, 0]))
