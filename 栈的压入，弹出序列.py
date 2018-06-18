# -*- coding:utf-8 -*-
class Solution:
    def IsPopOrder(self, pushV, popV):
        # write code here
        stack = []
        result = False
        pushV.reverse()
        if pushV == popV:
            return True
        for pop_next in popV:
            while pushV:
                stack.append(pushV.pop())
                if stack[-1] == pop_next:
                    stack.pop()
                    break
            if stack[-1] == pop_next:
                stack.pop()
                continue

        if not stack:
            result = True
        return result



if __name__ == "__main__":
    a = [1,2,3,4,5]
    b = [4,5,3,1,2]
    wow = Solution()
    wow.IsPopOrder(a,b)
