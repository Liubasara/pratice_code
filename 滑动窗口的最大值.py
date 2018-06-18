# -*- coding:utf-8 -*-
class Solution:
    def maxInWindows(self, num, size):
        # write code here
        if size == 0:
            return []
        if not num:
            return None
        length = len(num)
        return_res = []
        for i in range(length-size+1):
            res = num[i:i+size]
            res.sort()
            return_res.append(res[-1])
        return return_res
a = Solution()
print a.maxInWindows([1,3,5,7,9,11,13,15],4)