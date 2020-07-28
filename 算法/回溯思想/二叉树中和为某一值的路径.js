/**
 定义 start
*/
function BinarytreeNode (val) {
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
/**
  定义 end
*/

let rootNode = new BinarytreeNode(1)
rootNode.createAndSetLeft(2).createAndSetLeft(3)
rootNode.createAndSetRight(3).createAndSetRight(2)
rootNode.left.createAndSetRight(6)

/** 二叉树中和为某一值的路径
 * 输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
function pathSum (root, sum) {
  const path = []
  const curr = []
  function dfs (node) {
    if (!node) return
    curr.push(node.val)
    if (curr.reduce((prev, cur) => prev + cur) === sum) {
      path.push([...curr])
    }
    dfs(node.left)
    dfs(node.right)
    curr.pop()
  }
  dfs(root)
  return path
}

console.log(pathSum(rootNode, 6))
