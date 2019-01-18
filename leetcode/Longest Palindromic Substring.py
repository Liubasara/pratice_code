class Solution:
  def longestPalindrome(self, s):
    """
    :type s: str
    :rtype: str
    """
    str = ""
    for i in range(2*len(s)-1):
      if i%2 == 0:
        start = end = i//2
        while start>=0 and end<len(s) and s[start]==s[end]:
            start-=1
            end+=1
      else:
        start = (i-1) // 2
        end = (i+1) //2
        while start>=0 and end<len(s) and s[start]==s[end]:
            start-=1
            end+=1
      if len(str)<=(end-start-1):
        str=s[start+1:end]
    return str
    
  # 渣操, 超时了没过...
  def oldlongestPalindrome(self, s):
    """
    :type s: str
    :rtype: str
    """
    res = ""
    for point1 in range(len(s)):
      for point2 in range(point1, len(s) + 1):
        tmp = list(s[point1:point2])
        tmp.reverse()
        if s[point1:point2] == ''.join(tmp):
          if point2 - point1 > len(res):
            res = s[point1:point2]
    return res
      
if __name__ == "__main__":
  a = Solution()
  print(a.longestPalindrome('babad')) # expect output: "bab"