/**
 * 剑指 Offer 27. 二叉树的镜像
 * 请完成一个函数，输入一个二叉树，该函数输出它的镜像。
 * 例如输入：
 * 
 *      4
 *    /   \
 *   2     7
 *  / \   / \
 * 1   3 6   9
 * 镜像输出：
 *      4
 *    /   \
 *   7     2
 *  / \   / \
 * 9   6 3   1
 * 示例 1：
 * 
 * 输入：root = [4,2,7,1,3,6,9]
 * 输出：[4,7,2,9,6,3,1]
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
rootNode.createAndSetRight(10).createAndSetRight(11)
rootNode.right.createAndSetLeft(9)

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function mirrorTree (root) {
  function dfs (root) {
    if (!root) return
    if (root.left || root.right) {
      ;[root.left, root.right] = [root.right, root.left]
    }
    if (root.left) {
      mirrorTree(root.left)
    }
    if (root.right) {
      mirrorTree(root.right)
    } 
  }
  dfs(root)
  return root
}

function bfsScanTree (node) {
  // 层序遍历二叉树
  const queue = []
  queue.push(node)
  while (queue.length > 0) {
    let tmp = queue.shift()
    console.log(tmp.val)
    if (tmp.left) {
      queue.push(tmp.left)
    }
    if (tmp.right) {
      queue.push(tmp.right)
    }
  }
}

bfsScanTree(rootNode)
console.log('------after--------')
bfsScanTree(mirrorTree(rootNode))
