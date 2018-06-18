# -*- coding:utf-8 -*-
class Solution:
    def ReverseSentence(self, s):
        # write code here
        str_list = s.split(' ')
        str_list.reverse()
        res = ' '.join(str_list)
        return res

if __name__ == "__main__":        
    a = "student a am i"
    b = Solution()
    c = b.ReverseSentence(a)
    print c