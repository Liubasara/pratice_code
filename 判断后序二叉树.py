# -*- coding:utf-8 -*-
class Solution:
    def VerifySquenceOfBST(self, sequence):
        # write code here
        result = True
        if not sequence:
            return False
        
        index = 0
        root = sequence[-1]
        
        for i in sequence:
            index += 1
            if i > root:
                break
                
        for j in sequence[index:]:
            if j < root:
                return False
                
        return result
                
'''        left = True
        if index > 0:
            left = self.VerifySquenceOfBST(sequence[:index])
            
        right = True
        if index < len(sequence)-1:
            right = self.VerifySquenceOfBST(sequence[index+1:len(sequence)-1])
        
        return left and right'''
        
if __name__=="__main__":
    a = Solution()
    b = [7,4,6,5]
    print a.VerifySquenceOfBST(b)