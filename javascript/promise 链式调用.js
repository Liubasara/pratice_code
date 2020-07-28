// 1. 实现一个函数实现 chain().eat().sleep(5).work().eat().sleep(5).work().eat()
function chain() {
  const list = []
  // let doQuene = Promise.resolve()
  setTimeout(async () => {
    for (let i = 0; i < list.length; i++) {
      // doQuene = doQuene.then(() => {
      //   return new Promise(resolve => {
      //     resolve(list[i].fn())
      //   })
      // })
      if (list[i].type !== 'sleep') {
        list[i].fn()
      } else {
        await list[i].fn()
      }
    }
  }, 0)
  const obj = {
    eat: () => {
      list.push({
        type: 'eat',
        fn: () => { console.log('eat') }
      })
      return obj
    },
    work: () => {
      list.push({
        type: 'work',
        fn: () => { console.log('work') }
      })
      return obj
    },
    sleep: (time) => {
      list.push({
        type: 'sleep',
        fn: () => new Promise((resolve) => {
          setTimeout(() => { resolve() }, time * 1000)
        })
      })
      return obj
    }
  }
  return obj
}

chain().eat().work().sleep(5).work().eat().sleep(5).work().eat()

// 2. 实现 new Quene().task(1000, () => {console.log(1)}).task(6000, () => {console.log(2)}).task(1000, () => {console.log(3)}).start() 的链式调用

function Quene() {
  this.quene = []
}


Quene.prototype.task = function (time, callback) {
  this.quene.push({ time, callback })
  return this
}

Quene.prototype.start = function () {
  const queue = this.quene

  // let doQuene = Promise.resolve()
  // for (let i = 0; i < queue.length; i++) {
  //   doQuene = doQuene.then(() => {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         resolve(queue[i].callback())
  //       }, queue[i].time)
  //     })
  //   })
  // }
  async function fn() {

    for (let i = 0; i < queue.length; i++) {
      await new Promise((resolve, rejected) => {
        setTimeout(() => { resolve(queue[i].callback()) }, queue[i].time)
      })
    }
  }
  fn()
}

new Quene()
  .task(1000, () => {
    console.log(1)
  })
  .task(6000, () => {
    console.log(2)
  })
  .task(1000, () => {
    console.log(3)
  })
  .start()
