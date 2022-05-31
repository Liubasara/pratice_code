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

BinarytreeNode.creatByArray = function (arr) {
  if (!arr.length || !arr[0]) return null
  const root = new BinarytreeNode(arr[0])
  const nodeLists = [root]
  for (let i = 1; i < arr.length; i++) {
    const arrI = arr[i]
    const theNode = arrI === null ? null : new BinarytreeNode(arrI)
    nodeLists.push(theNode)
    const parent = Math.floor((i - 1) / 2)
    const parentNode = nodeLists[parent]
    const isLeft = i === (2 * parent + 1)
    const isRight = i === (2 * parent + 2)
    if (isLeft && parentNode) {
      parentNode.left = theNode
    } else if (isRight && parentNode) {
      parentNode.right = theNode
    }
  }
  return root
}

/**
  定义 end
*/

/**
  129. 求根节点到叶节点数字之和
  给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
  每条从根节点到叶节点的路径都代表一个数字：

  例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
  计算从根节点到叶节点生成的 所有数字之和 。

  叶节点 是指没有子节点的节点。

  

  示例 1：


  输入：root = [1,2,3]
  输出：25
  解释：
  从根到叶子节点路径 1->2 代表数字 12
  从根到叶子节点路径 1->3 代表数字 13
  因此，数字总和 = 12 + 13 = 25
  示例 2：


  输入：root = [4,9,0,5,1]
  输出：1026
  解释：
  从根到叶子节点路径 4->9->5 代表数字 495
  从根到叶子节点路径 4->9->1 代表数字 491
  从根到叶子节点路径 4->0 代表数字 40
  因此，数字总和 = 495 + 491 + 40 = 1026
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
  if (!root) return 0
  let res = 0
  let curr = root.val
  function dfs(node) {
    if (!node.left && !node.right) {
      res += curr
      return
    }

    if (node.left) {
      const old = curr
      curr = curr * 10 + node.left.val
      dfs(node.left)
      curr = old
    }
    if (node.right) {
      const old = curr
      curr = curr * 10 + node.right.val
      dfs(node.right)
      curr = old
    }

  }
  dfs(root)
  return res
};

; (() => {
  // 1026
  console.log(sumNumbers(BinarytreeNode.creatByArray([4, 9, 0, 5, 1])))
  // 25
  console.log(sumNumbers(BinarytreeNode.creatByArray([1, 2, 3])))
  // 10
  console.log(sumNumbers(BinarytreeNode.creatByArray([1, 0])))
  // 531
  console.log(sumNumbers(BinarytreeNode.creatByArray([4, 9, 0, null, 1])))
})()