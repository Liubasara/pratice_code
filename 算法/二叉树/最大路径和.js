/**
 定义 start
*/
function BinarytreeNode(val) {
  this.val = val
  this.left = null
  this.right = null
}

BinarytreeNode.prototype.setLeft = function (node) {
  this.left = node
  return node
}

BinarytreeNode.prototype.setRight = function (node) {
  this.right = node
  return node
}

BinarytreeNode.prototype.createAndSetLeft = function (val) {
  let left = new BinarytreeNode(val)
  this.left = left
  return left
}

BinarytreeNode.prototype.createAndSetRight = function (val) {
  let right = new BinarytreeNode(val)
  this.right = right
  return right
}

BinarytreeNode.creatByArray = function (arr) {
  if (!arr.length || !arr[0]) return null
  const root = new BinarytreeNode(arr[0])
  const nodeLists = [root]
  for (let i = 1; i < arr.length; i++) {
    const arrI = arr[i]
    const theNode = arrI === null ? null : new BinarytreeNode(arrI)
    nodeLists.push(theNode)
    const parent = Math.floor((i - 1) / 2)
    const parentNode = nodeLists[parent]
    const isLeft = i === (2 * parent + 1)
    const isRight = i === (2 * parent + 2)
    if (isLeft && parentNode) {
      parentNode.left = theNode
    } else if (isRight && parentNode) {
      parentNode.right = theNode
    }
  }
  return root
}

/**
  定义 end
*/

/**
  124. 二叉树中的最大路径和
  路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。

  路径和 是路径中各节点值的总和。

  给你一个二叉树的根节点 root ，返回其 最大路径和 。

  

  示例 1：


  输入：root = [1,2,3]
  输出：6
  解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6
  示例 2：


  输入：root = [-10,9,20,null,null,15,7]
  输出：42
  解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 题解：https://leetcode.cn/problems/binary-tree-maximum-path-sum/solution/javadi-gui-zi-ding-xiang-xia-bang-zhu-ji-8bmv/
 * 动态规划 + dfs
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  let maxSum = -Infinity
  function dfs(node) {
    if (!node) return 0
    const left = dfs(node.left)
    const right = dfs(node.right)
    // 左/右节点，加上根节点所能返回的最大路径值
    const maxHalfSum = Math.max(node.val, node.val + left, node.val + right)
    // 把左右节点都加上所能提供的最大的路径值
    const theMaxSum = Math.max(maxHalfSum, node.val + left + right)
    maxSum = Math.max(maxSum, theMaxSum)
    return maxHalfSum
  }
  dfs(root)
  return maxSum
};

// 6
console.log(maxPathSum(BinarytreeNode.creatByArray([1, 2, 3])))
// 42
console.log(maxPathSum(BinarytreeNode.creatByArray([-10, 9, 20, null, null, 15, 7])))