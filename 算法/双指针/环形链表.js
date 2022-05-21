function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
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

/**
  141. 环形链表
  给你一个链表的头节点 head ，判断链表中是否有环。

  如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。

  如果链表中存在环 ，则返回 true 。 否则，返回 false 。

  

  示例 1：



  输入：head = [3,2,0,-4], pos = 1
  输出：true
  解释：链表中有一个环，其尾部连接到第二个节点。
  示例 2：



  输入：head = [1,2], pos = 0
  输出：true
  解释：链表中有一个环，其尾部连接到第一个节点。
  示例 3：



  输入：head = [1], pos = -1
  输出：false
  解释：链表中没有环。
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  if (!head || !head.next) return false
  let p1 = head
  let p2 = head
  while (p1 && p2) {
    p2 = p2.next.next
    p1 = p1.next
    if (p1 === p2) {
      return true
    }
  }
  return false
};

!(() => {
  var firstNode = createNodeChainByList([1, 2, 3, 4, 5])

  firstNode.next.next.next.next = firstNode
  // true
  console.log(hasCycle(firstNode))

  console.log('----------------------')
})()