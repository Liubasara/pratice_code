const { dependencies } = require('./package.json')
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import serve from 'rollup-plugin-serve'

console.log(commonjs())

export default {
  input: 'src/packages/demoJsModule/index.js',
  output: {
    file: 'lib/testJsBundle.js'
  },
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    babel({
      exclude: '**/node_modules/**',
      presets: [['@babel/preset-env', { modules: false }]],
      // plugins: ['@babel/plugin-transform-runtime'],
      // babelHelpers: 'runtime'
      babelHelpers: 'bundled'
    }),
    serve({
      open: false,
      port: 8888,
      contentBase: ''
    })
  ],
  // 告诉 rollup 不要将此 lodash 打包，而作为外部依赖
  // 专为 babel 的 runtime 模式打造，若是 bundled 模式，应该注释该项
  // external: (id) => {
  //   // if (id === 'lodash') {
  //   //   // 将 lodash 整个引入
  //   //   return false
  //   // }
  //   return new RegExp(`^(${Object.keys(dependencies).join('|')})`).test(id) || id === 'vue'
  // }
}