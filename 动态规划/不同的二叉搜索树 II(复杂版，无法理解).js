/**
95. 不同的二叉搜索树 II
给定一个整数 n，生成所有由 1 ... n 为节点所组成的二叉搜索树。

示例:

输入: 3
输出:
[
  [1,null,3,2],
  [3,2,null,1],
  [3,1,null,null,2],
  [2,1,3],
  [1,null,2,null,3]
]
解释:
以上的输出对应以下 5 种不同结构的二叉搜索树：

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3

**/

/**
思考过程（抄）：
对于连续整数序列[left, right]中的一点i，若要生成以i为根节点的BST，则有如下规律：
  - i左边的序列可以作为左子树结点，且左儿子可能有多个，所以有vector<TreeNode *> left_nodes = generate(left, i - 1);；
  - i右边的序列可以作为右子树结点，同上所以有vector<TreeNode *> right_nodes = generate(i + 1, right);；
  - 产生的以当前i为根结点的BST（子）树有left_nodes.size() * right_nodes.size()个，遍历每种情况，即可生成以i为根节点的BST序列；
    然后以for循环使得[left, right]中每个结点都能生成子树序列。
  - 一旦left大于right，则说明这里无法产生子树，所以此处应该是作为空结点返回：ans.push_back(NULL); return ans;；
  - 返回[left, right]中生成的所有子树序列ans。
**/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
 
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
  var res = []
  if (n < 1) {
    return res
  } else {
    return generateBST(1, n)
  }
};

function generateBST (start, end) {
  var res = []
  if (start > end) {
    res.push(null)
    return res
  } else {
    for (var i = start; i < end + 1; i++) {
      // 左子树
      var left_tree = generateBST(start, i - 1)
      // 右子树
      var right_tree = generateBST(i + 1, end)
      for (left of left_tree) {
        for (right of right_tree) {
          var root = new TreeNode(i)
          root.left = left
          root.right = right
          res.push(root)
        }
      }
    }
    return res
  }
}

function ergodicTrees (node) {
  if (node) {
    console.log(node.val)
    ergodicTrees(node.left)
    ergodicTrees(node.right)
  }
}

generateTrees(3).forEach(item => {
  ergodicTrees(item)
  console.log('---------------------------------\n')
})
