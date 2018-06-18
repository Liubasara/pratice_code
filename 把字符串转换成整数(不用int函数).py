# -*- coding:utf-8 -*-
class Solution:
    def StrToInt(self, s):
        # write code here
        s_ascii = []
        result = []
        flag = False
        sum = 0
        if len(s) < 2:
            return 0
        if s[0] == '+':
            s = s[1:]
        if s[0] == '-':
            flag = True
            s = s[1:]
        for i in s[0:]:
            current_ascii = ord(i)
            if current_ascii < 48 or current_ascii > 57:
                return 0
            s_ascii.append(current_ascii)
            
        for i in s_ascii:
            result.append(i-48)
        for i in result:
            sum *= 10
            sum += i
        if flag:
            sum = -sum       
        return sum
            
a = Solution()
b = a.StrToInt('+123')
print type(b)