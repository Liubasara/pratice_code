/**
  题目：给定一个整数数组 nums 和一个目标值 target，在数组中找出和为目标值的两个证书，并返回它们的数组下标。
        可以假设每种输入只会有一个对应答案，但是不能重复利用这个数组中同样的元素
*/

/**
  关键点：转换为求差问题，使用一个 Map 型的结构来记录对应数字与其对应索引值。
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const numsMap = nums.reduce((pre, cur, idx) => {
    pre[cur] = idx
    return pre
  }, {})
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    const targetNum = target - num
    if (numsMap[targetNum] !== undefined && i !== numsMap[targetNum]) {
      return [i, numsMap[targetNum]]
    }
  }
}

console.log(twoSum([2, 7, 11, 15], 9))
