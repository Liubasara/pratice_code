/**
 给定一个二叉树，找出其最大深度。

  二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

  说明: 叶子节点是指没有子节点的节点。

  示例：
  给定二叉树 [3,9,20,null,null,15,7]，

      3
    / \
    9  20
      /  \
    15   7
  返回它的最大深度 3 。
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
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0
  let max = 0
  let curr = 1
  function dfs(node) {
    if (!node.left && !node.right) {
      max = Math.max(curr, max)
      return
    }
    if (node.left) {
      curr++
      dfs(node.left)
      curr--
    }
    if (node.right) {
      curr++
      dfs(node.right)
      curr--
    }
  }
  dfs(root)
  return max
};

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

!(() => {
  const rootNode = new TreeNode(3)
  let left = rootNode.left = new TreeNode(9)
  let right = rootNode.right = new TreeNode(20)

  left = right.left = new TreeNode(15)
  right = right.right = new TreeNode(7)
  console.log('maxDepth', maxDepth(rootNode)) // 3
})()


//  3
// / \
//9  20
//  /  \
// 15   7


/**
给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明：叶子节点是指没有子节点的节点。

输入：root = [3,9,20,null,null,15,7]
输出：2

示例 2：

输入：root = [2,null,3,null,4,null,5,null,6]
输出：5
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (!root) return 0
  let min = 0
  function bfs(node) {
    const queue = [{ node, depth: 1 }]
    while (queue.length !== 0) {
      const tmp = queue.shift()
      const { node: theNode, depth: theDepth } = tmp
      if (theDepth > min) {
        min = theDepth
      }
      if (!theNode.left && !theNode.right) {
        return min
      }
      if (theNode.left) {
        queue.push({ node: theNode.left, depth: theDepth + 1 })
      }
      if (theNode.right) {
        queue.push({ node: theNode.right, depth: theDepth + 1 })
      }
    }
  }
  bfs(root)
  return min
};

!(() => {
  const rootNode = new TreeNode(1)
  let left = rootNode.left = new TreeNode(2)
  let right = rootNode.right = new TreeNode(3)

  left = left.left = new TreeNode(4)
  right = left.right = new TreeNode(5)
  console.log('minDepth', minDepth(rootNode)) // 2
})()

//  3
// / \
//9  20
//  /  \
// 15   7
