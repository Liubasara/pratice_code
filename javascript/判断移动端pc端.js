// 将该脚本放在 index.html 脚本的最上面
let system = {}
let p = navigator.platform
let u = navigator.userAgent

system.win = p.indexOf('Win') == 0
system.mac = p.indexOf('Mac') == 0
system.x11 = p == 'X11' || p.indexOf('Linux') == 0

if (system.win || system.mac || system.xll) {
  // 屏蔽 pc 端
  if (~u.indexOf('Windows Phone') > -1) {
    // win phone 移动端
  } else {
    window.location.href = '/default.html'
  }
}
