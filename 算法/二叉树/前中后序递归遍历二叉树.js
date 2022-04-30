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
function preorderTraversal1(root) {
  const stack = []
  stack.push(root)
  while (stack.length > 0) {
    const node = stack.pop()
    console.log(`当前非递归遍历前序遍历的节点值为${node.val}`)
    if (node.right) {
      stack.push(node.right)
    }
    if (node.left) {
      stack.push(node.left)
    }
  }
}

preorderTraversal1(rootNode)

// 更好理解的非递归遍历版（颜色标记法）
function preorderTraversal2(root) {
  const res = []
  function start(node) {
    if (!node) return
    const stack = [{ node, visited: false }]
    while (stack.length !== 0) {
      const tmp = stack.pop()
      const { node: theNode, visited: theVisited } = tmp
      if (!theVisited) {
        if (theNode.right) {
          stack.push({ node: theNode.right, visited: false })
        }
        if (theNode.left) {
          stack.push({ node: theNode.left, visited: false })
        }
        stack.push({ node: theNode, visited: true })
      } else {
        res.push(theNode.val)
      }
    }
  }
  start(root)
  return res
}

preorderTraversal2(rootNode)

/**============= 中序遍历 ====================*/
function inorder(root) {
  if (!root) return
  inorder(root.left)
  console.log(`当前中序遍历的节点值为${root.val}`)
  inorder(root.right)
}

inorder(rootNode)

// 非递归遍历版(颜色标记法)
function inorderTraversal(root) {
  const res = []
  function start(node) {
    if (!node) return
    const stack = [{ node, visited: false }]
    while (stack.length !== 0) {
      const tmp = stack.pop()
      const { node: theNode, visited: theVisited } = tmp
      if (!theVisited) {
        if (theNode.right) {
          stack.push({ node: theNode.right, visited: false })
        }
        stack.push({ node: theNode, visited: true })
        if (theNode.left) {
          stack.push({ node: theNode.left, visited: false })
        }
      } else {
        res.push(theNode.val)
      }
    }
  }
  start(root)
  return res
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

// 非递归遍历版（颜色标记法）
function postorderTraversal(root) {
  const res = []
  function start(node) {
    if (!node) return
    const stack = [{ node, visited: false }]
    while (stack.length !== 0) {
      const tmp = stack.pop()
      const { node: theNode, visited: theVisited } = tmp
      if (!theVisited) {
        stack.push({ node: theNode, visited: true })
        if (theNode.right) {
          stack.push({ node: theNode.right, visited: false })
        }
        if (theNode.left) {
          stack.push({ node: theNode.left, visited: false })
        }
      } else {
        res.push(theNode.val)
      }
    }
  }
  start(root)
  return res
}

postorderTraversal(rootNode)
