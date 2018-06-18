# -*- coding:utf-8 -*-
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None
class Solution:
    def EntryNodeOfLoop(self, pHead):
        # write code here
        if pHead.next == None:
            return ListNode("\"null\"")
        slow = pHead
        fast = pHead
        q = pHead
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                while slow != q:
                    q = q.next
                    slow = slow.next
                return slow
if __name__ == "__main__":
    lian_biao_first = ListNode('first')

    lian_biao_first.next = ListNode('HuanJieDianSecond')
    lian_biao_second = lian_biao_first.next

    lian_biao_second.next = ListNode('Third')
    lian_biao_third = lian_biao_second.next

    lian_biao_third.next = ListNode('fourth')
    lian_biao_fourth = lian_biao_third.next

    lian_biao_fourth.next = ListNode('fifth')
    lian_biao_fifth = lian_biao_fourth.next

    lian_biao_fifth.next = lian_biao_second

    # 正式测试
    # tmp = lian_biao_first
    # while tmp:
        # print(tmp.val)
        # tmp = tmp.next
        
    a = Solution()
    res = a.EntryNodeOfLoop(lian_biao_first)
    print res