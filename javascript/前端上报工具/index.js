const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')

const server = express()

server.use(bodyParser.json({ limit: '200mb' }))
server.use(bodyParser.urlencoded({ extended: true }))

/** ====== 静态文件 ======*/
server.use('/autoUpload', express.static(path.join(__dirname, 'src', 'autoUpload')))

server.get('', function (req, res) {
  res.sendFile(path.resolve('src', './index.html'))
})

server.get('/3000waitingtime.js', function (req, res) {
  setTimeout(() => {
    res.sendFile(path.resolve('src/3000waitingtime.js'))
  }, 3000)
})

server.get('/style.css', function (req, res) {
  res.sendFile(path.resolve('src/style.css'))
})

function writeTimingLogFile (data, cb = null) {
  fs.writeFile('./timingData.log', 
  `------------${new Date().toLocaleString()}  捕获类型: ${data.uploadType || '无'}----------\n` +
  JSON.stringify(data, null, '  ') +
  '\n\n',
  {
    flag: 'a'
  }, function () {
    if (typeof cb === 'function') { cb() }
  })
}
/**===============性能数据接口===================== */
/**
 * 接收 application/x-www-form-urlencoded 类型数据
 */
server.post('/timingTestUrlEncoded', function (req, res) {
  const body = JSON.parse(Object.keys(req.body)[0])
  writeTimingLogFile(body)
  res.sendStatus(200)
})

server.get('/timingTestUrlEncoded', function (req, res) {
  const body = JSON.parse(req.query.performanceData)
  writeTimingLogFile(body)
  res.sendStatus(200)
})

/**
 * 接收 application/json 类型数据
 */
server.post('/timingTestJSON', function (req, res) {
  const body = req.body
  writeTimingLogFile(body)
  res.sendStatus(200)
})

const client = server.listen(3000, function () {
  console.log(`Listening on port ${client.address().port}`)
})
