# -*- coding:utf-8 -*-
import itertools
class Solution:
    def PrintMinNumber(self, numbers):
        # write code here
        ret = []
        result = itertools.permutations(numbers)
        for i in result:
            ret.append(''.join(str(j) for j in i))
        return min(ret)
if __name__ == "__main__":
    a = Solution()
    b = a.PrintMinNumber([1,2,3,4,5])
    print b