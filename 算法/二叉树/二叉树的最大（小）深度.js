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
  let max = 1
  let curr = 0
  function dfs(node) {
    curr += 1
    if (curr > max) {
      max = curr
    }
    if (node.left) {
      dfs(node.left)
      curr -= 1
    }
    if (node.right) {
      dfs(node.right)
      curr -= 1
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
    const stack = [{ node, depth: 1 }]
    while (stack.length !== 0) {
      const tmp = stack.shift()
      const curNode = tmp.node
      const curDepth = tmp.depth
      if (curDepth > min) {
        min = curDepth
      }
      if (!curNode.left && !curNode.right) {
        return
      }
      if (curNode.left) {
        stack.push({ node: curNode.left, depth: curDepth + 1 })
      }
      if (curNode.right) {
        stack.push({ node: curNode.right, depth: curDepth + 1 })
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
