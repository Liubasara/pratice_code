# -*- coding:utf-8 -*-
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Solution:
    # 返回二维列表[[1,2],[4,5]]
    def Print(self, pRoot):
        # write code here
        if not pRoot:
            return []
        result = []
        res = [pRoot]
        while res:
            this_result = []
            next_stack = []
            for i in res:
                this_result.append(i.val)
                if i.left:
                    next_stack.append(i.left)
                if i.right:
                    next_stack.append(i.right)
            res = next_stack
            result.append(this_result)
        return result