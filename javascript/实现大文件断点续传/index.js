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

server.post('/upload', function (req, res) {
  res.sendStatus(201)
})

const client = server.listen(3000, function () {
  console.log(`Listening on port ${client.address().port}`)
})
