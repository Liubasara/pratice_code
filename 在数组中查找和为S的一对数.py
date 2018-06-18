# -*- coding:utf-8 -*-
class Solution:
    def FindNumbersWithSum(self, array, tsum):
        for i in array:
            if tsum-i in array:
                if tsum-i==i:
                    if array.count(i)>1:
                        return [i,i]
                else:
                    return [i,tsum-i]
        return [] 