const fs = require('fs')
const path = require('path')

async function streamSplit (filePath) {
  const dirName = path.resolve(filePath, '../', 'streamSplitTempDir')
  !fs.existsSync(dirName) && fs.mkdirSync(dirName)
  const fileReadStream = fs.createReadStream(filePath, {
    // 缓存区(分片文件)大小，默认为 64kb
    highWaterMark: 64 * 1024
  })
  const indexs = []
  fileReadStream.on('data', function (data) {
    const len = indexs.length
    console.log(len)
    fs.writeFile(path.join(dirName, `tmpfile-${len}`), data, { flag: 'w' }, (err) => {
      if (err) throw err
    })
    indexs.push(len)
  })
}

// demo：node 将文件切割成分片streamSplit.js ./test.png
const filePath = path.join(__dirname, process.argv[2])
console.log(filePath)
streamSplit(filePath)
