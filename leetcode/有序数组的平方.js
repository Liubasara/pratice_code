/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function(A) {
  return A.map(item => item * item).sort((value1, value2) => value1 - value2)
}