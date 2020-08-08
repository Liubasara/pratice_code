/**
 * 使用方法：打开 QQ 空间，进入到日志页面，控制台复制粘贴下列指令即可
 */
(function () {
  var frameDocument = document.querySelector('.app_canvas_frame').contentWindow.document

  var task1 = function () {
    return new Promise((resolve, reject) => {
      let step1 = frameDocument.querySelector('[rel="list-more-menu-link"]')
      let step2 = frameDocument.querySelector('[rel="blog-delete-link"]')
      if (!step1 || !step2) {
        console.log('找不到')
        reject()
      }
      step1.click()
      step2.click()
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }

  var task2 = function () {
    return new Promise((resolve) => {
      document.querySelector('#delBlogFrame').contentDocument.querySelector('#btnConfirm').click()
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }

  var timer = setTimeout(function setTime () {
    task1().then(() => task2()).then(() => {
      timer = setTimeout(setTime, 2000)
    }).catch(e => {
      timer = setTimeout(setTime, 2000)
    })
  }, 0)
})()
