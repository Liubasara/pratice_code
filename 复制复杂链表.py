# -*- coding:utf-8 -*-
# class RandomListNode:
#     def __init__(self, x):
#         self.label = x
#         self.next = None
#         self.random = None
class Solution:
    # 返回 RandomListNode
    def Clone(self, pHead):
        # write code here
        root = RandomListNode(0)
        tmp = root
        while pHead:
            tmp.next = RandomListNode(pHead.label)
            tmp.next.next = pHead.next
            tmp.next.random = pHead.random
            pHead = pHead.next
            tmp = tmp.next
        return root.next