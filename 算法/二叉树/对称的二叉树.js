/**
 * 剑指 Offer 28. 对称的二叉树
 * 请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。
 * 
 * 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
 * 
 *     1
 *    / \
 *   2   2
 *  / \ / \
 * 3  4 4  3
 * 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
 * 
 *     1
 *    / \
 *   2   2
 *    \   \
 *    3    3
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

let rootNode = new BinarytreeNode(8)
rootNode.createAndSetLeft(6).createAndSetLeft(5)
rootNode.left.createAndSetRight(7)
rootNode.createAndSetRight(6).createAndSetRight(5)
rootNode.right.createAndSetLeft(7)

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isSymmetric (root) {
  function dfs (root1, root2) {
    if (!root1 && !root2) return true
    if (!root1 || !root2) return false
    if (root1.val !== root2.val) return false
    return dfs(root1.left, root2.right) &&
           dfs(root1.right, root2.left)
  }
  return dfs(root, root)
}

console.log(isSymmetric(rootNode))
