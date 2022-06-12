/**
  322. 零钱兑换
  给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。

  计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。

  你可以认为每种硬币的数量是无限的。

  

  示例 1：

  输入：coins = [1, 2, 5], amount = 11
  输出：3 
  解释：11 = 5 + 5 + 1
  示例 2：

  输入：coins = [2], amount = 3
  输出：-1
  示例 3：

  输入：coins = [1], amount = 0
  输出：0
 */

/**
  假设凑齐11这个金额所需的最后一枚硬币是1，2，5其中的一个（也可以理解为兑换11所需要的硬币其中可能包含1，2，5中的一个），我们就分别看看包含哪个硬币的情况下，剩余金额使用的硬币数量最少，那么就会出现以下三种情况：

  如果最后（包含）一枚是1，那么11-1=10 ，我们就需要知道兑换10所需的最少硬币数量dp[10]。
  如果最后（包含）一枚是2，11-2=9，我们就需要知道兑换9所需的最少硬币数量dp[9]。
  如果最后（包含）一枚是5，11-5=6，我们就需要知道兑换6所需的最少硬币数量dp[6]。
  然后我们取出dp[10]，dp[9]，dp[6]三个值中的最小值，加上我们刚才拿出的那一枚硬币，就得出了兑换11的答案，这就是状态转移的过程。
 */

/** 背包问题题解：https://blog.csdn.net/LL19880915/article/details/120292953
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const coinsLen = coins.length
  const dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (let i = 1; i < amount + 1; i++) {
    for (let j = 0; j < coinsLen; j++) {
      const coinJ = coins[j]
      if (i >= coinJ) {
        dp[i] = Math.min(dp[i], dp[i - coinJ] + 1)
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]
};

// 3
console.log(coinChange([1, 2, 5], 11))
// -1
console.log(coinChange([2], 3))
// 0
console.log(coinChange([1], 0))
// -1
console.log(coinChange([2], 1))
// 20
console.log(coinChange([186, 419, 83, 408], 6249))