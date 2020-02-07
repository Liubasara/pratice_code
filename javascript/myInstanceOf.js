function myInstanceOf (obj1, obj2) {
  if (!obj2.prototype) return false
  if (!obj1.__proto__) return false
  let tmp = obj1.__proto__
  while (tmp) {
    if (tmp === obj2.prototype) {
      return true
    } else if (tmp.__proto__) {
      tmp = tmp.__proto__
    } else {
      return false
    }
  }
}

/**
  简单版 https://juejin.im/post/5e24590ef265da3e152d27bc#heading-4
**/
const myInstanceOf2 = (left, right) => {
    let leftValue = left.__proto__
    let rightValue = right.prototype
    while(true) {
        if(leftValue === null) return false
        if(leftValue === rightValue) return true
        leftValue = leftValue.__proto__
    }
}