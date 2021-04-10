// 将某个标签内的内容另存为 txt 文件
// 示例网址: https://www.feiku6.com/read/s3-houchang/18333795.html
var text = document.querySelector('.art_wrap').innerText
var exportBlob = new Blob([text])
var downloadLink = document.createElement('a')
downloadLink.href = URL.createObjectURL(exportBlob)
downloadLink.download = 'name'
downloadLink.click()