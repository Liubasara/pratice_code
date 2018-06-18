# -*- coding:utf-8 -*-
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution:
    def FindFirstCommonNode(self, pHead1, pHead2):
        # write code here
        if not pHead1 or not pHead2:
            return None
        if pHead1 == pHead2:
            return pHead1
        pHead1_stack = []
        pHead2_stack = []
        tmp_1 = pHead1
        tmp_2 = pHead2
        
        while tmp_1:
            pHead1_stack.append(tmp_1)
            tmp_1 = tmp_1.next

        while tmp_2:
            pHead2_stack.append(tmp_2)
            tmp_2 = tmp_2.next

        while pHead1_stack and pHead2_stack:
            if pHead1_stack[-1] != pHead2_stack[-1]:
                return pHead1_stack[-1].next
            pHead1_stack.pop()
            pHead2_stack.pop()
        return pHead1_stack[-1].next
            