# FIXME: 2604ms渣操  有待优化
class Solution:
  def lengthOfLongestSubstring(self, s):
    """
    :type s: str
    :rtype: int
    """
    resList = ''
    targetList = ''
    count = 0
    tmp = 0
    tmp1 = 1
    if not s:
      return 0
    while tmp1 <= len(s) - 1:
      if s[tmp] == s[tmp1] or s[tmp1] in resList:
        resList = ''
        tmp += 1
        tmp1 = tmp + 1
        continue
      resList = s[tmp:tmp1 + 1]
      tmp1 += 1
      if len(resList) > len(targetList):
        targetList = resList
    return 1 if len(targetList) == 0 else len(targetList)
    
if __name__ == "__main__":
  a = Solution()
  print(a.lengthOfLongestSubstring("abcabcbc"))