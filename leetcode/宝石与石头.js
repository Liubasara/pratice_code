/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function(J, S) {
  let gemCount = 0
  for (let i of S) {
    if (J.indexOf(i) !== -1) {
      gemCount++
    }
  }
  return gemCount
}


console.log(numJewelsInStones('aA', 'aAAbbbb'))