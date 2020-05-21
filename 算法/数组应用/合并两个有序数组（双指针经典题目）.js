/**
给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

示例: 输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6], n = 3
输出: [1,2,2,3,5,6]
*/

const merge = function(nums1, m, nums2, n) {
  let p1 = m - 1, p2 = n - 1, target = m + n - 1
  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[target] = nums1[p1]
      p1--
      target--
    } else {
      nums1[target] = nums2[p2]
      p2--
      target--
    }
  }
  // 如果提前遍历完的是 nums1 的有效部分，剩下的是 nums2。那么这时意味着 nums1 的头部空出来了，直接把 nums2 整个补到 nums1 前面去即可
  while (p2 >= 0) {
    nums1[target] = nums2[p2]
    p2--
    target--
  }
  return nums1
}

merge([1,2,3,0,0,0], 3, [2,5,6], 3)
