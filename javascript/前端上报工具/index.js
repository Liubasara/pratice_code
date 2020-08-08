const express = require('express')
const path = require('path')

const server = express()

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


const client = server.listen(3000, function () {
  console.log(`Listening on port ${client.address().port}`)
})
