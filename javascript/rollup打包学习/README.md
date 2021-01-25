一个使用 rollup 进行 JS 库打包的小型 demo

> 参考资料：
>
> - [Rollup打包工具的使用（超详细，超基础，附代码截图超简单）](https://juejin.cn/post/6844904058394771470)
> - [使用 @rollup/plugin-babel 替代废弃的 rollup-plugin-label](https://www.npmjs.com/package/@rollup/plugin-babel)
> - [babel-runtime使用与性能优化](https://juejin.cn/post/6844903615212027917)

## 一些应该更新的插件替换

- rollup-plugin-label -> [@rollup/plugin-babel](https://github.com/rollup/plugins/tree/master/packages/babel)
- rollup-plugin-node-resolve -> [@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve)
- @rollup/plugin-commonjs -> [@rollup/plugin-commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs)
- rollup-plugin-typescript -> [@rollup/plugin-typescript](https://github.com/rollup/plugins/tree/master/packages/typescript)

## babelHelpers 使用笔记

babelHelpers 支持几个参数：'bundled' | 'runtime' | 'inline' | 'external'。

其中 bundled(官方推荐) 和 inline 在笔者亲身实践下几乎都是一样的，会把打包文件用到的需要转换的语法的 polyfill 单独放到每一个打包后的文件中。

而 external 则会默认全局变量中已经有了需要的 polyfill（需要开发者自己在外部引入 babel-polyfill），打包出来的文件会直接使用 babel 定义的 polyfill 函数。

而 runtime 则是一个针对 node 打包环境下的模式，以笔者的理解，直白来说就是针对 webpack 打包运行时的，打包出来的 bundle 文件会在开头使用 import (cjs 模式下则是 require )语法于 @babel/runtime 中引入自己所需要的 polyfill 语法。所以使用该模式需要在 package.json 的 dependies 中添加 babel/runtime 的依赖，方便 webpack 在打包项目的时候进入 node_modules（**利用了在执行`npm install`也会把每个引用的类库也 install 一遍的特性**），对 bundle 引用到的 babel-polyfill 语法进行打包。

在一个为 webpack 准备，使用 rollup 打包的类库中，使用 runtime 是最好的选择，可以有效节省打包出来的文件大小，实现按需引用。

## 一些需要注意的点

- 使用 rollup-plugin-postcss 的前提是需要先安装`yarn add postcss -D`
