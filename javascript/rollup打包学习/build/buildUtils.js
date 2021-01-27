const rollup = require('rollup')
const { dependencies, name: packageName } = require('../package.json')
const chalk = require('chalk')
/**
 * rollup 相关插件
 */
const { babel } = require('@rollup/plugin-babel')
const { default: resolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('@rollup/plugin-typescript')
const postcss = require('rollup-plugin-postcss')
const { terser } = require('rollup-plugin-terser')
const serve = require('rollup-plugin-serve')

const IS_DEV = !!process.env.npm_config_dev
const IS_WATCH = !!process.env.npm_config_watch
const buildOptionRecords = []

const getFileSize = (code) => (code.length / 1024).toFixed(2) + 'KB' // 计算文件大小

/**
 * @param {Object} [options={}]
 * { inputPath: '', plugins: [], outputPath: '' }
 * @param {string} [options.inputPath] 入口路径
 * @param {Array<object>} [options.plugins] 拓展
 * @param {string} [options.outputFilePath] 生成文件路径
 * @param {string} [options.outputDirPath] 生成文件夹路径
 * @returns {Array<object>}
 */
const build = async function ({ inputPath = '', plugins = [], outputFilePath = '', outputDirPath = '' } = {}) {
  let inputOptions = {
    input: inputPath,
    plugins,
    // 告诉 rollup 不要将此 lodash 打包，而作为外部依赖
    // 专为 babel 的 runtime 模式打造，若是 bundled 模式，应该注释该项
    external: (id) => {
      // if (id === 'lodash') {
      //   // 将 lodash 整个引入
      //   return false
      // }
      return new RegExp(`^(${Object.keys(dependencies).join('|')})`).test(id) || id === 'vue'
    }
  }
  let outputPath = ''

  let outputOptions = {
    format: 'es'
    // format: 'umd',
    // globals: {
    //   '@babel/runtime/regenerator': '_regeneratorRuntime',
    //   '@babel/runtime/helpers/asyncToGenerator': '_asyncToGenerator',
    //   '@babel/runtime/helpers/classCallCheck': '_classCallCheck',
    //   '@babel/runtime/helpers/createClass': '_createClass'
    // }
  }
  if (outputFilePath) {
    outputOptions.file = outputPath = outputFilePath
  } else {
    outputOptions.dir = outputPath = outputDirPath
  }

  if (IS_DEV) {
    // babel bundled 模式下取消所有 external
    inputOptions.external = []
  } else {
    // 非 dev 模式下添加代码混淆
    inputOptions.plugins.push(terser())
  }
  ;(IS_DEV || IS_WATCH) && (outputOptions.sourcemap = true)


  const bundle = await rollup.rollup(inputOptions)
  const { output } = await bundle.write(outputOptions)
  await bundle.close()
  // 带 --watch 参数启动命令时，记录 input/output 用于给 watch 模式监听文件修改
  IS_WATCH && buildOptionRecords.push([inputOptions, outputOptions])

  return [outputPath, getFileSize(output[0].code)]
}

const watch = function () {
  if (!buildOptionRecords.length) return
  console.log(chalk`\n\n{black.bgGreen  Done } {green 正在启动观察者......}\n`)
  buildOptionRecords.forEach((record) => {
    const watchOptions = {
      ...record[0],
      output: [record[1]],
      watch: {
        chokidar: true,
        clearScreen: true,
        skipWrite: false
      },
    }
    // FIXME: 由于不明原因，typeScript 的 watch 流程需要重新赋值 typeScriptPlugin，否则无法实时更新
    const typeScriptPluginIndex = watchOptions.plugins.findIndex(item => item.name === 'typescript')
    ;~typeScriptPluginIndex && (watchOptions.plugins[typeScriptPluginIndex] = typescript())
    // 通过 serve Plugin 开启监听服务器
    watchOptions.plugins.push(serve({
      open: false,
      port: 18888,
      contentBase: ''
    }))

    const watcher = rollup.watch(watchOptions)
    watcher.on('event', (event) => {
      console.log(event)
      // if (event.code && event.code === 'BUNDLE_END') {
      //   event.result.close()
      // }
    })
  })
}

/**
 * @param {Object} [options={}]
 * @param {string} [options.inputPath]
 * @param {string} [options.outputFilePath]
 * @param {string} [options.outputDirPath]
 * @param {Array<object>} [options.plugins]
 */
const buildJsModule = async ({ inputPath = '', outputFilePath = '', outputDirPath = '', plugins = [] } = {}) => {
  await build({
    inputPath: inputPath,
    outputFilePath,
    outputDirPath,
    plugins: [
      ...plugins,
      resolve(),
      commonjs(),
      postcss(),
      babel({
        exclude: '**/node_modules/**',
        presets: [['@babel/preset-env', { modules: false }]],
        plugins: IS_DEV ? [] : ['@babel/plugin-transform-runtime'],
        babelHelpers: IS_DEV ? 'bundled' : 'runtime'
      })
    ]
  })
}

/**
 * @param {Object} [config={}]
 * @param {string} [config.inputPath]
 * @param {string} [config.outputFilePath]
 * @param {string} [config.outputDirPath]
 * @param {Array<object>} [config.plugins]
 */
const buildTsModule = async (config = {}) => {
  const plugins = config.plugins || []
  await buildJsModule({
    ...config,
    plugins: [
      ...plugins,
      typescript()
    ]
  })
}

module.exports = {
  build,
  watch,
  buildJsModule,
  buildTsModule
}
