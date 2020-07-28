/**
 * 冒泡排序的过程，就是重复比较相邻的两个项，若第一项比第二项更大，则交换两者位置
 * 每一轮操作，都会将这一轮中最大的元素放置到数组的末尾
 * 因此其时间复杂度为 O(n^2)
 * 但我们可以通过加入标志位/减少比较已排序部分的方式来优化，使其在数组最优的情况下达到时间复杂度为 O(n)
 * @param {Array<number>} arr 
 */
function bubble (arr) {
  const len = arr.length
  let count = 0
  let flag = false
  for (let i = 0; i < len; i++) {
    // 已排序部分数组不比较，因此 j < len -i
    for (let j = 1; j < len - i; j++) {
      count++
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
        flag = true
      }
    }
    // 若一次交换都没发生，则说明数组有序，直接返回
    if (!flag) {
      console.log(count)
      return arr
    }
  }
  console.log(count)
  return arr
}

console.log(bubble([81, 2, 53, 4, 5]))
