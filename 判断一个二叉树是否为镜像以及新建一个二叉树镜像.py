# -*- coding:utf-8 -*-
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Solution:
    def isSymmetrical(self, pRoot):
        # write code here
        if pRoot == None:
            return True
        mirror_pRoot = self.MakeMirror(pRoot)
        res = self.Travel(pRoot, mirror_pRoot)
        return res
    def MakeMirror(self, pRoot):
        if not pRoot:
            return pRoot
        new_tree = TreeNode(pRoot.val)
        new_tree.right = self.MakeMirror(pRoot.left)
        new_tree.left = self.MakeMirror(pRoot.right)
        return new_tree
    def Travel(self, root, mirror_root):
        if root is None and mirror_root is None:
            return True
        if root is None or mirror_root is None:
            return False
        if root.val != mirror_root.val:
            return False
        return self.Travel(root.left, mirror_root.left) and self.Travel(root.right, mirror_root.right)
                