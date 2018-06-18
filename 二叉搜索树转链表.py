# -*- coding:utf-8 -*-
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Solution:
    head = None
    real_head = None
    def Convert(self, root):
        # write code here
        self.ConvertBuf(root)
        return self.real_head
    
    def ConvertBuf(self, root):
        if not root:
            return 
        self.ConvertBuf(root.left)
        if self.head == None and self.real_head == None:
            self.head = root
            self.real_head = root
            
        else:
            self.head.right = root
            root.left = self.head
            self.head = root
        self.ConvertBuf(root.right)
