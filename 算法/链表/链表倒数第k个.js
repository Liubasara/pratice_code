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

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function getKthFromEnd (head, k) {
  let tmp1 = head
  let tmp2 = head
  function dfs (count, tmp1, tmp2) {
    if (tmp2.next === null) return tmp1
    if (count === k - 1) {
      tmp1 = tmp1.next
      tmp2 = tmp2.next
    } else {
      tmp2 = tmp2.next
      count++
    }
    return dfs(count, tmp1, tmp2)
  }
  let res = dfs(0, tmp1, tmp2)
  return res
}

console.log(getKthFromEnd(firstNode, 2))

/**
 * 遍历方法
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function getKthFromEnd1 (head, k) {
  let tmp1 = head, tmp2 = head, count = 0
  while (count !== k - 1) {
    tmp2 = tmp2.next
    count++
  }
  while (tmp2.next !== null) {
    tmp1 = tmp1.next
    tmp2 = tmp2.next
  }
  return tmp1
}

console.log(getKthFromEnd1(firstNode, 2))
