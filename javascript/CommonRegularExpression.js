// 常用正则表达式

// 百分数的正则表达式，接受 0% - 100% 之间，小数点精度为3位的字符串
var percent = /^(100|[1-9]?\d(\.\d\d?\d?)?)%$|0$/
// example
percent.test('-1%') // false
percent.test('101%') // false
percent.test('0.000%') // true
percent.test('99.999%') // true
percent.test('100.000%') // false
