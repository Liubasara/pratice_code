/**
 * 
 *树的层次计算规则：根结点所在的那一层记为第一层，其子结点所在的就是第二层，以此类推。
 *结点和树的“高度”计算规则：叶子结点高度记为1，每向上一层高度就加1，逐层向上累加至目标结点时，所得到的的值就是目标结点的高度。树中结点的最大高度，称为“树的高度”。
 *“度”的概念：一个结点开叉出去多少个子树，被记为结点的“度”。比如我们上图中，根结点的“度”就是3。
 *“叶子结点”：叶子结点就是度为0的结点。在上图中，最后一层的结点的度全部为0，所以这一层的结点都是叶子结点。
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

let rootNode = new BinarytreeNode(1)

let leftNode = rootNode.createAndSetLeft(2)

let rightNode = rootNode.createAndSetRight(3)

leftNode.createAndSetLeft(4)

rightNode.createAndSetRight(5)



/**
103. 二叉树的锯齿形层序遍历
  给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

  

  示例 1：


  输入：root = [3,9,20,null,null,15,7]
  输出：[[3],[20,9],[15,7]]
  示例 2：

  输入：root = [1]
  输出：[[1]]
  示例 3：

  输入：root = []
  输出：[]
 */

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  const res = []
  function bfs(node) {
    if (!node) return
    let currDepth = 0
    let curr = [node.val]
    const queue = [{ node, depth: 1 }]
    while (queue.length !== 0) {
      const tmp = queue.shift()
      const { node: theNode, depth: theDepth } = tmp
      if (theDepth !== currDepth) {
        currDepth = theDepth
        res.push([...curr])
        curr = []
      }
      if (theDepth % 2 !== 0) {
        // 下一层从右边开始遍历
        if (theNode.right) {
          curr.push(theNode.right.val)
          queue.push({ node: theNode.right, depth: theDepth + 1 })
        }
        if (theNode.left) {
          curr.push(theNode.left.val)
          queue.push({ node: theNode.left, depth: theDepth + 1 })
        }
      } else {
        // 下一层从左边开始遍历
        if (theNode.right) {
          curr.unshift(theNode.right.val)
          queue.push({ node: theNode.right, depth: theDepth + 1 })
        }
        if (theNode.left) {
          curr.unshift(theNode.left.val)
          queue.push({ node: theNode.left, depth: theDepth + 1 })
        }
      }
    }
  }
  bfs(root)
  return res
};

console.log(zigzagLevelOrder(rootNode)) // [[1],[3,2],[4,5]]