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
function buildTree (preorder, inorder) {

}

console.log(buildTree([3,9,20,15,7], [9,3,15,20,7]))
