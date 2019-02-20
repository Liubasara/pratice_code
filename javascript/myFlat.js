const arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]

function flat (arr) {
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

flat(arr)