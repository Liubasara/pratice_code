# FIXME: 未完成
class Solution:
  def findMedianSortedArrays(self, nums1, nums2):
    """
    :type nums1: List[int]
    :type nums2: List[int]
    :rtype: float
    """
    lensum = len(nums1) + len(nums2)
    if lensum % 2 == 0 :
      # 长度为偶数，中位数为相加后除以二
      if nums2[0] > nums1[-1] or nums1[0] > nums2[-1]:
        # 两排序数组收尾相接
        if nums2[0] > nums1[-1]:
          nums1.extend(nums2)
          print(((nums1[int(lensum / 2) - 1] + nums1[int(lensum / 2) + 1 - 1]) / 2))
        if nums1[0] > nums2[-1]:
          nums2.extend(nums1)
          print(((nums2[int(lensum / 2) - 1] + nums2[int(lensum / 2) + 1 -1]) / 2))
      else:
        # 两排序数组各有大小
        pass
      
    else:
      # 长度为奇数
      if nums2[0] > nums1[-1] or nums1[0] > nums2[-1]:
        # 两排序数组收尾相接
        if nums2[0] > nums1[-1]:
          nums1.extend(nums2)
          print(nums1[int(lensum / 2 + 0.5) - 1])
        if nums1[0] > nums2[-1]:
          nums2.extend(nums1)
          print(nums2[int(lensum / 2 + 0.5) - 1])
      else:
        # 两排序数组各有大小
        pass
      
    
    
if __name__ == "__main__":
  a = Solution()
  a.findMedianSortedArrays([1, 3], [2])