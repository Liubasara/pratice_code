class Solution:
  # 160ms 题解实现
  def lengthOfLongestSubstring(self, s):
    ans = 0
    sHashDict = {}
    i = 0
    for j in range(len(s)):
      if sHashDict.__contains__(s[j]):
        i = max(sHashDict[s[j]], i)
      ans = max(ans, j - i + 1)
      sHashDict[s[j]] = j + 1
    return ans
    
  # 2604ms渣操
  def oldlengthOfLongestSubstring(self, s):
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
  print(a.lengthOfLongestSubstring("kewwke"))