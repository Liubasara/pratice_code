import { concat } from 'lodash'
import Demo from '../demoTsModule/index'
import Item from './item'
import '../demoCssModule/index.css'

const demoModule = async function () {
  await Promise.resolve('demo')
  console.log('我不用嗓子说话')
  console.log(concat([1, 2, 3], [5], 5, 6, 7))
  new Demo('夜神夜神~').sayMsg()
  new Item().sayHi()
}

demoModule()
