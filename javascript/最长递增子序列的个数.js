/** 
  给定一个未排序的整数数组，找到最长递增子序列的个数。
  输入: [1,3,5,4,7]
  输出: 2
  解释: 有两个最长递增子序列，分别是 [1, 3, 4, 7] 和[1, 3, 5, 7]。
  
  输入: [2,2,2,2,2]
  输出: 5
  解释: 最长递增子序列的长度是1，并且存在5个子序列的长度为1，因此输出5。
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function(nums) {
  var countList = [] // 子数个数数量哈希表
  var F = [] // 动态规划起点，第一个递增子序列的长度
  for (var i = 0; i < nums.length; i++) {
    F[i] = 1
    countList[i] = 1
    for (var j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        if (F[j] + 1 > F[i]) {
          F[i] = F[j] + 1
          countList[i] = countList[j]
        } else if (F[j] + 1 === F[i]) {
          countList[i] += countList[j]
        }
      }
    }
  }
  maxLTSlen = Math.max.apply(null, F)
  var ans = 0
  for (var k = 0; k < countList.length; k++) {
    if (F[k] === maxLTSlen) {
      ans += countList[k]
    }
  }
  return ans
}

console.log(findNumberOfLIS([2,2,2,2,2]))