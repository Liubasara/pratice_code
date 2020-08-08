window.onload = function () {
  console.log('加载成功')
  Promise.reject('Promise 错误监听')
  throw Error('手动报错')
}
