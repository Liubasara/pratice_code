/** 
  * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
  
  * 输入: "babad"
  * 输出: "bab"
  * 注意: "aba" 也是一个有效答案。
  
  * 输入: "cbbd"
  * 输出: "bb"
*/

/**
 * @param {string} s
 * @return {string}
 */
 
function reverseString (s) {
  var res = Array.prototype.reverse.call(s.split('')).join('')
  return res
}
 
// my answer: 暴力解法
var longestPalindrome = function(s) {
  // input: 'a'
  if (s.length === 1) {
    return s
  }
  var res = ''
  var slen = s.length
  for (var i = 0; i < slen; i++) {
    for (var j = i + 1; j < slen; j++) {
      var tmp = s.slice(i, j + 1)
      if ( tmp.length > res.length && tmp === reverseString(tmp)) {
        res = tmp
      }
    }
  }
  // input: 'ac'
  if (res.length === 0) {
    return s.slice(0, 1)
  }
  return res
};

var hey = longestPalindrome("civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth")
console.log(hey)

// 动态规划解法
var longestPalindrome = function(s) {
  var slen = s.length
  var curLen = 0
  if (slen <= 1) {
    return s
  }
  // dp[l][r] 表示子串 s[l, r]（包括区间左右端点）是否构成回文串，是一个二维布尔型数组。即如果子串 s[l, r] 是回文串，那么 dp[l][r] = true
  var dp = (function (size) {
    var res = []
    for (var i = 0; i < size; i++) {
      var tmp = new Array(size).fill(false)
      res[i] = tmp
    }
    return res
  })(slen)
  longestL = 1
  res = s[0]
  // 因为只有 1 个字符的情况在最开始做了判断
  // 左边界一定要比右边界小，因此右边界从 1 开始
  for (var r = 1;r < slen; r++) {
    for (var l = 0;l < r; l++) {
      // 状态转移方程：如果头尾字符相等并且中间也是回文
      // 在头尾字符相等的前提下，如果收缩以后不构成区间（最多只有 1 个元素），直接返回 True 即可
      // 否则要继续看收缩以后的区间的回文性
      // 重点理解 or 的短路性质在这里的作用
      if (s[l] == s[r] && (r - l <= 2 || dp[l + 1][r - 1])) {
        dp[l][r] = true
        curLen = r - l + 1
        if (curLen > longestL) {
          longestL = curLen
          res = s.slice(l, r + 1)
        }
      }
    }
  }
  return res
}

