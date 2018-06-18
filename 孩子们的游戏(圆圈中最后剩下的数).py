# -*- coding:utf-8 -*-
class Solution:
    def LastRemaining_Solution(self, n, m):
        # write code here
        lis = range(n)
        if n == 0:
            return -1
        start = 0
        final = 0
        while lis:
            i = (start + m - 1) % n
            final = lis.pop(i)
            n -= 1
            start = i
        return final