function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

/**
 * 剑指 Offer 07. 重建二叉树
 * https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/solution/tu-jie-di-gui-yi-yu-li-jie-by-lewao/
 * 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
 * 例如，给出
 * 前序遍历 preorder = [3,9,20,15,7]
 * 中序遍历 inorder = [9,3,15,20,7]
 * 返回如下的二叉树：
 * 
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 */

 /**
  * 重建二叉树关键的思考过程在于，先从前序遍历数组中确立一个根结点，然后根据该结点在中序遍历的位置确定其左子树和右子树的个数，随后进行递归
  * @param {number[]} preorder 
  * @param {number[]} inorder 
  */
function buildTree (preorder, inorder) {
  const preorderLen = preorder.length
  const inorderLen = inorder.length
  if (preorderLen !== inorderLen) return null
  if (preorderLen === 0 && inorderLen === 0) return null
  if (preorderLen === 1 && inorderLen === 1) {
    return new TreeNode(preorder[0])
  }
  // 先从前序遍历数组中确立一个根结点
  const rootValue = preorder[0]
  const node  = new TreeNode(rootValue)
  // 根据该结点在中序遍历的位置确定其左子树和右子树的个数
  const inorderIndex = inorder.indexOf(rootValue)
  // 前序遍历数组中左子树有 inorderIndex 个，从下一个数据开始算起
  node.left = buildTree(preorder.slice(1, inorderIndex + 1), inorder.slice(0, inorderIndex))
  // 前序遍历数组中除去左子树剩下的就是当前该结点的右子树
  node.right = buildTree(preorder.slice(inorderIndex + 1, preorderLen), inorder.slice(inorderIndex + 1, inorderLen))
  return node
}

function preorder (root) {
  if (!root) return
  console.log(root.val)
  preorder(root.left)
  preorder(root.right)
}

console.log(preorder(buildTree([3,9,20,15,7], [9,3,15,20,7])))
