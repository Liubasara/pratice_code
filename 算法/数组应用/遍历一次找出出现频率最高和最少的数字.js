/**
 * 用遍历一次的方式找出数组中出现得最多和最少的数字
 * @param {number[]} arr
 * @returns {{frequentlyNum: number; lessNum: number;}}
 */
function findLessAndFrequentlyNum (arr) {
  const len = arr.length
  const map = new Map()
  let p1 = 0
  let frequentlyNum = undefined
  let lessNum = undefined
  while (p1 < len) {
    const val = arr[p1]
    if (frequentlyNum === undefined) {
      frequentlyNum = val
    }
    if (lessNum === undefined) {
      lessNum = val
    }
    if (map.has(val)) {
      map.set(val, map.get(val) + 1)
      if (map.get(frequentlyNum) < map.get(val)) {
        frequentlyNum = val
      }
      if (map.get(lessNum) > map.get(val)) {
        lessNum = val
      }
    } else {
      map.set(val, 1)
      lessNum = val
    }
    p1++
  }
  return {
    lessNum: lessNum,
    frequentlyNum: frequentlyNum
  }
}

console.log(findLessAndFrequentlyNum([1,1,1,2,22,2,2,3,8]))
