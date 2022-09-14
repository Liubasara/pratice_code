window.test = (() => {
  const firstElm = document.querySelector('#video-wrap')
  firstElm.style.cssText += `display: flex;flex-direction: column;`
  const secElm = document.querySelector('#video-root')
  secElm.style.cssText += `flex: 1; min-height: 100%; width: 100%; display: flex; flex-direction: column;`
  console.log('------------------------------------------------\n')
  console.log('请在 #video-root 的 shadow-root 下找到 class="werbung-video" 的元素并作为参数1传入 window.test.exec ')
  console.log('请在 #video-root 的 shadow-root 下找到 id="video-wrapper" 的元素并作为参数2传入 window.test.exec ')
  console.log('请在 #video-root 的 shadow-root 下找到 id="video-player" 的元素并作为参数3传入 window.test.exec ')
  console.log('请在 #video-root 的 shadow-root 下找到 id="video-player" 的元素并作为参数3传入 window.test.exec ')
  console.log('请在 #video-root 的 shadow-root 下找到 <canvas> 元素并作为参数4传入 window.test.exec ')
  console.log('或者在 element panel 上倒序点击上述元素后，执行 window.test.startExec() ')
  console.log('------------------------------------------------\n')

  const exec = (elm1, elm2, elm3, elm4) => {
    if (!elm1) {
      throw Error('请在 #video-root 的 shadow-root 下找到 class="werbung-video" 的元素并传入')
    }
    elm1.style.cssText += `flex: 1; min-height: 100%; width: 100%; display: flex; flex-direction: column;`
    if (!elm2) {
      throw Error('请在 #video-root 的 shadow-root 下找到 id="video-wrapper" 的元素并传入')
    }
    elm2.style.cssText += `height: 100%; width: 100%; flex: 1;`
    if (!elm3) {
      throw Error('请在 #video-root 的 shadow-root 下找到 id="video-player" 的元素并传入')
    }
    elm3.style.cssText += `width: 100%;height: 100%;`
    if (!elm4) {
      throw Error('请在 #video-root 的 shadow-root 下找到 <canvas> 的元素并传入')
    }
    elm4.style.cssText += `width: 100%;height: 100%;`
  }
  return {
    startExec () {
      const a = window.$0
      const b = window.$1
      const c = window.$2
      const d = window.$3
      exec(a, b, c, d)
    },
    exec
  }
})()