# -*- coding:utf-8 -*-
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def Mirror(self, root):
        # write code here
        if not root:
            return root
        root.left, root.right=root.right, root.left
        self.Mirror(root.left)
        self.Mirror(root.right)
        return root
            
        