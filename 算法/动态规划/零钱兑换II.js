/**
  518. 零钱兑换 II
  给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。

  请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。

  假设每一种面额的硬币有无限个。 

  题目数据保证结果符合 32 位带符号整数。

  

  示例 1：

  输入：amount = 5, coins = [1, 2, 5]
  输出：4
  解释：有四种方式可以凑成总金额：
  5=5
  5=2+2+1
  5=2+1+1+1
  5=1+1+1+1+1
  示例 2：

  输入：amount = 3, coins = [2]
  输出：0
  解释：只用面额 2 的硬币不能凑成总金额 3 。
  示例 3：

  输入：amount = 10, coins = [10] 
  输出：1
 */

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  const dp = new Array(amount + 1).fill(0)
  // 动态规划的边界是 dp[0]=1。只有当不选取任何硬币时，金额之和才为 0，因此只有 1 种硬币组合。
  dp[0] = 1
  for (let i = 0; i < coins.length; i++) {
    const coinI = coins[i]
    for (let j = coinI; j < amount + 1; j++) {
      if (j - coinI >= 0) {
        dp[j] += dp[j - coinI]
      }
    }
  }
  return dp[amount]
};

// 0
console.log(change(3, [2]))
// 4
console.log(change(5, [1, 2, 5]))
// 1
console.log(change(10, [10]))
// 1
console.log(change(0, [1]))