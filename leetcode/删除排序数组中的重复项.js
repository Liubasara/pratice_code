/**给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (map.get(nums[i])) {
      nums.splice(i, 1)
      i--
    } else {
      map.set(nums[i], 1)
    }
  }
  return nums.length
}

console.log(removeDuplicates([1 ,1, 2]))
