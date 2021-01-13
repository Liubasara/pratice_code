const { watch, buildTsModule } = require('./buildUtils')

;(async function () {
  await buildTsModule({
    inputPath: 'src/packages/demoJsModule/index.js',
    outputFilePath: 'lib/jsDemoBundle.esm.js'
  })
  // await buildTsModule({
  //   inputPath: 'src/packages/demoTsModule/index.ts',
  //   // outputDirPath: 'lib',
  //   outputFilePath: 'lib/tsDemoBundle.esm.js'
  // })
  watch()
})()
