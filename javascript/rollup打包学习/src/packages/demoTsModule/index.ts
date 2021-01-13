import * as _ from 'lodash'

class Demo {
  msg: string
  constructor (msg: string) {
    this.msg = msg
  }
  async sayMsg () : Promise<number> {
    await Promise.resolve('12qqqq356565')
    console.log(this.msg)
    console.log(_.concat([1, 2, 3], 3))
    console.log('test')

    return 8989891010101
  }
}

export default Demo
