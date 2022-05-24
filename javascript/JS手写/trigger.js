// 旧版, 兼容 IE , initEvent 已废弃
export const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

// 新版

/**
  参考链接：https://www.cnblogs.com/cwsb/p/10384219.html
  bubbles：事件是否支持冒泡，传递一个boolean类型的参数，默认值为false。
  cancelable：是否可取消事件的默认行为，传递一个boolean类型的参数，默认值为false。
  composed：事件是否会触发shadow DOM（阴影DOM）根节点之外的事件监听器，传递一个boolean类型的参数，默认值为false。（关于shadow DOM可以去看ChokCoco前辈的这篇文章，这里就不详说了，可能我会根据自己的理解也写一个关于shadow DOM的笔记）这个参数是InitEvent()中没有的新参数。
 */
export const trigger1 = (el, type, opt = {}) => {
  const e = new Event(type, {
    bubbles: true,
    cancelable: true,
    composed: true,
    ...opt
  })
  el.dispatchEvent(e)
}
