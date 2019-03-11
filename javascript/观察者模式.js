function Pubsub () {
  // 用于存放需要监听的事件与方法的键值对
  this.handles = {}
}

Pubsub.prototype.on = function (type, handle) {
  // 传入事件类型的type和处理时间的handle函数
  if (!this.handles[type]) {
    this.handles[type] = []
  }
  this.handles[type].push(handle)
}

Pubsub.prototype.emit = function (...args) {
  // 激活事件, 通过传入参数获取事件类型
  let type = args.shift()
  if (!this.handles[type]) {
    return false
  }
  this.handles[type].forEach(fn => {
    fn.apply(this, args)
  })
}

Pubsub.prototype.remove = function (type, handle) {
  // 删除对应事件中的对应监听函数
  let handleList = this.handles[type]
  if (handleList) {
    let index = handleList.indexOf(handle)
    handleList.splice(index, 1)
  }
}

// test
// var dd = new Pubsub()
// var biu = function (...args) {console.log('biu~')}
// dd.on('newMessage', biu)
// dd.emit('newMessage', 'mySon')
// dd.remove('newMessage', biu)