/**
 * javascript 路径分辨
 * @param {string} path
 * @param {string}
 */
function resolve (path) {
  let pathArr = path.split(/(https?:\/\/[\w\.\-]*\/)/).filter(item => !!item)
  if (!pathArr || pathArr.length < 2) return path
  const [head, tail] = pathArr
  const tailRes = []
  let tmp = tail.split('/')
  let p = 0
  while (p < tmp.length) {
    if (tmp[p] !== '.' && tmp[p] !== '..') {
      tailRes.push(tmp[p])
      p++
    } else if (tmp[p] === '.') {
      p++
    } else if (tmp[p] === '..') {
      tailRes.pop()
      p++
    }
  }
  return head + tailRes.join('/')
}

console.log(resolve('http://www.baidu.com/a/b/c/./d')) // http://www.baidu.com/a/b/c/d
console.log(resolve('http://www.baidu.com/a/b/c/../d')) // http://www.baidu.com/a/b/d
console.log(resolve('http://www.baidu.com/a/b/c/../../d')) // http://www.baidu.com/a/d
