# -*- coding:utf-8 -*-
# class TreeLinkNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
#         self.next = None
class Solution:
    def GetNext(self, pNode):
        # write code here
# write code here
        """根据中序遍历是“左根右”可以发现一共有两种情况：
        1.本结点是根，下一个结点是右：即本结点若有右子树，下一个结点是右子树中最左的那个。
        2.本结点是左，下一个结点是根：本结点是左孩子（没有右子树），下一个结点是根，或者继续向上遍历"""
        if pNode == None:
            return None
        # 该结点为根节点
        if pNode.right != None:
            pNode = pNode.right
            while pNode.left != None:
                pNode = pNode.left
            return pNode
        else:
            if pNode.next == None:
                return None
            cur = pNode
            root = pNode.next
            while root and cur != root.left:
                cur = root
                root = root.next
            if not root:
                return None
            else:
                return root