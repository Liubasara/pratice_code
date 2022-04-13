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
var findNumberOfLIS = function (nums) {
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

// console.log(findNumberOfLIS([2,2,2,2,2]))

/**
 * Vue3 diff 算法核心 O(NlogN) 复杂度，通过 贪心加二分查找 方法寻找最长递增子序列的索引合集
 * 参考资料:
 * - https://www.iteye.com/blog/qiemengdao-1660229
 * - https://juejin.cn/post/6877814455968350215
 * - https://juejin.cn/post/6988489193215229982
 * - https://juejin.cn/post/6937243374453784613
 */
function findLIS(
  /** @type {Array<number>} */
  nums
) {
  // 前驱节点索引数组, 最终总长度应该与 nums 相等
  const p = []
  // 最长递增子序列
  const res = []
  // 递增子序列对应的索引
  const idxRes = []
  const numsLen = nums.length
  // init
  res[0] = nums[0]
  idxRes[0] = 0
  p[0] = undefined

  for (let i = 1; i < numsLen; i++) {
    const numI = nums[i]
    const resLen = res.length
    if (numI > res[resLen - 1]) {
      res.push(numI)
      p[i] = idxRes[idxRes.length - 1] // 记录前驱节点后再 push
      idxRes.push(i)
      continue
    } else if (numI === res[resLen - 1]) {
      p[i] = undefined
      continue
    } else if (numI < res[resLen - 1]) {
      // 二分查找 start
      let startIdx = 0
      let endIdx = resLen - 1
      let pointIdx = -1
      while (startIdx <= endIdx) {
        // startIdx + Math.floor((endIdx - startIdx) / 2)
        pointIdx = Math.floor((endIdx + startIdx) / 2)
        if (res[pointIdx] >= numI) {
          if (res[pointIdx - 1] < numI || pointIdx - 1 < 0) {
            // 找到目标 pointIdx 跳出循环
            break
          }
          // 往左继续二分
          endIdx = pointIdx - 1
        } else {
          // 往右继续二分
          startIdx = pointIdx + 1
        }
      }
      // 二分查找 end

      // 顺序查找 start
      // let pointIdx = 0
      // while (pointIdx < resLen) {
      //   if (res[pointIdx] > numI) {
      //     break
      //   }
      //   pointIdx++
      // }
      // 顺序查找 end

      res[pointIdx] = numI
      idxRes[pointIdx] = i
      p[i] = idxRes[pointIdx - 1]
    }
  }

  const realRes = [res[res.length - 1]]
  const realIdxRes = [idxRes[idxRes.length - 1]]

  let maxIdx = idxRes[idxRes.length - 1]
  let preIdx = p[maxIdx]

  while (preIdx !== undefined) {
    realIdxRes.unshift(preIdx)
    realRes.unshift(nums[preIdx])
    preIdx = p[preIdx]
  }

  console.log('result ending', realRes, realIdxRes)
  return realRes
}

console.log(findLIS([1, 4, 5, 2, 3, 7, 0])) // [1,2,3,7]
// console.log(findLIS([4, 10, 4, 3, 8, 9])) // [3,8,9]
