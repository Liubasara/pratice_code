// ==UserScript==
// @name         知乎去除登录遮罩层
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      http*://www.zhihu.com/question/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  // Your code here...
  window.addEventListener('load', function () {
      setTimeout(function () {
          for (let elm of document.querySelectorAll('.Modal-wrapper')) {
              elm.parentElement.removeChild(elm);
          }
          document.documentElement.style.overflow = 'auto';
      }, 0)
  });
})();