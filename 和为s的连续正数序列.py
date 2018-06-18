# -*- coding:utf-8 -*-
class Solution:
    def FindContinuousSequence(self, tsum):
        # write code here
        small = 1
        big = 2
        result = []
        while small < (tsum+1)/2:
            re = []
            res = 0
            for i in range(small, big+1):
                re.append(i)
                res += i
            if res == tsum:
                result.append(re)
                small += 1
            elif res > tsum:
                small += 1
            elif res < tsum:
                big += 1
        return result
        
if __name__ == "__main__":
    a = Solution()
    b = a.FindContinuousSequence(9)
    print b