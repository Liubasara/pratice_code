/**
 * @param {string[]} emails
 * @return {number}
 */
var numUniqueEmails = function(emails) {
  var emailArr = []
  for (let email of emails) {
    let splitByAt = email.split('@')
    let local = splitByAt[0].split('')
    let domain = splitByAt[1]
    // 处理本地字符串
    let dotIndex = local.indexOf('.')
    while (dotIndex !== -1) {
      local.splice(dotIndex, 1)
      dotIndex = local.indexOf('.')
    }
    let plusIndex = local.indexOf('+')
    local.splice(plusIndex, local.length - plusIndex)
    let targetEmail = local.join('') + '@' + domain
    if (emailArr.indexOf(targetEmail) === -1) {
      emailArr.push(targetEmail)
    }
  }
  return emailArr.length
}