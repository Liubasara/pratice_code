/**
876. 链表的中间结点
给定一个带有头结点 head 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。
示例 1：

输入：[1,2,3,4,5]
输出：此列表中的结点 3 (序列化形式：[3,4,5])
返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
注意，我们返回了一个 ListNode 类型的对象 ans，这样：
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.
示例 2：

输入：[1,2,3,4,5,6]
输出：此列表中的结点 4 (序列化形式：[4,5,6])
由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。
 

提示：

给定链表的结点数介于 1 和 100 之间。
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
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
 * @param {ListNode} head
 * @return {ListNode}
 */
/**
思路：https://leetcode-cn.com/problems/middle-of-the-linked-list/solution/kuai-man-zhi-zhen-zhu-yao-zai-yu-diao-shi-by-liwei/
快慢指针
*/
var middleNode = function(head) {
  let fast = head
  let slow = head
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  return slow
};