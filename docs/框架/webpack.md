# Webpack

## webpack打包流程

初始化合并参数 --》 根据参数创建 complier 实例 --》 完成一系列plugins的订阅 --》获取入口文件 --》 模块编译，各自文件的loader开始工作，最后根据依赖关系生成chunk --》 完成编译 --》输出文件

```js
class Complier {
  constructor(options) {
    this.hooks = {
      // 开始编译时的钩子
      run: new SyncHook(),
      // 输出asset到oupput目录之前执行
      emit: new SyncHook(),
      // 在 compliation 完成时执行 全部完成编译执行
      done: new SyncHook(),
    }
  }
  run(callback) {

  }
}
function webpack(option) {
  const mergeOptions = _mergeOptions(options)
  const complier = new Complier(mergeOptions)
  return complier
}

const complier = webpac
complier.run(() => {})
```

## 核心babel 
```js
@babel/core @babel/preset-env babel-loader --> 必备
@babel/preset-react --> react语法解析
@babel/plugin-proposal-decorators --> 装饰器
/**
 * babel 默认只转化新的 javascript 语法，如箭头函数等，而不转化新的API，
 * 如Iterator, Generator, Set, Map, Proxy, Reflect, Symbol, Promise
 * 等全局对象，此时需要一些辅助函数（babel 6.x 一下版本借助 polyfill，需要在entry之前或根文件头部引入，babel7使用下面的插件）
 * 
 */
@babel/plugin-transform-runtime
```

## 优化配置
> 将一些不变的包进行缓存，再次打包的时候只打包缓存之外的包。
> 需要配合插件将生成的包自动引入到模板 html 文件
- 使用
```js
// 统一打包到 vendor.js 
optimization: {
  splitChunks: {
    cacheGroups: {
      vendor: {
        filename: 'vendor.js',
        chunks: 'all',
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/
      }
    }
  }
}

// 分开打包到多个文件
optimization: {
  splitChunks: {
    cacheGroups: {
      react: {
        filename: 'react.js',
        chunks: 'all', // async, initial
        test: /[\\/]node_modules[\\/]react[\\/]/
      },
      'react-dom': {
        filename: 'react-dom.js',
        chunks: 'all', // async, initial
        test: /[\\/]node_modules[\\/]react-dom[\\/]/
      },
    }
  }
}

```

## css处理
```js
css-loader --> 处理 css 的一些依赖关系
style-loader --> css-loader 生成的样式通过 style 标签插入到 dom 中

mini-css-extract-plugin --> 将 css-loader 生成的标签抽离到单独文件。new 后 包含loader，代替 style loader。

html-webpack-plugin --> 将生成的css文件和js文件插入 dom

// sass
sass-loader  node-sass

// less
less-loader  less
```

## 热更新
1. 使用
```js
// webpack 配置
devServer {
  port: 8000,
  hot: true
}


// 入口文件加入 module.hot
if(module.hot) {
  module.hot.accept(App, () => {
    render(<App></App>, document.getElementById('app'))
  })
}
```
2. 原理
首次启动：
源代码--》编译=》bundle.js产物=》浏览器访问端口=》服务器返回静态资源
浏览器于dev-server简历socket连接，首次收到hash 

更新：
源代码修改=》增量编译=》HRM（基于新内容生成[hash].update.json [hash].update.js）=> 向浏览器推送消息（包括新的hash）=》浏览器创建script标签下载生成的新文件=》调用页面的更新方法（module.hot.accept）

3. The Compiler supports watching which monitors the file system and recompiles as files change

## 异步组件
1. import()函数返回promise，可以利用此语法动态加载模块。达到异步的加载的效果。
2. import()函数为 webpack 提供了代码分隔的依据，import() 导入的模块单独打包。
3. require.ensure()也是非常流行的一个代码异步加载的方式。语法如下：
```js
require.ensure(
  dependencies: String[], // 依赖项
  callback: function(require), // 加载组件完成回调
  errorCallback?: function(error), // 加载失败回调
  chunkName?: String // 指定产出块名称
)
// eg
require.ensure([], function() {
  const ensure = require('./requireEnsure);
  ensure.default();
},
() => null, 'require-ensure')
```

## plugin 
1. 特点：需要导入并实例化，通过勾子可以设计整个构建流程，因此贯穿整个构建范围。
2. 本质：原型上具有apply方法的具名构造函数或类
3. 原型上的 apply 方法就是“通过webpck在不同阶段提供的事件钩子来操纵其内部实例的特定的数据，最后调用webpack提供的回调”的函数。
4. complier钩子:
> Complee 模块是webpack的支柱引擎，他通过cli或Node API传递的所有选项，创建出一个compliation实例。它继承自tapable类，以便注册和调用插件
```js
// 编译对象初始化后执行
initialize
// complier.run()执行之前的一个钩子，param: complier 
beforeRun
// 编译 complication 参数创建之后，执行插件
beforeCompile
// 编译 complication 创建之后，执行插件
complication 
// 生成资源到output目录之后
afterEmit 
// 编译完成
done 
// 编译失败
failed 

// eg: html-webpack-plugin 
compiler.hooks.initialize.tap
compiler.hooks.thisCompilation.tap
compilation.hooks.processAssets.tapAsync

```

5. complication钩子
> 同样继承自tapable
```js 
// 当一个模块构建开始前执行
buildModule

// 当一个模块构建成功
succeedModule

// 当所有模块构建成功执行
finishModules

// 当开始优化依赖时执行
optimizeDependencied

// 当完成优化依赖时执行
afterOptimizeDependencies

```

6. 插件类型
Tapable这个小型的library是webpack的一个核心工具，但也可以用于其他地方，以提供类似的插件接口。这个类暴露`tap`, `tapAsync`, `tapPromise`方法，可以使用这些方法，注入自定义的构建步骤

7. 用法
```js
class TemplatedPathPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(plugin, compilation => {
      compilation.hooks.optimize.tap(plugin, replacePathVariables);
    });
  }
}
```

## 常用的webpack插件
1. html-webpack-plugin：生成一个html文件 将 js css外联到html
2. clean-webpack-plugin：清理上一次项目生成的bundle文件
3. extract-text-webpack-plugin：将 css 生成文件而非内联
4. UglifyJsPlugin：对 js 文件进行压缩。单线程
5. ParallelUglifyPlugin： 并行压缩 js 代码
6. compression-webpack-plugin：gzip压缩
7. copy-webpack-plugin：将静态资源拷贝到 dist 目录
8. DllPlugin：提供分离打包的方法

## webpack的优秀特点
1. 代码分割
分离第三方库
CommonsChunkPlugin

2. 按工程需求进行分割 ： syntax-dynamic-import
webpack 把 import(静态路径) 作为一个分离点(split-point)，并把引入的模块作为一个单独的 chunk

3. 按需引入
babel-plugin-import