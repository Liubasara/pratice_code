/**
 * 找出二叉查找树中出现频率最高的元素。树中结点满足left->val <= root->val <= right->val。
 * 如果多个元素出现次数相等，返回最小的元素。
 * 
 * 思路：
 * 在一个有序数组中，我们查找出现频率最高的元素，很简单，顺序扫描一遍即可统计出。
 * 那么我们对二叉查找树（二叉查找树中左结点比根结点小，右结点比根结点大）也可以用类似方式统计，因为中序遍历序列就是有序序列
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

let rootNode = new BinarytreeNode(12)
rootNode.createAndSetLeft(6).createAndSetLeft(6)
rootNode.left.createAndSetRight(7).createAndSetLeft(7)
// rootNode.left.createAndSetRight(7).createAndSetLeft(6)
rootNode.left.right.createAndSetRight(8)
rootNode.createAndSetRight(18).createAndSetRight(18)
rootNode.right.createAndSetLeft(18)

/**
 * 找出二叉查找树中出现频率最高的元素。
 * 树中结点满足left->val <= root->val <= right->val。如果多个元素出现次数相等，返回最小的元素。
 * 
 * 在一个有序数组中，我们查找出现频率最高的元素，很简单，顺序扫描一遍即可统计出。
 * 那么我们对二叉查找树也可以用类似方式统计，因为中序遍历序列就是有序序列（二叉搜索树的定义是左子树一定小于根结点，右子树的元素一定大于根结点）
 * 所以我们在中序遍历的过程中就可以统计出出现频率最高的元素。
 */
function getMostFrequently (root) {
  let currentNodeVal
  let currCount = 0
  let maxCountNodeVal
  let maxCount = 0
  function inOrder (node) {
    if (!node) return
    inOrder(node.left)
    // 判断当前结点与前一个结点的值是否相同，若不同则覆盖
    if (node.val === currentNodeVal) {
      currCount += 1
    } else {
      currentNodeVal = node.val
      currCount = 1
    }
    // 判断当前结点与最大结点个数，若大于则覆盖
    if ((maxCount < currCount) ||
        (maxCount === currCount && currentNodeVal < maxCountNodeVal)
       ) {
      maxCountNodeVal = node.val
      maxCount = currCount
    }
    inOrder(node.right)
  }
  inOrder(root)
  return [maxCount, maxCountNodeVal]
}

console.log(getMostFrequently(rootNode))
