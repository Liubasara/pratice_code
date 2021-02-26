// 命令使用（MAC）：cat /Users/$USER/Library/Application\ Support/Google/Chrome/Default/Bookmarks | node test.js
// Windows(.exe后缀名一定要加上否则会报错): cat ~/AppData/Local/Google/Chrome/User\ Data/Default/Bookmarks | node.exe test.js

// ====================== From https://github.com/rongjiecomputer/chrome/blob/gh-pages/bookmark-recovery/index.html ==================
function Bookmark(raw) {
  this.tree = JSON.parse(raw)
  this.html = ''
  this.count = 0
  this.first = true
}
function chromeTime2TimeT(time) {
  return Math.floor((time - 11644473600000000) / 1000000)
}
Bookmark.prototype.walk = function (node) {
  if (node.type === 'folder') {
    this.html +=
      '<DT><H3 ADD_DATE="' +
      chromeTime2TimeT(node.date_added) +
      '" LAST_MODIFIED="' +
      chromeTime2TimeT(node.date_modified) +
      '"'
    if (this.first) {
      this.html += ' PERSONAL_TOOLBAR_FOLDER="true"'
      this.first = false
    }
    this.html += '>' + node.name + '</H3>\n'
    this.html += '<DL><p>\n'
    node.children.forEach(this.walk.bind(this))
    this.html += '</DL><p>\n'
  } else {
    // node.type == 'url'
    this.html +=
      '<DT><A HREF="' + node.url + '" ADD_DATE="' + chromeTime2TimeT(node.date_added) + '">' + node.name + '</A>\n'
    this.count++
  }
}
Bookmark.prototype.parse = function () {
  this.html =
    '<!DOCTYPE NETSCAPE-Bookmark-file-1><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8"><TITLE>Bookmarks</TITLE><H1>Bookmarks</H1>\n'
  this.html += '<DL><p>\n'
  var roots = this.tree.roots
  this.walk(roots.bookmark_bar)
  if (roots.other.children.length > 0) this.walk(roots.other)
  if (roots.synced.children.length > 0) this.walk(roots.synced)
  this.html += '<style>dt, dl { padding-left: 12px; }</style>\n'
}
Bookmark.prototype.newLink = function () {
  var blob = new Blob([this.html], { type: 'text/plain' })
  var a = document.createElement('a')
  a.download = 'bookmark_backup.html'
  a.href = window.URL.createObjectURL(blob)
  a.textContent = 'Download ready (' + this.count + ' bookmarks found)'
  a.onclick = function (e) {
    if ('disabled' in this.dataset) {
      return false
    }
    this.textContent = 'Downloaded'
    this.dataset.disabled = true
    setTimeout(function () {
      window.URL.revokeObjectURL(this.href)
    }, 1500)
  }
  return a
}
// ================================== END ========================================

const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

// rl.on('close', function () {
//   console.log('\nBYE BYE !!!')
//   process.exit(0)
// })
let data = ''

rl.on('line', (cmd) => {
  data += cmd + '\n'
})

rl.on('close', () => {
//   const parseData = JSON.parse(data)
  try {
      let bookmark = new Bookmark(data)
      bookmark.parse()
      fs.writeFileSync('my-bookmarks.html', bookmark.html, { flag: 'w' })
      // console.log(bookmark.html)
  } catch (e) {
      console.log(e)
  }
})
