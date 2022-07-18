/**
 * 384. 打乱数组
 * 
 * 给你一个整数数组 nums ，设计算法来打乱一个没有重复元素的数组。打乱后，数组的所有排列应该是 等可能 的。

  实现 Solution class:

  Solution(int[] nums) 使用整数数组 nums 初始化对象
  int[] reset() 重设数组到它的初始状态并返回
  int[] shuffle() 返回数组随机打乱后的结果
   

  示例 1：

  输入
  ["Solution", "shuffle", "reset", "shuffle"]
  [[[1, 2, 3]], [], [], []]
  输出
  [null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]

  解释
  Solution solution = new Solution([1, 2, 3]);
  solution.shuffle();    // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。例如，返回 [3, 1, 2]
  solution.reset();      // 重设数组到它的初始状态 [1, 2, 3] 。返回 [1, 2, 3]
  solution.shuffle();    // 随机返回数组 [1, 2, 3] 打乱后的结果。例如，返回 [1, 3, 2]

  题解：
  - https://fe.ecool.fun/topic/4fabe17b-9140-475e-acce-4f49e60c6840?orderBy=updateTime&order=desc&titleKey=%E6%B4%97%E7%89%8C%E7%AE%97%E6%B3%95

 */

/**
* @param {number[]} nums
*/
var Solution = function (nums) {
  this.origin = [...nums]
  this.nums = nums
};

/**
 * @return {number[]}
 */
Solution.prototype.reset = function () {
  return [...this.origin]
};

/**
 * @return {number[]}
 */
Solution.prototype.shuffle = function () {
  const that = this
  function swap(i, j) {
    const nums = that.nums
    ;[nums[i], nums[j]] = [nums[j], nums[i]]
  }
  for (let i = 0; i < this.nums.length; i++) {
    // 生成任意范围的随机数：https://www.cnblogs.com/lsgxeva/p/7884252.html
    const j = i + Math.floor(Math.random() * (this.nums.length - i))
    swap(i, j)
  }
  return this.nums
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */

const nums = [1, 2, 3]
var obj = new Solution(nums)
var param_1 = obj.reset()
var param_2 = obj.shuffle()