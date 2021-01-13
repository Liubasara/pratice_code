import * as _ from 'lodash'
import Demo from '../demoTsModule/index'
import Item from './item'

export default demoModule = async () => {
  await Promise.resolve('demo')
  console.log('Hi.I am a demo module.')
  console.log(_.concat([1, 2, 3], [5], 5, 6, 7))
  new Demo(56).sayMsg()
  new Item().sayHi()
}
