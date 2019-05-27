// 常用正则表达式

// 百分数的正则表达式，接受 0% - 100% 之间，小数点精度为2位的字符串
var percent = /^(100.0(0)?|100|[1-9]?\d(\.\d\d?)?)%$|^0$|^0.00$/

// 千分位分割，保留两位小数
var thousand = (val).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')

// 任意正整数，正小数（小数位不超过2位）
var isNum=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/

// js给数字加三位一逗号间隔
function format_number(nStr ){
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];  
    x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {  
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }  
    return x1 + x2;  
}
