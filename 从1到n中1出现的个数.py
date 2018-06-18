# -*- coding:utf-8 -*-
class Solution:
    def NumberOf1Between1AndN_Solution(self, n):
        # write code here
        count = 0
        for i in range(1,n+1):
            if '1' in str(i):
                count += str(i).count('1')
        return count

if __name__ == "__main__":
    a = Solution()
    b = a.NumberOf1Between1AndN_Solution(55)
    print(b)