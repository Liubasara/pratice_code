# -*- coding:utf-8 -*-
class Solution:
    def __init__(self):
        self.stackA = []
        self.stackB = []
    def push(self, node):
        # write code here
        while self.stackB:
            self.stackA.append(self.stackB.pop())
            
        self.stackA.append(node)
        
    def pop(self):
        # return xx
        while self.stackA:
            self.stackB.append(self.stackA.pop())
        return self.stackB.pop()