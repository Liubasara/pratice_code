const rollup = require('rollup')
const { dependencies, name: packageName } = require('../package.json')
const chalk = require('chalk')
/**
 * rollup 相关插件
 */
const { babel } = require('@rollup/plugin-babel')
const { default: resolve } = require('@rollup/plugin-node-resolve')
const { default: commonjs } = require('@rollup/plugin-node-resolve')
const typescript = require('@rollup/plugin-typescript')

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
  const inputOptions = {
    input: inputPath,
    plugins,
    // 告诉 rollup 不要将此 lodash 打包，而作为外部依赖
    external: (id) => {
      // if (id === 'lodash') {
      //   // 将 lodash 整个引入
      //   return false
      // }
      return new RegExp(`^(${Object.keys(dependencies).join('|')})`).test(id) || id === 'vue'
    }
  }

  let outputPath = ''

  const outputOptions = {
    format: 'es'
  }
  if (outputFilePath) {
    outputOptions.file = outputPath = outputFilePath
  } else {
    outputOptions.dir = outputPath = outputDirPath
  }

  const bundle = await rollup.rollup(inputOptions)
  const { output } = await bundle.write(outputOptions)
  await bundle.close()
  // 带 --watch 参数启动命令时，记录 input/output 用于给 watch 模式监听文件修改
  process.env.npm_config_watch && buildOptionRecords.push([inputOptions, outputOptions])

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

    const watcher = rollup.watch(watchOptions)
    watcher.on('event', (event) => {
      console.log(event)
      // if (event.code && event.code === 'BUNDLE_END') {
      //   event.result.close()
      // }
    })
  })
}

const buildJsModule = async ({ inputPath = '', outputFilePath = '', outputDirPath = '', plugins = [] } = {}) => {
  await build({
    inputPath: inputPath,
    outputFilePath,
    outputDirPath,
    plugins: [
      ...plugins,
      commonjs(),
      resolve(),
      babel({
        exclude: '**/node_modules/**',
        presets: [['@babel/preset-env', { modules: false }]],
        plugins: ['@babel/plugin-transform-runtime'],
        babelHelpers: 'runtime'
      })
    ]
  })
}

;(async () => {
  await buildJsModule({
    inputPath: 'src/packages/demoJsModule/index.js',
    outputFilePath: 'lib/jsDemoBundle.esm.js',
    plugins: [
      typescript()
    ]
  })
  await build({
    inputPath: 'src/packages/demoTsModule/index.ts',
    // outputDirPath: 'lib',
    outputFilePath: 'lib/tsDemoBundle.esm.js',
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
    ]
  })
  watch()
})()
