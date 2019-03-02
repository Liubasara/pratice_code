/**
 * @param {string} S
 * @return {number[]}
 */
var diStringMatch = function(S) {
  var start = 0
  var end = S.length
  var target = []
  for (i of S) {
    if (i === 'I') {
      target.push(start)
      start++
    } else {
      target.push(end)
      end--
    }
  }
  target.push(start)
  return target
}