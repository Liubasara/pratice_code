import axios from 'axios'

/* eslint-disable no-unused-vars */
const log = (...args) => {
  console.log(`>>>>> `, ...args, `<<<<<`)
}

// axios 配置
axios.defaults.timeout = 30000
axios.defaults.baseURL = host

// http request 拦截器
axios.interceptors.request.use(config => {
  // 请求头加上token
  // if (store.state.token) {
    // config.headers.Authorization = `JWT `
  // }
  return config
}, error => {
  return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(res => {
  // 后端响应数据里面自定义的错误
  // if (res.data && !res.data.success) {
  //   return Promise.reject(res.data)
  // }
  return res.data
}, error => {
  if (error.response === undefined) {
    log('系统内部错误')
    return Promise.reject(error.response || {})
  } else {
    if (error.response.status === 400) {
      const data = error.response.data
      let txt = ''
      Object.keys(data).forEach(key => {
        txt += data[key][0]
      })
      log(data)
    }
  }

  return Promise.reject(error.response.data)
})

export default axios