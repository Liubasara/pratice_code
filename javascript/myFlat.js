const arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]

// 方法1 利用reduce和递归进行展平
function flat1 (arr) {
  function toFlat (acc, current) {
    if (Object.prototype.toString.call(current) === '[object Array]') {
      current.forEach(item => {
        toFlat(acc, item)
      })
    } else {
      if (!acc.includes(current)) {
        acc.push(current)
      }
    }
    return acc
  }
  return arr.reduce(toFlat, []).sort((value1, value2) => value1 - value2)
}

// 方法2 利用Array.prototype.concat来深层遍历展平
function flat2 (arr) {
  let result = Array.prototype.concat.apply([], arr) // 将数组挨个参数传入, 进行展平, 二维数组在这一步已经展平了
  while (result.some(item => Object.prototype.toString.call(item) === '[object Array]')) {
    result = Array.prototype.concat.apply([], result) // 若还有数组元素, 则继续通过concat展平
  }
  return result
}

flat1(arr)
flat2(arr)