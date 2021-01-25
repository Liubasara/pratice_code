class Demo {
  msg: string
  constructor (msg: string) {
    this.msg = msg
  }
  async sayMsg () : Promise<number> {
    console.log(this.msg)
    console.log('=============Demo Msg==========')
    await Promise.resolve('123')
    return 8989891010101
  }
}

export default Demo
