const fs = require('fs')
const path = require('path')

const ROOT_PATH = path.resolve(__dirname)

/**
 * 工具函数
 */
class Utils {
  constructor () {
    this.runningCount = 0
    this.postsArticle = []
  }
  async directoryInit(filePath, callback) {
    var files = fs.readdirSync(filePath)
    files.forEach(filename => {
      var filedir = path.join(filePath, filename)
      var stats = fs.statSync(filedir)
      var isFile = stats.isFile() // 是文件
      var isDir = stats.isDirectory() // 是文件夹
      if (isFile) {
        // 除README外的所有markdown文件
        if (/\.md$/.test(filedir) && !/README.md$/.test(filedir)) {
          this.postsArticle.push(filedir)
        }
      }
      if (isDir) {
        if (/\.git$/.test(filedir)) {
          // console.log(`${filedir}是git文件夹, 不遍历`)
        } else {
          this.runningCount++
          this.directoryInit(filedir, callback) // 递归，如果是文件夹，则继续遍历该文件夹
          this.runningCount--
        }
      }
    })
    if (this.runningCount === 0 && callback) {
      callback(this.postsArticle)
    }
  }
}

const utils = new Utils()
utils.directoryInit(ROOT_PATH, filedirs => {
  filedirs.forEach(filedir => {
    const fileData = fs.readFileSync(filedir).toString().split('\n')
    const tagLine = fileData.findIndex(item => item.includes('tags: '))
    const tagArray = path.relative(ROOT_PATH, path.dirname(filedir)).replace(/\\/g, '/').split('/')
    fileData[tagLine] = `tags: ${JSON.stringify(tagArray)}\r`
    fs.writeFile(
      filedir,
      fileData.join('\n'),
      { flag: "w" },
      function(err) {
        if (err) {
          return console.error(err)
        }
        console.log(`${filedir} done!`)
      }
    )
  })
})
