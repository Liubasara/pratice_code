# -*- coding:utf-8 -*-
class Solution:
    def NumberOf1(self, n):
        # write code here
        if n<0:
            string = str(bin(2**32 + n))
            count = string.count('1')
            return count
        string = str(bin(n))
        count = string.count('1')
        return count
        
if __name__=="__main__":
    a = Solution()
    num = -1
    num_re = a.NumberOf1(num)
    print num_re