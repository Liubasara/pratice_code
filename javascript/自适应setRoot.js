/**
 * 参考：
 * https://juejin.im/post/5b346e8f5188251e1d39bd09
 * https://juejin.im/post/5b6503dee51d45191e0d30d2
 */

// 淘宝方案 
(function () {
    var DESIGN_WIDTH = 750; // 设计稿宽度
    var MAPPING_SCALE = 100; // rem 在使用时与 px 的比例，例 100. 则 1px === 100rem，为保证准确性，该值一般不低于 100
    var dpr = window.devicePixelRatio;
    var meta = document.createElement('meta');
    var scale = 1 / dpr;

    var isAndroid = window.navigator.appVersion.match(/android/gi);
    var isIPhone = window.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = window.devicePixelRatio;
    if (isIPhone) {
        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
            dpr = 3;
        } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
            dpr = 2;
        } else {
            dpr = 1;
        }
    } else {
        // 其他设备下，仍旧使用1倍的方案
        dpr = 1;
    }
    scale = 1 / dpr;
    
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, user-scalable=no, initial-scale=' + scale +
        ', maximum-scale=' + scale + ', minimum-scale=' + scale);
    document.getElementsByTagName('head')[0].appendChild(meta);
    // 动态设置的缩放大小会影响布局视口的尺寸
    function resize() {
        var deviceWidth = document.documentElement.clientWidth;
        document.documentElement.style.fontSize = (deviceWidth / DESIGN_WIDTH) * MAPPING_SCALE + 'px';
    }
    resize();
    window.onresize = resize;

})()