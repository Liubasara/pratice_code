/**
 * 随机生成一个十万以内的数然后转为字符串，比如99999就是九万九千九百九十九
 */
function transform (num) {
  let valueMap = new Map([
    ['0', '零'],
    ['1', '一'],
    ['2', '二'],
    ['3', '三'],
    ['4', '四'],
    ['5', '五'],
    ['6', '六'],
    ['7', '七'],
    ['8', '八'],
    ['9', '九']
  ])
  let unitMap = new Map([
    [2, '十'],
    [3, '百'],
    [4, '千'],
    [5, '万'],
    [6, '十'],
    [7, '百']
  ])
  let numArr = (num + '').split('')
  let strArr = []
  for (let i = 0; i <= numArr.length - 1; i++) {
    if (
      (!strArr[0] && numArr[i] === '0') ||
      (numArr[i] === '0' && (numArr[i + 1] === '0' || !numArr[i + 1]))
    ) {
      continue
    }
    strArr.push(valueMap.get(numArr[i]))
    if (numArr[i] !== '0' && unitMap.get(numArr.length - i)) {
      strArr.push(unitMap.get(numArr.length - i))
    }
    
  }
  return strArr.join('')
}

var randomNum = parseInt(Math.random() * (100000 - 1 + 1) + 1, 10)
console.log('randomNum' + randomNum)
console.log(transform(5123010))
