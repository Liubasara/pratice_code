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

/**============= 前序遍历 ====================*/
function preorder(root) {
  if (!root) return
  console.log(`当前前序遍历的节点值为${root.val}`)
  preorder(root.left)
  preorder(root.right)
}

preorder(rootNode)

/**============= 中序遍历 ====================*/
function inorder(root) {
  if (!root) return
  inorder(root.left)
  console.log(`当前中序遍历的节点值为${root.val}`)
  inorder(root.right)
}

inorder(rootNode)

/**============= 后序遍历 ====================*/
function postorder(root) {
  if (!root) return
  postorder(root.left)
  postorder(root.right)
  console.log(`当前后序遍历的节点值为${root.val}`)
  
}

postorder(rootNode)




