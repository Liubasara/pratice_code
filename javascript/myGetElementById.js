/**
 * 参考：[js实现getElmentById(id)](https://blog.csdn.net/u014452812/article/details/78098786)
 */

// 递归实现
function getElementById (node, id) {
  if (node.id === id) return node
  if (node.children.length > 0) {
    for (let i = 0; i < node.children.length; i++) {
      let foundNode = getElementById(node.children[i], id)
      if (foundNode) return foundNode
    }
  }
  // 找不到
  return null
}
