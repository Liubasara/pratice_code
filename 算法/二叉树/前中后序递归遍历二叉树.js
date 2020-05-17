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

// 非递归遍历版
function preorderTraversal (root) {
  let tmp = root
  let stack = []
  while (stack.length !== 0 || tmp !== null) {
    if (tmp !== null) {
      stack.push(tmp)
      console.log(`当前非递归遍历前序遍历的节点值为${tmp.val}`)
      tmp = tmp.left
    } else {
      let node = stack.pop()
      tmp = node.right
    }
  }
}

preorderTraversal(rootNode)

/**============= 中序遍历 ====================*/
function inorder(root) {
  if (!root) return
  inorder(root.left)
  console.log(`当前中序遍历的节点值为${root.val}`)
  inorder(root.right)
}

inorder(rootNode)

// 非递归遍历版
function inorderTraversal (root) {
  let tmp = root
  let stack = []
  while (stack.length !== 0 || tmp !== null) {
    if (tmp !== null) {
      stack.push(tmp)
      tmp = tmp.left
    } else {
      let node = stack.pop()
      console.log(`当前非递归遍历中序遍历的节点值为${node.val}`)
      tmp = node.right
    }
  }
}

inorderTraversal(rootNode)

/**============= 后序遍历 ====================*/
function postorder(root) {
  if (!root) return
  postorder(root.left)
  postorder(root.right)
  console.log(`当前后序遍历的节点值为${root.val}`)
  
}

postorder(rootNode)

// 非递归遍历版
function postorderTraversal (root) {
  let stack = []
  let res = []
  stack.push(root)
  while (stack.length) {
    let node = stack.pop()
    res.unshift(node.val)
    
    if (node.left) {
      stack.push(node.left)
    }
    if (node.right) {
      stack.push(node.right)
    }
  }
  res.forEach(item => {
    console.log(`当前非递归遍历后序遍历的节点值为${item}`)
  })
  return res
}

postorderTraversal(rootNode)




