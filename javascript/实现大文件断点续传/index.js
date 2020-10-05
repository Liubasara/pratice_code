/**
 * 参考资料： https://github.com/xbc30/large-file-upload/blob/master/server/app/controller/home.js
 */
const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const multipart = require('connect-multiparty')

/** ========= 常规变量 Start ======= */
const uploadPath = path.join(__dirname, 'uploads')
/** =========常规变量 End ========== */

const server = express()
const multipartyMiddleware = multipart()

server.use(bodyParser.json({ limit: '200mb' }))
server.use(bodyParser.urlencoded({ extended: true }))

/** ====== 静态文件 ======*/
server.use('/assets', express.static(path.join(__dirname, 'src', 'assets')))

server.get('', function (req, res) {
  res.sendFile(path.resolve('src', './index.html'))
})

server.post('/hashCheck', function (req, res) {
  // 校验文件 hash 值，返回 type
  // 返回数据中 res.data.type == 2(文件已上传过，未合并) 1(断点续传) 0(从未上传) 3(已上传并合并过)
  const { body: { md5, chunkTotal, chunkSize, fileName } } = req
  const fileFragmentPath = path.join(uploadPath, `${md5}-${chunkSize}`, '/')
  const filePath = path.join(uploadPath, fileName)
  if (fs.existsSync(filePath)) {
    res.status(200).send({
      data: {
        type: 3
      }
    })
    return
  }
  if (fs.existsSync(fileFragmentPath)) {
    // 目录已存在，判断目录中的文件是否已经上传完
    const chunks = fs.readdirSync(fileFragmentPath)
    if (chunks.length === chunkTotal && chunkTotal !== 0) {
      // 目录中的文件数目与需要的一致，则说明已经上传完毕
      res.status(200).send({
        data: {
          type: 2
        }
      })
    } else {
      // 分片文件尚未完全上传完
      const index = []
      chunks.forEach(item => {
        const reg = new RegExp(`${md5}-${chunkSize}` + '-(\\d*)\\.tmpfile')
        const i = item.match(reg)
        i && index.push(+i[1])
      })
      res.status(200).send({
        data: {
          type: 1,
          index
        }
      })
    }
  } else {
    // 目录未存在
    res.status(200).send({
      data: {
        type: 0
      }
    })
  }
})

server.post('/upload', multipartyMiddleware, function (req, res) {
  // 上传接口，将分片文件保存在服务器
  const { body: { chunkSize, hash, index, name, totalNum, totalSize } } = req
  const fileFragmentPath = path.join(uploadPath, `${hash}-${totalSize}`, '/')
  !fs.existsSync(fileFragmentPath) && fs.mkdirSync(fileFragmentPath) // 若该临时目录不存在，则创建
  const { files: { file } } = req
  // file.path 作为是 express 接收到文件以后默认存储的临时路径
  const fileReadStream = fs.createReadStream(file.path)
  const fileWriteStream = fs.createWriteStream(path.join(fileFragmentPath, `${hash}-${totalSize}-${index}.tmpfile`))
  fileReadStream.on('end', () => {
    // 删除临时路径
    fs.unlinkSync(file.path)
  })
  fileReadStream.pipe(fileWriteStream)
  res.sendStatus(201)
})

server.post('/mergeChunks', async function (req, res) {
  // 等所有上传完毕后进行合并
  const { body: { md5, fileName, chunkSize } } = req
  const fileFragmentPath = path.join(uploadPath, `${md5}-${chunkSize}`, '/')
  if (!fs.existsSync(fileFragmentPath)) {
    res.status(400).send('未找到合并文件，请重新上传')
    return
  }
  const chunks = fs.readdirSync(fileFragmentPath)
  const chunksPathList = chunks
   .map(chunkName => path.join(fileFragmentPath, chunkName))
   .sort((a, b) => {
    // 将 ${md5}-${chunkSize}-${index} 格式命名的分片文件列表按照 index 从小到大进行排序，方便下一步进行合并
    const aIndex = +a.match(new RegExp(`${md5}-${chunkSize}` + '-(\\d*)\\.tmpfile'))[1]
    const bIndex = +b.match(new RegExp(`${md5}-${chunkSize}` + '-(\\d*)\\.tmpfile'))[1]
    return aIndex - bIndex
  })
  const mergeFilePath = path.join(uploadPath, fileName)
  // fs.openSync(mergeFilePath, 'w') // 创建一个空文件
  await streamMerge(chunksPathList, mergeFilePath)
  // 合并完成后删除目录
  delDir(fileFragmentPath)
  res.sendStatus(200)
})

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

/**
 * 清空并删除某个文件夹
 * @param {string} folderPath 需删除文件夹路径
 * @param {Array<string>} excludePaths 不删除文件路径集合
 */
function delDir (targetPath, excludePaths) {
  let files = []
  if (fs.existsSync(targetPath)) {
    files = fs.readdirSync(targetPath)
    files.forEach(file => {
      const curPath = targetPath + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath) // 递归删除文件夹
      } else {
        fs.unlinkSync(curPath) // 删除文件
      }
    })
    !(excludePaths && excludePaths.includes(targetPath)) && fs.rmdirSync(targetPath)
  }
}

const client = server.listen(3000, function () {
  console.log(`Listening on port ${client.address().port}`)
})
