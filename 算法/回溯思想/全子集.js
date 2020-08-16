/**
 * 题目描述：给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
 * 说明：解集不能包含重复的子集。
 * 
 * 示例: 输入: nums = [1,2,3]
 * 输出:
 * [
 *  [3],
 *  [1],
 *  [2],
 *  [1,2,3],
 *  [1,3],
 *  [2,3],
 *  [1,2],
 *  []
 * ]
 */

/**
 * 讨巧回溯法，基于坑位
 * @param {Array<number>} nums 
 */
function subsets (nums) {
  const path = []
  const len = nums.length
  const cur = []
  function dfs (nth) {
    path.push([...cur])
    for (let i = nth; i < len; i++) {
      cur.push(nums[i])
      dfs(i + 1)
      cur.pop()
    }
  }
  dfs(0)
  return path
}

/**
 * 正儿八经回溯法
 * @param {number[]} nums 
 */
function subsets2 (nums) {
  const path = []
  const cur = []
  const len = nums.length
  function dfs (nth) {
    // 回溯法判断返回条件应该为二叉树层数等于最后一层
    if (nth === len) {
      path.push([...cur])
      return
    }
    let optionArr = [nums[nth], null] // 对于每一个数字而言，都有取和不取的选项
    for (let i = 0; i < 2; i++) {
      const value = optionArr[i]
      if (value) {
        cur.push(value)
      }
      dfs(nth + 1)
      if (value) {
        cur.pop()
      }
    }
  }
  dfs(0) // 从第零层开始
  return path
}

console.log(subsets([1, 2, 3]))
