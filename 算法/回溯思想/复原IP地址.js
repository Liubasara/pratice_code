/**
 * 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。
 * 
 * 有效的 IP 地址正好由四个整数（每个整数位于 0 到 255 之间组成），整数之间用 '.' 分隔。
 * 
 * 示例:
 * 输入: "25525511135"
 * 输出: ["255.255.11.135", "255.255.111.35"]
 */

/**
 * @param {string} s
 * @return {string[]}
 */
function restoreIpAddresses (s) {
  if (s.length < 4) return []
  if (s.length > 12) return []
  const path = []
  const cur = []
  const sArr = s.split('')
  function dfs (beginIndex) {
    if (cur.length === 4 && beginIndex === sArr.length) {
      path.push(cur.join('.'))
      return
    }
    for (let i = 1; i < 4; i++) {
      if (beginIndex + i > sArr.length) {
        break
      }
      const currentStrArr = sArr.slice(beginIndex, beginIndex + i)
      if (
          (currentStrArr.length > 1 && currentStrArr[0] === '0') || // 防止多位数字时 0 开头的地址
          +(currentStrArr.join('')) > 255 // 超出 ip 地址界限的
         )
      {
        continue
      }
      cur.push(currentStrArr.join(''))
      dfs(beginIndex + i)
      cur.pop()
    }
  }
  dfs(0)
  return path
}

// console.log(restoreIpAddresses("25525511135"))
console.log(restoreIpAddresses("111111111111111111111111111"))
