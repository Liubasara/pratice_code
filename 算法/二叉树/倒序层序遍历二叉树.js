/**
107. 二叉树的层序遍历 II
给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 
（即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
输入：root = [3,9,20,null,null,15,7]
输出：[[15,7],[9,20],[3]]
示例 2：

输入：root = [1]
输出：[[1]]

*/

/**
 * @typedef {{ val: string, left?: TreeNode, right?: TreeNode }} TreeNodeStruct
 * @type {(root: TreeNodeStruct) => Array<number>}
 */
var levelOrderBottom = function (root) {
  if (!root) return []
  const res = []
  function bfs(node) {
    const queue = [{ node, depth: 1 }]
    let curr = [node.val]
    let currDepth = 0
    while (queue.length !== 0) {
      const tmp = queue.shift()
      const { node: theNode, depth: theDepth } = tmp
      if (currDepth !== theDepth) {
        currDepth = theDepth
        res.unshift([...curr])
        curr = []
      }
      if (theNode.left) {
        curr.push(theNode.left.val)
        queue.push({ node: theNode.left, depth: theDepth + 1 })
      }
      if (theNode.right) {
        curr.push(theNode.right.val)
        queue.push({ node: theNode.right, depth: theDepth + 1 })
      }
    }
  }
  bfs(root)
  return res
};

!(() => {
  /**
   * @constructor
   * @this {TreeNodeStruct}
   * @type {(val: string, left?: TreeNodeStruct, right?: TreeNodeStruct) => void}
  */
  function TreeNode(val, left = undefined, right = undefined) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
  const rootNode = new TreeNode(3)
  let left = rootNode.left = new TreeNode(9)
  let right = rootNode.right = new TreeNode(20)

  left = right.left = new TreeNode(15)
  right = right.right = new TreeNode(7)
  console.log('levelOrderBottom', levelOrderBottom(rootNode)) // [[15,7],[9,20],[3]]
})()

