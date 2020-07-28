const express = require('express')
const path = require('path')

const server = express()

/** ====== 静态文件 ======*/
server.use(express.static(path.join(__dirname, 'src')))

server.get('', function (req, res) {
  res.sendFile(path.resolve('src', './index.html'))
})

server.get('/jsonpApi', function (req, res) {
  let callbackName = req.query.callback
  res.setHeader('Content-Type', 'application/javascript')
  res.send(`setTimeout(() => ${callbackName}.call(null, 'success'), 100)`)
})


const client = server.listen(3000, function () {
  console.log(`Listening on port ${client.address().port}`)
})
