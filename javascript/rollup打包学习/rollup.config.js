const { dependencies } = require('./package.json')
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/packages/demoTsModule/index.ts',
  output: {
    file: 'lib/testTsBundle.js'
  },
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    babel({
      exclude: '**/node_modules/**',
      presets: [['@babel/preset-env', { modules: false }]],
      plugins: ['@babel/plugin-transform-runtime'],
      babelHelpers: 'runtime'
    })
  ],
  // 告诉 rollup 不要将此 lodash 打包，而作为外部依赖
  external: (id) => {
    // if (id === 'lodash') {
    //   // 将 lodash 整个引入
    //   return false
    // }
    return new RegExp(`^(${Object.keys(dependencies).join('|')})`).test(id) || id === 'vue'
  }
}