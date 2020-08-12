/**
 * 题目1：合并两个升序链表。比如：L1={1, 3, 5}, L2={2, 4}, L1.merge(L2)后，L1={1, 2, 3, 4, 5}。
 * 注意：merge函数不需要返回值。
*/

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

/**
 * @param {ListNode} headL2
 */
ListNode.prototype.merge = function (headL2) {
	let p1 = this
  let p2 = headL2
  if (!p1 && !p2) {
    return p1
  }
  if (!p1 || !p2) {
    return p1 || p2
  }
  // 确保 p1 链表开头的值为最小
  if (p1.val > p2.val) {
    let newLinkNode = new ListNode(p1.val)
    newLinkNode.next = p1.next
    p1.next = newLinkNode
  	p1.val = p2.val
    p2 = p2.next
  }
  while (p1 && p2) {
    if (p1.next === null) break
  	if (p1.next.val >= p2.val) {
    	let tmp2 = p2
      p2 = p2.next
      tmp2.next = p1.next
      p1.next = tmp2
      p1 = p1.next
    } else {
    	p1 = p1.next
    }
  }
  // 退出循环时 p1 的节点应该在最后一个不为空的节点
  // 如果 p2 的节点没有遍历完，则说明 p2 剩余的节点都是大于 p1 的
  while (p2) {
    p1.next = p2
    p1 = p1.next
    p2 = p2.next
  }
}

var p1 = createNodeChainByList([-9, 3, 10])
var p2 = createNodeChainByList([5, 7])

p1.merge(p2)

while (p1) {
  console.log(p1.val)
  p1 = p1.next
}
