function compareVersion (a, b) {
  let arrA = a.split(/^v?([^\s]*)\.([^\s]*)\.([^\s]*)/).filter(item => !!item)
  let arrB = b.split(/^v?([^\s]*)\.([^\s]*)\.([^\s]*)/).filter(item => !!item)
  if (arrA.length !== arrB.length) {
    throw Error('版本位数不一样无法比较')
  }
  // 0 代表相等，1 代表 a > b，2 代表 b > a
  let flag = [0, 0, 0]
  for (let i = 0; i < 3; i++) {
    if (arrA[i] === arrB[i]) {
      flag[i] = 0
      continue
    }
    let numA = Number(arrA[i])
    let numB = Number(arrB[i])
    if (!Number.isNaN(numA) && !Number.isNaN(numB)) {
      // 纯数字情况
      if (numA > numB) {
        flag[i] = 1
      } else {
        flag[i] = 2
      }
    } else {
      // 包含有字母
      let numAarr = arrA[i].split('')
      let numBarr = arrB[i].split('')
      if (numAarr.length !== numBarr.length) throw Error(`第${i + 1}位版本号长度不一致，无法比较`)
      for (let j = 0; j < numAarr.length; j++) {
        if (numAarr[j].charCodeAt() > numBarr[j].charCodeAt()) {
          flag[i] = 1
          break
        } else if (numAarr[j].charCodeAt() < numBarr[j].charCodeAt()) {
          flag[i] = 2
          break
        }
      }
    }
  }
  if (flag.filter(item => item === 0).length === 3) return '两者版本相同'
  if (flag[0] === 1 || flag[0] === 0 && flag[1] === 1 || flag[0] === 0 && flag[1] === 0 && flag[2] === 1) {
    return '版本 ' + a + ' 比版本 ' + b + ' 大'
  } else {
    return '版本 ' + a + ' 比版本 ' + b + ' 小'
  }
}

console.log(compareVersion('v3.2c.200', 'v3.2c.13'))
