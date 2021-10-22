
var firstUniqChar = function (s) {
  const arr = s.split('')
  const map = {}
  arr.forEach((str, index) => {
    if (map[str] === undefined) {
      map[str] = index
    } else {
      map[str] = -1
    }
  })

  let minIndex
  Object.keys(map).forEach((key) => {
    if (map[key] !== -1) {
      if (minIndex === undefined) {
        minIndex = map[key]
      } else if (map[key] < minIndex) {
        minIndex = map[key]
      }
    }
  })
  return minIndex === undefined ? ' ' : arr[minIndex]
}

console.log(firstUniqChar('loveleetcode'))
