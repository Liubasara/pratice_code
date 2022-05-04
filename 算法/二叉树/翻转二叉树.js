/**
  226. 翻转二叉树
  给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。

  

  示例 1：



  输入：root = [4,2,7,1,3,6,9]
  输出：[4,7,2,9,6,3,1]
  示例 2：



  输入：root = [2,1,3]
  输出：[2,3,1]
  示例 3：

  输入：root = []
  输出：[]
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

let rootNode = new BinarytreeNode(2)

let leftNode = rootNode.createAndSetLeft(1)

let rightNode = rootNode.createAndSetRight(3)

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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (!root) {
    return null
  }
  const left = invertTree(root.left)
  const right = invertTree(root.right)
  root.left = right
  root.right = left
  return root
};

function preorder (root, res = []) {
  if (!root) return res
  res.push(root.val)
  preorder(root.left, res)
  preorder(root.right, res)
  return res
}

console.log(preorder(invertTree(rootNode))) // [2, 3, 1]