const fs = require('fs')

/**
 * 基于流将多个文件合并到一个文件中
 * 参考：https://zhuanlan.zhihu.com/p/131627741
 * @param {Array<string>} chunksPathList 
 * @param {string} mergeFilePath 
 */
async function streamMerge (chunksPathList, mergeFilePath) {
  const fileWriteStream = fs.createWriteStream(mergeFilePath)
  const chunksLen = chunksPathList.length
  for (let i = 0; i < chunksLen; i++) {
    const currentReadStream = fs.createReadStream(chunksPathList[i])
    await new Promise((resolve, reject) => {
      currentReadStream.pipe(fileWriteStream, { end: false })
      currentReadStream.on('end', () => {
        resolve()
      })
      currentReadStream.on('error', (err) => {
        fileWriteStream.close()
        reject(err)
      })
    })
  }
  return
}

// demo: node 合并文件streamMerge.js ./streamSplitTempDir
const path = require('path')
const dirPath = path.resolve(__dirname, process.argv[2])
const chunksList = fs.readdirSync(dirPath)
  .map(chunkName => path.join(dirPath, chunkName))
  .sort((a, b) => {
    const aIndex = +a.match(new RegExp('\\w*tmpfile-(\\d*)'))[1]
    const bIndex = +b.match(new RegExp('\\w*tmpfile-(\\d*)'))[1]
    return aIndex - bIndex
  })
const filePath = path.join(dirPath, 'mergeFile.png')
streamMerge(chunksList, filePath)
