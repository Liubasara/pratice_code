# -*- coding:utf-8 -*-
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Solution:
    # 返回对应节点TreeNode
    index = 1
    res_node = None
    def KthNode(self, pRoot, k):
        # write code here
        # 此题考查的实际是二叉树的中序排列
        if not pRoot:
            return pRoot
        if k == 0:
            return None
        if pRoot.left:
            self.KthNode(pRoot.left, k)
        if self.index == k:
            self.res_node = pRoot
        self.index += 1
        if pRoot.right:
            self.KthNode(pRoot.right, k)
        return self.res_node