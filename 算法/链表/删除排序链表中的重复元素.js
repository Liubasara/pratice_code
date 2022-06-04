function ListNode(val) {
  this.val = val
  this.next = null
}

function createNodeChainByList(arr) {
  if (!arr[0] && arr[0] !== 0) return
  let firstNode = new ListNode(arr[0])
  let tmpNode = firstNode
  arr.slice(1).forEach((value) => {
    var nextNode = new ListNode(value)
    tmpNode.next = nextNode
    tmpNode = nextNode
  })
  return firstNode
}

/**
  83. 删除排序链表中的重复元素
  给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。

  

  示例 1：


  输入：head = [1,1,2]
  输出：[1,2]
  示例 2：


  输入：head = [1,1,2,3,3]
  输出：[1,2,3]
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head) return null
  let p1 = head
  while (p1.next) {
    if (p1.val === p1.next.val) {
      p1.next = p1.next.next
    } else {
      p1 = p1.next
    }
  }
  return head
}

!(() => {
  let node = deleteDuplicates(createNodeChainByList([1, 1, 2, 3, 3]))
  // 1 2 3
  while (node) {
    console.log(node.val)
    node = node.next
  }
})()
