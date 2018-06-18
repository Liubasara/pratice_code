# -*- coding:utf-8 -*-
class Solution:
    def IsContinuous(self, numbers):
        # write code here
        if not numbers:
            return False
        numbers.sort()
        cou = numbers.count(0)
        small = cou
        big = small + 1
        numberOfGap = 0
        while big < len(numbers):
            if numbers[small] == numbers[big]:
                return False
            numberOfGap += numbers[big] - numbers[small] - 1
            small = big
            big += 1

        return True if cou >= numberOfGap else False

if __name__ == "__main__":        
    a = [1,0,0,0,5]
    b = Solution()
    c = b.IsContinuous(a)
    print c