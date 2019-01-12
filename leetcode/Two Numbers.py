class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        hashmap = {}
        # for index, i in enumerate(nums):
            # hashmap[i] = index
        # for index, i in enumerate(nums):
            # if hashmap[target - i] and hashmap[target - i] != index:
                # print([index, hashmap[target - i]])
                # break
        for index, i in enumerate(nums):
            if hashmap.__contains__(target - i):
                return [hashmap[target - i], index]
            else:
                hashmap[i] = index
        return None
        
if __name__ == "__main__":
    a = Solution()
    b = a.twoSum([2, 7, 11, 15], 4)
    print(b)