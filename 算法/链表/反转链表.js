function ListNode(val) {
  this.val = val
  this.next = null
}

function createNodeChainByList(arr) {
  if (!arr[0] && arr[0] !== 0) return
  let firstNode = new ListNode(arr[0])
  let tmpNode = firstNode
  arr.slice(1).forEach(value => {
    var nextNode = new ListNode(value)
    tmpNode.next = nextNode
    tmpNode = nextNode
  })
  return firstNode
}

var firstNode = createNodeChainByList([1, 2, 3, 4, 5])
// while (firstNode) {
// console.log(firstNode.val)
// firstNode = firstNode.next
// }

/**
  反转链表
**/
var reverseList = function (head) {
  if (!head) return null
  let lastNode
  function dfs(node) {
    if (!node.next) {
      // 尾结点
      lastNode = node
      return
    }
    dfs(node.next) // 递归进入下一个节点
    // 出栈时 tmp 为倒数第二个结点，tmp.next 为尾结点
    node.next.next = node // 进行反转，将倒数第一个节点的 next 指针指向倒数第二个
  }
  dfs(head)
  head.next = null // 原来的头结点现在是尾结点，指针需要指向 null
  return lastNode
}

// var reverseFirstNode = reverseList(firstNode)

// while (reverseFirstNode) {
//   console.log(reverseFirstNode.val)
//   reverseFirstNode = reverseFirstNode.next
// }

/**
  非递归反转链表（三指针法）
  题解：http://c.biancheng.net/view/8105.html
**/
var reverseList = function traverseReversList(head) {
  if (!head) return null
  let p1 = head
  let p2 = head.next
  while (p2) {
    let p3 = p2.next
    p2.next = p1
    p1 = p2
    p2 = p3
  }
  head.next = null
  return p1
}

var reverseFirstNode = reverseList(firstNode)

while (reverseFirstNode) {
  console.log(reverseFirstNode.val)
  reverseFirstNode = reverseFirstNode.next
}
