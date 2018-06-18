# -*- coding:utf-8 -*-
class Solution:
    def movingCount(self, threshold, rows, cols):
        # write code here
        # 回溯算法
        visted = [[False for i in range(cols)]for j in range(rows)]
        return self.countMoving(rows, cols, 0, 0, threshold, visted)
        
    def countMoving(self,rows, cols, r, c, threshold, visted):
        # addNum函数将每个数的每个位都拆开并相加
        # 设置出口
        if r < 0 \
        or r >= rows \
        or c < 0 \
        or c >= cols \
        or self.addNum(r) + self.addNum(c) > threshold \
        or visted[r][c] \
        or r*c > rows*cols:
            return 0
        # 开始递归
        visted[r][c] = True
        return self.countMoving(rows, cols, r-1, c, threshold, visted) + \
                self.countMoving(rows, cols, r+1, c, threshold, visted) + \
                self.countMoving(rows, cols, r, c-1, threshold, visted) + \
                self.countMoving(rows, cols, r, c+1, threshold, visted) + \
                1
        
        
    def addNum(self, num):
        num_count = 0
        while num != 0:
            num_count += num%10
            num //= 10
        return num_count
            
a = Solution()
b = a.movingCount(5,10,10)
print b       