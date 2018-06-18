# -*- coding:utf-8 -*-
class Solution:
    def reOrderArray(self, array):
        # write code here
        new_array = []
        for i in array:
            if i%2 !=0:
                new_array.append(i)
        for j in array:
            if j%2 ==0:
                new_array.append(j)
        return new_array
                
if __name__=="__main__":
    a = Solution()
    b = [1,24,3,88,99,65,32,31,55,89]
    c = a.reOrderArray(b)
    print c
