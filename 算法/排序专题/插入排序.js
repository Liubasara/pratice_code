/**
 * 插入排序：以第一个元素为开始，假定头部的元素已经是有序，将后续的元素一个个插入到前面有序的数组中
 * 通过正确地定位当前元素在有序序列里的位置、不断扩大有序数组的范围，最终达到完全排序的目的。
 * 最好的情况下，数组已经是有序，那么仅需遍历一次（每个元素身前都是比自己小的元素，那样就不用动地方了），时间复杂度为O(n)
 * 平均情况和最坏情况下，复杂度为 O(n^2)
 * @param {Array<number>} arr 
 */
function insertSort(arr) {
  const len = arr.length
  for (let i = 1; i < len; i++) {
    // temp 为当前需要插入的元素
    let temp = arr[i]
    let j = i
    // 从位置 i 开始往前倒腾，遇到比当前元素大的数字就请它挪到前面来，直到前一位比当前元素小为止
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1]
      j--
    }
    // 挪完之后的位置就是元素该在的位置，插入元素
    arr[j] = temp
  }
  return arr
}

console.log(insertSort([5, 2, 6, 1, 3, 0]))
