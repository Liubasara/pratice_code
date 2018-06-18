# -*- coding:utf-8 -*-
class Solution:
    def Sum_Solution(self, n):
        # write code here
        a = n
        n += a and self.Sum_Solution(n-1)
        return n

a = Solution()
b = a.Sum_Solution(10)
print b