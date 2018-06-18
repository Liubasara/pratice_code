# -*- coding:utf-8 -*-


class Solution:
    def minNumberInRotateArray(self, rotateArray):
        # write code here
        index1=0
        index2=len(rotateArray)-1
        indexmid=index1
        
        while rotateArray[int(index1)] >= rotateArray[int(index2)]:
            if index2-index1==1:
                indexmid=index2
                break
            
            indexmid=(index1+index2)/2
            if rotateArray[int(indexmid)] >= rotateArray[int(index1)]:
                index1 = indexmid
            if rotateArray[int(indexmid)] <= rotateArray[int(index2)]:
                index2 = indexmid
                
        return rotateArray[int(indexmid)]
        
        
if __name__=='__main__':
    a = [3,4,5,1,2]
    q= Solution()
    b=q.minNumberInRotateArray(a)
    print(b)
        
        
        
        