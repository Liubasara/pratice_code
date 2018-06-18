# -*- coding:utf-8 -*-
class Solution:
    def Permutation(self, ss):
        # write code here
        lis = []
        real_lis = []
        if len(ss) == 1:
            print 'result:',ss
            return [ss]
        if len(ss) == 0:
            return []
        for i in range(len(ss)):
            print "ss[0:i]+ss[i+1:]:",ss[0:i]+ss[i+1:]
            print "------------------------------------------------"
            for j in self.Permutation(ss[0:i] + ss[i+1:]):
                print "lis:",lis
                print 'ss[i]:',ss[i]
                print 'j:',j
                lis.append(ss[i]+j)
                print 'ss[i]+j:',ss[i]+j
                print "lis:",lis
                print "============================================"
        for i in lis:
            if i not in real_lis:
                real_lis.append(i)
        return real_lis
        
if __name__ == "__main__":
    a = Solution()
    string = 'str'
    print a.Permutation(string)
        