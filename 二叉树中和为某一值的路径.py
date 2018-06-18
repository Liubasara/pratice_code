# -*- coding:utf-8 -*-
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Solution:
    # 返回二维列表，内部每个列表表示找到的路径
    def FindPath(self, root, expectNumber):
        # write code here
        if not root:
            return []
        result = []
        path = []
        self.Path(root, expectNumber, result, path)
        return result
        
    def Path(self,root, expectNumber, result, path):
        path.append(root.val)
        sum_val = sum(path)
        if not root.right and not root.left and sum_val == expectNumber:
            tmp = []
            tmp.extend(path)
            result.append(tmp)
            
        if root.left != None:
            self.Path(root.left, expectNumber, result, path)
        if root.right != None:
            self.Path(root.right, expectNumber, result, path)
        path.pop()