const express = require('express')
const request = require('request')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')

const { parseCookieString } = require('./utils')

const server = express()

server.use(bodyParser.json({ limit: '200mb' }))
server.use(bodyParser.urlencoded({ extended: true }))

/** 解决跨域 */
server.use('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'testOssAuth.com') // 这个表示任意域名都可以访问，这样写不能携带cookie了。
  // res.header('Access-Control-Allow-Origin', 'http://www.baidu.com') // 这样写，只有www.baidu.com 可以访问。
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS') // 设置方法
  if (req.method === 'OPTIONS') {
    res.sendStatus(200) // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
  } else {
    next()
  }
})

const mapPort = {
  'ssoa': 3001,
  'ssob': 3002
}
const port = mapPort[process.env.NODE_ENV]

server.get('/setToken', function (req, res) {
  const { token, username } = req.query
  res.cookie('token', token, {
    maxAge: 5 * 60 * 1000, // 5分钟
    httpOnly: true,
    path: '/'
  })
  res.cookie('username', username, {
    maxAge: 5 * 60 * 1000, // 5分钟
    httpOnly: true,
    path: '/'
  })
  res.redirect('/')
})

server.get('/logout', function (req, res) {
  if (req.headers.cookie) {
    const { username, token } = parseCookieString(req.headers.cookie)
    res.clearCookie('username')
    res.clearCookie('token')
    request.get({
      url: `http://testOssAuth.com/logout?username=${username}&token=${token}`,
      method: 'GET'
    }, function (err, response, body) {
      res.status(200).send('已登出')
    })
  } else {
    res.status(200).send('未登录，无动作')
  }
})

server.get('', function (req, res) {
  if (req.headers.cookie) {
    const { token } = parseCookieString(req.headers.cookie)
    // 有 cookie，去验证该 cookie 作为 token 的可行性
    request.post(
      {
        url: 'http://testOssAuth.com/validateToken',
        method: 'POST',
        json: true,
        headers: {
          'content-type': 'application/json'
        },
        body: {
          token: token
        }
      },
      function (err, response, body) {
        if (err || response.statusCode === 401) {
          // token 过期，重新登录
          res.redirect(`http://testOssAuth.com/?url=${req.hostname}`)
          return
        }
        res.status(200).sendFile(path.resolve('src', './index.html'))
      }
    )
  } else {
    // 没有cookie，跳转到登录页面
    res.redirect(`http://testOssAuth.com/?url=${req.hostname}`)
  }
  
})

if (port) {
  const client = server.listen(port, function () {
    console.log(`auth system listening on port ${client.address().port}`)
  })
}
