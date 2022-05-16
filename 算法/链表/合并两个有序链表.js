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

/**
 21. 合并两个有序链表
  将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

  示例 1：


  输入：l1 = [1,2,4], l2 = [1,3,4]
  输出：[1,1,2,3,4,4]
  示例 2：

  输入：l1 = [], l2 = []
  输出：[]
  示例 3：

  输入：l1 = [], l2 = [0]
  输出：[0]
 */

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  const dummyNode = new ListNode(null)
  let pre = dummyNode
  let p1 = list1
  let p2 = list2
  while (p1 && p2) {
    if (p1.val < p2.val) {
      pre.next = p1
      pre = p1
      p1 = p1.next
    } else {
      pre.next = p2
      pre = p2
      p2 = p2.next
    }
  }
  if (p1) {
    pre.next = p1
  } else if (p2) {
    pre.next = p2
  }
  return dummyNode.next
};


!(() => {
  // [1,1,2,3,4,4]
  var list1 = createNodeChainByList([1, 2, 4])
  var list2 = createNodeChainByList([1, 3, 4])

  var targetNode = mergeTwoLists(list1, list2)
  while (targetNode) {
    console.log(targetNode.val)
    targetNode = targetNode.next
  }

  console.log('----------------------')
})()
