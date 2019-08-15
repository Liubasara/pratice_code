/**
给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
示例 1. 输入: 123 输出: 321
示例 2. 输入: -123 输出: -321
注意: 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2 ** 31,  2 ** (31 − 1)]。请根据这个假设，如果反转后整数溢出那么就返回 0。
 * @param {number} x
 * @return {number}
 */
// my answer
function justice (x) {
  if (x <= (-2) ** 31 || x >= (2 ** 31) - 1) {
    return 0
  }
  return x
}

var reverse = function(x) {
  var res = 0
  if (x === 0) {
    return 0
  }
  if (x < 0) {
    return justice(+('-' + (x + '').split('').slice(1).reverse().join('')))
  }
  return justice(+(x + '').split('').reverse().join(''))
};

// real Answer
// 使用while循环对x进行求余将每一位分离。
var reverse = function (x) {
    var re = 0;
    while (parseInt(x / 10)) {
        re = 10 * re + x - 10 * parseInt(x / 10);
        x = parseInt(x / 10);
    }
    if (re > 214748364 || re < -214748364) return 0;
    if ((re == 214748364 && x > 7) || (re == 214748364 && x < -8)) return 0;
    re = 10 * re + x;
    return re
};

console.log(reverse(1534236469))