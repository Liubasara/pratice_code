/**
  92. 反转链表 II
  给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
  

  示例 1：


  输入：head = [1,2,3,4,5], left = 2, right = 4
  输出：[1,4,3,2,5]
  示例 2：

  输入：head = [5], left = 1, right = 1
  输出：[5]
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  if (!head) return null
  if (!head.next) return head
  if (left === right) return head
  let dummyNode = new ListNode(null)
  dummyNode.next = head
  let pre = null
  let p1 = dummyNode
  let count = 0
  while (count < left) {
    pre = p1
    p1 = p1.next
    count++
  }
  let last = p1
  let p2 = p1.next
  while (count < right) {
    let p3 = p2.next
    p2.next = p1
    p1 = p2
    p2 = p3
    count++
  }
  pre.next = p1
  last.next = p2
  return dummyNode.next
};

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

!(() => {
  var firstNode = createNodeChainByList([1, 2, 3, 4, 5])

  var revertNode = reverseBetween(firstNode, 2, 4)

  // [1, 4, 3, 2, 5]
  while (revertNode) {
    console.log(revertNode.val)
    revertNode = revertNode.next
  }

  console.log('----------------------')
})()


!(() => {
  var firstNode = createNodeChainByList([3, 5])

  var revertNode = reverseBetween(firstNode, 1, 2)

  // [5, 3]
  while (revertNode) {
    console.log(revertNode.val)
    revertNode = revertNode.next
  }
})()


