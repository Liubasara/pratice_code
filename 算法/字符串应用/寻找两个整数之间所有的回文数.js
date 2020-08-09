function allPalindrome (a, b) {
  const all = []
  for (let i = a; i <= b; i++) {
    let tmp = i
    let tmp1 = 0
    while (tmp > 0) {
      tmp1 = (tmp1 * 10) + (tmp % 10)
      tmp = Math.floor(tmp / 10)
    }
    if (tmp1 === i) {
      all.push(tmp1)
    }
  }
  return all
}

console.log(allPalindrome(1000, 9900))
