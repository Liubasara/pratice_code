const fs = require('fs')

/**
 * 清空并删除某个文件夹
 * @param {string} folderPath 需删除文件夹路径
 * @param {Array<string>} excludePaths 不删除文件路径集合
 */
function delDir (targetPath, excludePaths) {
  let files = []
  if (fs.existsSync(targetPath)) {
    files = fs.readdirSync(targetPath)
    files.forEach(file => {
      const curPath = targetPath + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath) // 递归删除文件夹
      } else {
        fs.unlinkSync(curPath) // 删除文件
      }
    })
    !(excludePaths && excludePaths.includes(targetPath)) && fs.rmdirSync(targetPath)
  }
}
