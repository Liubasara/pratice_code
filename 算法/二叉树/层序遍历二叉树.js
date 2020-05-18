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

let rootNode = new BinarytreeNode('A')
rootNode.createAndSetLeft('B').createAndSetLeft('D')
rootNode.createAndSetRight('C').createAndSetRight('F')
rootNode.left.createAndSetRight('E')

/** 非递归队列实现层级遍历 */
function bfsScanBinaryTree (root) {
  const queue = []
  queue.push(root)

  while (queue.length > 0) {
    const top = queue[0]
    console.log(top.val)
    if (top.left) {
      queue.push(top.left)
    }
    if (top.right) {
      queue.push(top.right)
    }
    queue.shift()
  }
}

bfsScanBinaryTree(rootNode)

/** 递归实现层级遍历 */
function dfsScanBinaryTree (root, level) {
  // 空树或未层级不合理
  if (!root || level < 1) return
  // level 减为 1，此时打印当前层级
  if (level === 1) {
    console.log(root.val)
    return
  }
  // 否则则证明未到应输出的层级，继续向下遍历
  dfsScanBinaryTree(root.left, level - 1)
  dfsScanBinaryTree(root.right, level - 1)
}
for (let i = 1; i <= 3; i++) {
  dfsScanBinaryTree(rootNode, i)
}
