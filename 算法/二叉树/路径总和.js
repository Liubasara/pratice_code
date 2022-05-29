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
  112. 路径总和
  给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false 。

  叶子节点 是指没有子节点的节点。

  

  示例 1：


  输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
  输出：true
  解释：等于目标和的根节点到叶节点路径如上图所示。
  示例 2：


  输入：root = [1,2,3], targetSum = 5
  输出：false
  解释：树中存在两条根节点到叶子节点的路径：
  (1 --> 2): 和为 3
  (1 --> 3): 和为 4
  不存在 sum = 5 的根节点到叶子节点的路径。
  示例 3：

  输入：root = [], targetSum = 0
  输出：false
  解释：由于树是空的，所以不存在根节点到叶子节点的路径。
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
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (!root) return false
  const res = []
  let curr = [root.val]
  function dfs(node, sum) {
    if (sum === targetSum && !node.left && !node.right) {
      res.push([...curr])
      hasFind = true
      return
    }
    curr.push(node.val)
    if (node.left) {
      dfs(node.left, sum + node.left.val)
      curr.pop()
    }
    if (node.right) {
      dfs(node.right, sum + node.right.val)
      curr.pop()
    }
  }
  dfs(root, root.val)
  return !!res.length
};

; (() => {
  console.log(hasPathSum(BinarytreeNode.creatByArray([1, 2, 3]), 5)) // false
  console.log(hasPathSum(BinarytreeNode.creatByArray([]), 0)) // false
  console.log(hasPathSum(BinarytreeNode.creatByArray([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]), 22)) // true
  console.log(hasPathSum(BinarytreeNode.creatByArray([1, 2]), 1)) // false
  console.log(hasPathSum(BinarytreeNode.creatByArray([-2, null, -3]), -5)) // true
})()

