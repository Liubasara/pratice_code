# -*- coding:utf-8 -*-
class Solution:
    def hasPath(self, matrix, rows, cols, path):
        # write code here
        # 本题实际考察的是回溯算法,升级版的八皇后题目
        if not matrix \
        or len(matrix) != rows*cols \
        or not path \
        or len(path) == 0 \
        or len(path) > len(matrix):
            return False
        visted = []
        for i in range(len(matrix)):
            visted.append(False)
        for j in range(rows):
            for i in range(cols):
                if self.dfs(matrix, rows, cols, path, i, j, 0, visted):
                    return True
        return False
        
    def dfs(self, matrix, rows, cols, path, i, j, k, visted):
        if i < 0 \
        or i >= cols \
        or j <0 \
        or j >= rows \
        or visted[i+j*cols] \
        or matrix[i+j*cols] != path[k]:
            return False
        if k == len(path)-1:
            return True
        visted[i+j*cols] = True
        if self.dfs(matrix, rows, cols, path, i, j-1, k+1, visted) \
        or self.dfs(matrix, rows, cols, path, i+1, j, k+1, visted) \
        or self.dfs(matrix, rows, cols, path, i, j+1, k+1, visted) \
        or self.dfs(matrix, rows, cols, path, i-1, j, k+1, visted):
            return True
        # 走到这一步需要回溯到上一个节点，且表示没有经过该点
        visted[i+j*cols] = False
        return False
        
a = Solution()
print a.hasPath("ABCESFCSADEE",3,4,"ABCCED")
