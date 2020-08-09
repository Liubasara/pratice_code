const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // The standard entry point and output config
  // 每个页面的js文件
  entry: {
    autoUpload: './src/autoUpload/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包输出目录
    filename: '[name].[hash:8].min.js', // 输出文件名
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}