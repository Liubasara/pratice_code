# -*- coding:utf-8 -*-
class Solution:
    data = []
    def Insert(self, num):
        # write code here
        self.data.append(num)
        self.data.sort()
    def GetMedian(self):
        # write code here
        length = len(self.data)
        if length%2 != 0:
            return float(self.data[int(length/2)])
        else:
            res = float(self.data[int(length/2)-1] + self.data[int(length/2)])/2
            return res

a = Solution()
a.Insert(5)
print a.GetMedian()
print a.data
print '---------------------'
a.Insert(2)
print a.GetMedian()
print a.data
print '---------------------'
a.Insert(3)
print a.GetMedian()
a.Insert(4)
print a.GetMedian()
a.Insert(1)
print a.GetMedian()
a.Insert(6)
print a.GetMedian()
a.Insert(7)
print a.GetMedian()
a.Insert(0)
print a.GetMedian()
a.Insert(8)
print a.GetMedian()
