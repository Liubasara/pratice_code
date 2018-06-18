# -*- coding:utf-8 -*-
class Solution:
    def FindGreatestSumOfSubArray(self, array):
        res = len(array) and max(array)
        temp = 0
        for i in array:
            temp = max(i,temp+i)
            res = max(res,temp)
        return res