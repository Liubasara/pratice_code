function DragScale(ele, params) {
  this.ele = ele
  this.autoHeight = null // 图片原始高度
  this.autoWidth = null // 图片原始宽度
  this.currentX = 0 // 鼠标X坐标
  this.currentY = 0 // 鼠标Y坐标
  this.flag = false
  const defaultParams = {
    zoomVal: 1, // 初始缩放比例
    minZoomVal: 0.2, // 最小缩放比例
    left: 0, // 初始左边距
    top: 0, // 初始上边距
    moveVal: 50, // 上下左右移动距离
    wheelVal: 1200, // 放大缩小的值
    wrapHeight: 530, // 遮罩初始高度
    wrapWidth: 900, // 遮罩初始宽度
  }
  this.params = { ...defaultParams, ...params }
  setTimeout(this.initImage(), 100)
}

DragScale.prototype.initImage = function () {
  // 图片初始居中显示
  const ele = this.ele
  this.autoHeight = ele.offsetHeight
  this.autoWidth = ele.offsetWidth
  ele.parentNode.style.height = `${this.params.wrapHeight}px`
  ele.parentNode.style.width = `${this.params.wrapWidth}px`
  // 高度不够
  if (this.autoHeight >= this.params.wrapHeight) {
    ele.style.height = `${this.params.wrapHeight}px`
    ele.style.marginTop = '0'
    const nowImageWidth = ele.offsetWidth
    const paddingCountX = Math.floor(
      (this.params.wrapWidth - nowImageWidth) / 2
    )
    if (paddingCountX > 0) {
      ele.style.marginLeft = `${paddingCountX}px`
    } else {
      ele.style.marginLeft = '0'
    }
    // 宽度不够
  } else if (this.autoWidth >= this.params.wrapWidth) {
    ele.style.width = `${this.params.wrapWidth}px`
    ele.style.marginLeft = '0'
    const nowImageHeight = ele.offsetHeight
    const paddingCountY = Math.floor(
      (this.params.wrapHeight - nowImageHeight) / 2
    )
    if (paddingCountY > 0) {
      ele.style.marginTop = `${paddingCountY}px`
    } else {
      ele.style.marginTop = '0'
    }
    // 宽高都够
  } else {
    const nowImageHeight = ele.offsetHeight
    const nowImageWidth = ele.offsetWidth
    const paddingCountY = Math.floor(
      (this.params.wrapHeight - nowImageHeight) / 2
    )
    const paddingCountX = Math.floor(
      (this.params.wrapWidth - nowImageWidth) / 2
    )
    ele.style.marginTop = `${paddingCountY}px`
    ele.style.marginLeft = `${paddingCountX}px`
  }
}

DragScale.prototype.resetSize = function () {
  const ele = this.ele
  this.params.zoomVal = 1
  ele.style.transform = 'scale(1)'
  ele.style.width = 'auto'
  ele.style.height = 'auto'
  ele.style.left = 0
  ele.style.top = 0
  if (
    this.autoHeight >= this.params.wrapHeight &&
    this.autoWidth <= this.params.wrapWidth
  ) {
    ele.style.marginTop = 0
    const nowImageWidth = ele.offsetWidth
    const paddingCountX = Math.floor(
      (this.params.wrapWidth - nowImageWidth) / 2
    )
    ele.style.marginLeft = `${paddingCountX}px`
  }
  if (
    this.autoWidth >= this.params.wrapWidth &&
    this.autoHeight <= this.params.wrapHeight
  ) {
    ele.style.marginLeft = 0
    const nowImageHeight = ele.offsetHeight
    const paddingCountY = Math.floor(
      (this.params.wrapHeight - nowImageHeight) / 2
    )
    ele.style.marginTop = `${paddingCountY}px`
  } else if (
    this.autoHeight > this.params.wrapHeight &&
    this.autoWidth > this.params.wrapWidth
  ) {
    ele.style.marginLeft = '0'
    ele.style.marginTop = '0'
  }
}
DragScale.prototype.scale = function (mark) {
  const wheelVal = [
    event.wheelDelta,
    this.params.wheelVal,
    -this.params.wheelVal,
  ][mark]
  this.params.zoomVal += wheelVal / 1200
  if (this.params.zoomVal < this.params.minZoomVal)
    this.params.zoomVal = this.params.minZoomVal
  // this.ele.css('transform', `scale(${this.params.zoomVal})`)
  this.ele.style.transform = `scale(${this.params.zoomVal})`
}
DragScale.prototype.getCss = function (key) {
  // 注意：此处为了解决当 style 值为 auto 时，返回 auto 的问题
  const win = this.ele.ownerDocument.defaultView
  // null 的意思是不返回伪类元素
  return win.getComputedStyle(this.ele, null)[key]
}
DragScale.prototype.drag = function (callback) {
  const _that = this
  if (this.getCss('left') !== 'auto') {
    this.params.left = this.getCss('left') || '0px'
  }
  if (this.getCss('top') !== 'auto') {
    this.params.top = this.getCss('top') || '0px'
  }
  // o是移动对象
  this.ele.addEventListener('mousedown', function (event) {
    _that.flag = true
    if (!event) {
      event = window.event
      //防止IE文字选中
      _that.ele.onselectstart = function () {
        return false
      }
    }
    const e = event
    _that.currentX = e.clientX
    _that.currentY = e.clientY
  })
  document.onmouseup = function () {
    _that.flag = false
    if (_that.getCss('left') !== 'auto') {
      _that.params.left = _that.getCss('left') || '0px'
    }
    if (_that.getCss('top') !== 'auto') {
      _that.params.top = _that.getCss('top') || '0px'
    }
  }
  document.onmousemove = function (event) {
    const e = event ? event : window.event
    if (_that.flag) {
      const nowX = e.clientX
      const nowY = e.clientY
      const disX = nowX - _that.currentX
      const disY = nowY - _that.currentY
      _that.ele.style.left = `${parseInt(_that.params.left) + disX}px`
      _that.ele.style.top = `${parseInt(_that.params.top) + disY}px`
      // _that.ele.css('left', `${parseInt(_that.params.left) + disX}px`)
      // _that.ele.css('top', `${parseInt(_that.params.top) + disY}px`)
      if (typeof callback === 'function') {
        callback(
          (parseInt(_that.params.left) || 0) + disX,
          (parseInt(_that.params.top) || 0) + disY
        )
      }
      if (event.preventDefault) {
        event.preventDefault()
      }
      return false
    }
  }
}
DragScale.prototype.moveUp = function () {
  // this.ele.css('top', `${parseInt(this.params.top) - this.params.moveVal}px`);
  this.ele.style.top = `${parseInt(this.params.top) - this.params.moveVal}px`
  this.params.top = parseInt(this.params.top) - this.params.moveVal
}
DragScale.prototype.moveDown = function () {
  // this.ele.css('top', `${parseInt(this.params.top) + this.params.moveVal}px`);
  this.ele.style.top = `${parseInt(this.params.top) - this.params.moveVal}px`
  this.params.top = parseInt(this.params.top) + this.params.moveVal
}
DragScale.prototype.moveLeft = function () {
  // this.ele.css('left', `${parseInt(this.params.left) - this.params.moveVal}px`);
  this.ele.style.left = `${parseInt(this.params.left) - this.params.moveVal}px`
  this.params.left = parseInt(this.params.left) - this.params.moveVal
}
DragScale.prototype.moveRight = function () {
  // this.ele.css('left', `${parseInt(this.params.left) + this.params.moveVal}px`);
  this.ele.style.left = `${parseInt(this.params.left) - this.params.moveVal}px`
  this.params.left = parseInt(this.params.left) + this.params.moveVal
}
