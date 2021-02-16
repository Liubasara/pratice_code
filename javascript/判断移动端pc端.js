// 判断移动端pc端并进行屏蔽跳转 将该脚本放在 index.html 脚本的最上面
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

/**
 * 测试适用网址：http://api.xosxx.com/hls/playA.php?vid=qGfJeztPsOO0OO1hMNBiltxhIv8GQszrbV1sNDMWuE84HwmweVvL0jmDOO0OO9x7Xdh319ir
 * 
 * userAgent 修改（可以借助插件或者 devtools 的 NetworkCondition 进行 userAgent 的修改）: Mozilla/5.0 (iPhone; CPU Windows Phone) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 EdgiOS/44.5.0.10 Mobile/15E148 Safari/604.1
 * platform 修改: Object.defineProperty(navigator,'platform',{get:function(){return 'Android';}});
 * location.href = 'http://api.xosxx.com/hls/playA.php?vid=qGfJeztPsOO0OO1hMNBiltxhIv8GQszrbV1sNDMWuE84HwmweVvL0jmDOO0OO9x7Xdh319ir'
 */
