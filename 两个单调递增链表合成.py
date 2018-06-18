# -*- coding:utf-8 -*-
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution:
    # 返回合并后列表
    def Merge(self, pHead1, pHead2):
        # write code here
        new_listnode = ListNode(0)
        tmp = new_listnode
        
        while pHead1 and pHead2:
            if pHead1.val > pHead2.val:
                tmp.next = pHead2
                pHead2 = pHead2.next
            elif pHead1.val < pHead2.val:
                tmp.next = pHead1
                pHead1 = pHead1.next
            elif pHead1.val == pHead2.val:
                tmp.next = pHead1
                pHead1 = pHead1.next
                
            tmp = tmp.next
            
        if pHead1:
            tmp.next = pHead1
            
        if pHead2:
            tmp.next = pHead2
            
        return new_listnode.next