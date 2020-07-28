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
 * 
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

console.log(subsets([1, 2, 3]))
