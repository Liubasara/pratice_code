function ListNode(val) {
  this.val = val
  this.next = null
}

function createNodeChainByList (arr) {
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

/**剑指 Offer 18. 删除链表的节点 
 * 题目保证链表中节点的值互不相同
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
function deleteNode (head, val) {
  if (!head) return head
  let tmp = head
  if (tmp.val === val) {
    head = tmp = tmp.next
  }
  while (tmp.next) {
    if (tmp.next.val === val) {
      tmp.next = tmp.next.next
      break
    }
    tmp = tmp.next
  }
  return head
}

// console.log(deleteNode(firstNode, 1))

/**
 * 该题目还有一个进阶版本，如果传入的不是一个指定的值而是一个节点，是否能用平均 O(1) 的方式而不是 O(N) 的方式删除节点？
 * 答案当然是可以，虽然通过 O(1) 的方式无法知道单向链表节点的上一个节点，但是可以知道下一个节点，只要将下一个节点的值复制到当前节点再改一下指针指向，就能成功“偷龙换凤”
 * 但这样做的前提是删除的节点一定不能是尾节点（无凤可换），尾节点的情况还是只能默默遍历，所以只能做到平均 O(1) 而不是全体 O(1)
 */

/**
 * @param {ListNode} head
 * @param {ListNode} node
 * @return {ListNode}
 */
function deleteNode2 (head, node) {
  if (!head || !node) return head
  if (node.next) {
    // 非尾节点，直接替换返回
    node.val = node.next.val
    node.next = node.next.next
    return head
  }
  // 尾节点，只能挨个找
  let tmp = head
  while (tmp.next) {
    if (tmp.next.val === val) {
      tmp.next = tmp.next.next
      break
    }
    tmp = tmp.next
  }
  return head
}

console.log(deleteNode2(firstNode, firstNode.next))
