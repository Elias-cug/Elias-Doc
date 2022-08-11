const  { Sidebar, NavItems } = require('./config/index') 

module.exports = {
  base: '/',
  port: 8080,
  head: [],
  plugins: [],
  themeConfig: {
    // 添加导航栏
    nav: NavItems,
    // 左侧边栏
    sidebar: Sidebar
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}
