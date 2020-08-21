const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const { parseQueryString, parseCookieString } = require('./utils')

const server = express()

server.use(bodyParser.json({ limit: '200mb' }))
server.use(bodyParser.urlencoded({ extended: true }))

const USER_LIST = [
  { username: '123', password: '123' },
  { username: '234', password: '234' }
]
const USER_LOGIN_TOKEN = []

server.get('', function (req, res) {
  if (req.headers.cookie) {
    // 如果有 cookie，则直接返回当前 cookie
    const { token, username } = parseCookieString(req.headers.cookie)
    const { url: redirectUrl } = req.query
    if (USER_LOGIN_TOKEN.includes(token) && redirectUrl) {
      res.redirect(`http://${redirectUrl}/setToken?username=${username}&token=${token}`)
      return
    } else {
      res.sendFile(path.resolve('src', './auth.html'))
    }
  }
  res.sendFile(path.resolve('src', './auth.html'))
})

server.post('/validateToken', function (req, res) {
  const { body: { token } } = req
  if (!token) {
    res.sendStatus(401)
    return
  }
  ;(USER_LOGIN_TOKEN.includes(token) ? res.sendStatus(200) : res.sendStatus(401))
  return
})

server.post('/login', function (req, res) {
  const { body: { userInfo: { username, password }, url } } = req
  const { url: redirectUrl } = parseQueryString(url)
  if (username && password) {
    if (USER_LIST.find(item => item.username === username && item.password === password)) {
      // 生成 token
      let token = Math.random().toString(36).substr(2)
      USER_LOGIN_TOKEN.push(token)
      /** 5 分钟后过期，删除该 token */
      setTimeout(() => {
        ;(USER_LOGIN_TOKEN.indexOf(token) !== -1) && USER_LOGIN_TOKEN.splice(USER_LOGIN_TOKEN.indexOf(token), 1)
      }, 1000 * 60 * 60 * 5)
      /** 为认证页设置 cookie，单个网站登录，等于全部登录 */
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
      res.status(200).send({
        redirectUrl,
        username,
        token
      })
    } else {
      // 校验错误
      res.status(401).send('用户名密码错误')
    }
  } else {
    res.status(401).send('无用户名密码，认证错误')
  }
})

server.get('/logout', function (req, res) {
  res.clearCookie('username')
  res.clearCookie('token')
  const { username, token } = req.query
  ;(USER_LOGIN_TOKEN.indexOf(token) !== -1) && USER_LOGIN_TOKEN.splice(USER_LOGIN_TOKEN.indexOf(token), 1)
  res.sendStatus(200)
})

const client = server.listen(3000, function () {
  console.log(`auth system listening on port ${client.address().port}`)
})