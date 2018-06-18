# -*- coding:utf-8 -*-
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Solution:
    def Print(self, pRoot):
        # write code here
        if not pRoot:
            return []
        node_stack = []
        node_stack.append(pRoot)
        res = []
        while node_stack:
            result = []
            next_stack = []
            for i in node_stack:
                result.append(i.val)
                if i.left:
                    next_stack.append(i.left)
                if i.right:
                    next_stack.append(i.right)
            node_stack = next_stack
            res.append(result)
        return_result = []
        for index, value in enumerate(res):
            if index%2 == 0:
                return_result.append(value)
            else:
                return_result.append(value[::-1])
        return return_result