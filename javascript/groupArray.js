// 根据一定个数分割数组

function group(array, subGroupLength) {
    var index = 0
    var newArray = []
    while(index < array.length) {
      newArray.push(array.slice(index, index += subGroupLength))
    }
    return newArray
}
