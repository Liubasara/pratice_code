function test () {
  let findFlag = false
  let end = 187500
  let start = 0
  let num = Math.floor((end - start) / 2) + start
  while (!findFlag) {
    try {
        a.apply(null, new Array(num).fill(0))
        try {
          a.apply(null, new Array(num + 1).fill(0))
        } catch (e) {
          console.log(num)
          findFlag = true
        }
        start = num + 1
        num = Math.floor((end - start) / 2) + start
      } catch (e) {
        end = num - 1
        num = Math.floor((end - start) / 2) + start
      }
  }
  
}

function a () {}

test()