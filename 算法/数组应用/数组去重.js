/**
 * 数组下标判断法。遍历数组。利用indexOf判断元素的值是否与当前元素索引相等
 * 如相等则加入。
 * @param {Array<any>} arr 
 */
function unique1 (arr) {
  const len = arr.length
  const res = []
  for (let i = 0; i < len; i++) {
    if (arr.indexOf(arr[i]) === i) {
      res.push(arr[i])
    }
  }
  return res
}

/**
 * 不断的将数组最右边不重复的值推入新数组
 * 将原数组中重复元素的最后一个元素放入结果数组中
 * 如果发现判断元素与指针指向的值相等
 * 证明该判断元素不是数组中唯一的
 * 那么就继续往下判断（指针i下移，指针j回到i的下一位）
 * 直到j移到数组终点
 * 证明判断元素（指针i指向的元素）是数组中唯一的
 * 推入新数组
 * @param {Array<any>} arr 
 */
function unique2 (arr) {
  const len = arr.length
  const res = []
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[j] === arr[i]) {
        j = ++i
      }
    }
    res.push(arr[i])
  }
  return res
}

function test () {}

console.log(unique1([test, test, 1, 1, 3, '5', test, 8, 8]))
console.log(unique2([test, test, 1, 1, 3, '5', test, 8, 8]))
