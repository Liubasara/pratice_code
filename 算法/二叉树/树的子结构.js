/**
 * 剑指 Offer 26. 树的子结构
 * 输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)
 * B是A的子结构， 即 A中有出现和B相同的结构和节点值。
 * 
 * 例如:
 * 给定的树 A:
 * 
 *      3
 *     / \
 *    4   5
 *   / \
 *  1   2
 * 给定的树 B：
 * 
 *    4 
 *   /
 *  1
 * 返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。
 */

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

let childNode = new BinarytreeNode('B')
childNode.createAndSetLeft('D')

/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
function isSubStructure (A, B) {
  // 思路：先前序遍历 A（优先根结点）找根结点值相同的点，找到之后再对以该结点作为根结点的树进行递归，在 B 树到达叶结点之前(结束条件)，查看左右结点是否都相同
  /**
   * @param {TreeNode} root1 
   * @param {TreeNode} root2
   * @return {boolean}
   */
  function DoesTree1HasTree2 (root1, root2) {
    if (!root2) {
      // 到达了页结点，B 遍历完毕
      return true
    }
    if (!root1) {
      // B 还未遍历完毕但 A 已经遍历完毕，说明不是子树
      return false
    }
    if (root1.val !== root2.val) {
      // 当前遍历到的结点的值不一样，说明不是子树
      return false
    }
    // 两个结点一样，继续递归遍历左子树和右子树，返回总结果
    return DoesTree1HasTree2(root1.left, root2.left) && DoesTree1HasTree2(root1.right, root2.right)
  }
  if (!A || !B) return false
  let result = false
  if (A.val === B.val) {
    result = DoesTree1HasTree2(A, B)
  }
  !result && (result = isSubStructure(A.left, B))
  !result && (result = isSubStructure(A.right, B))
  return result
}

console.log(isSubStructure(rootNode, childNode))
