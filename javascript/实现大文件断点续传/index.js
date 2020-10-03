const express = require('express')
const path = require('path')
// const fs = require('fs')
const bodyParser = require('body-parser')

const server = express()

server.use(bodyParser.json({ limit: '200mb' }))
server.use(bodyParser.urlencoded({ extended: true }))

/** ====== 静态文件 ======*/
server.use('/assets', express.static(path.join(__dirname, 'src', 'assets')))

server.get('', function (req, res) {
  res.sendFile(path.resolve('src', './index.html'))
})

server.post('/hashCheck', function (req, res) {
  // TODO: 校验文件 hash 值，返回 type
  // 返回数据中 res.data.type == 2(文件已上传过) 1(断点续传) 0(从未上传)
  res.status(200).send({
    data: {
      type: 1,
      index: [88]
    }
  })
})

server.post('/upload', function (req, res) {
  // TODO: 上传接口，将分片文件保存在服务器
  res.sendStatus(201)
})

server.post('/mergeChunks', function (req, res) {
  // TODO: 等所有上传完毕后进行合并
  res.sendStatus(200)
})

const client = server.listen(3000, function () {
  console.log(`Listening on port ${client.address().port}`)
})
