# -*- coding:utf-8 -*-
class Solution:
    # 返回对应char
    s = ""
    def FirstAppearingOnce(self):
        # write code here
        res = filter(lambda c:self.s.count(c) == 1, self.s)
        return res[0] if res else "#"
    def Insert(self, char):
        # write code here
        self.s += char