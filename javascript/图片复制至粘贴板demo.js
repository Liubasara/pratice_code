var targetUrl = 'http://a.hiphotos.baidu.com/image/w%3D230/sign=fa52b971b1de9c82a665fe8c5c8180d2/d53f8794a4c27d1eba11668c19d5ad6eddc43846.jpg'
var targetPic = new Image()
targetPic.onload = function (e) {
    targetPic.setAttribute('contenteditable', true)
    document.body.appendChild(targetPic)
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNode(targetPic);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    targetPic.setAttribute('contenteditable', false)
    document.body.removeChild(targetPic)
}
targetPic.src = targetUrl

