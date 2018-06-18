# -*- coding:utf-8 -*-
class Solution:
    def multiply(self, A):
        # write code here
        B = []
        for i in A:
            mul_res = 1
            tmp = [j for j in A]
            tmp.remove(i)
            for x in tmp:
                mul_res *= x
            B.append(mul_res)
        return B
        
a = [1,2,3,4,5]
b = Solution()
c = b.multiply(a)
print c