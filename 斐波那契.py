# -*- coding:utf-8 -*-
class Solution:
    def Fibonacci(self, n):
        # write code here
        if n<=0:
            return 0
        if n==1:
            return 1
        return self.Fibonacci(n-1)+self.Fibonacci(n-2)
        
if __name__=="__main__":
    a=Solution()
    b=a.Fibonacci(2)
    c = 2
    d = 10
    print c**d
    