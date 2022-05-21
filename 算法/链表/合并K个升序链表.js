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
  23. 合并K个升序链表
  给你一个链表数组，每个链表都已经按升序排列。

  请你将所有链表合并到一个升序链表中，返回合并后的链表。

  

  示例 1：

  输入：lists = [[1,4,5],[1,3,4],[2,6]]
  输出：[1,1,2,3,4,4,5,6]
  解释：链表数组如下：
  [
    1->4->5,
    1->3->4,
    2->6
  ]
  将它们合并到一个有序链表中得到。
  1->1->2->3->4->4->5->6
  示例 2：

  输入：lists = []
  输出：[]
  示例 3：

  输入：lists = [[]]
  输出：[]
 
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * 归并法
 * 题解：https://leetcode.cn/problems/merge-k-sorted-lists/solution/by-smooth-b-e6l9/
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  const listsLen = lists.length
  if (listsLen < 1) return null
  // 合并两个有序链表
  function sortKLists(list1, list2) {
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
  }
  function start(arr) {
    const arrLen = arr.length
    // 归并到最后，把需要处理的节点拿出来
    if (arrLen === 1) return arr[0]
    const pointIdx = Math.floor(arrLen / 2)
    const leftList = start(arr.slice(0, pointIdx))
    const rightList = start(arr.slice(pointIdx))
    return sortKLists(leftList, rightList)
  }
  return start(lists)
};

/**
 * 构建小根堆做法
 */

!(() => {
  var firstNode = createNodeChainByList([1, 4, 5])
  var firstNode1 = createNodeChainByList([1, 3, 4])
  var firstNode2 = createNodeChainByList([2, 6])
  const mergeHead = mergeKLists([firstNode, firstNode1, firstNode2])

  let p1 = mergeHead
  while (p1) {
    console.log(p1.val)
    p1 = p1.next
  }
  console.log('----------------------')
})()


/**
 * 构建小根堆做法，每次遍历拿一个最小值，组成链表
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKListsMinHeap = function (lists) {
  const listsLen = lists.length
  if (listsLen < 1) return null
  const heap = []
  const dummyNode = new ListNode(null)
  let pre = dummyNode
  for (let i = 0; i < listsLen; i++) {
    const head = lists[i]
    let p1 = head
    while (p1) {
      heap.push(p1.val)
      p1 = p1.next
    }
  }
  buildMinHeap(heap)
  while (heap.length !== 0) {
    pre.next = new ListNode(heap.shift())
    pre = pre.next
    buildMinHeap(heap)
  }
  return dummyNode.next
  function buildMinHeap(nums) {
    const numsLen = nums.length
    const lastLeafNode = Math.floor(numsLen / 2 - 1)
    for (let i = lastLeafNode; i >= 0; i--) {
      down(nums, i)
    }
  }
  function down(nums, i) {
    const numsLen = nums.length
    const left = 2 * i + 1
    const right = 2 * i + 2
    let min = i

    if (left < numsLen && nums[left] < nums[min]) {
      min  = left
    }

    if (right < numsLen && nums[right] < nums[min]) {
      min = right
    }

    if (min !== i) {
      ;[nums[min], nums[i]] = [nums[i], nums[min]]
      down(nums, min)
    }
  }
};

!(() => {
  var firstNode = createNodeChainByList([1, 4, 5])
  var firstNode1 = createNodeChainByList([1, 3, 4])
  var firstNode2 = createNodeChainByList([2, 6])
  const mergeHead = mergeKListsMinHeap([firstNode, firstNode1, firstNode2])

  let p1 = mergeHead
  while (p1) {
    console.log(p1.val)
    p1 = p1.next
  }
  console.log('----------------------')
})()