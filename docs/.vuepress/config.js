module.exports = {
  base: '/',
  port: 8080,
  head: [],
  plugins: [],
  title: 'Elias Notes | Front-End Notes',
  themeConfig: {
    // 添加导航栏
    nav: [
      {
        text: '基础',
        ariaLabel: '基础',
        items: [
          {text: 'javascript', link: '/基础知识/javascript.md'},
          {text: 'css', link: '/基础知识/css.md'},
          {text: '网络', link: '/基础知识/网络.md'},
          {text: '浏览器', link: '/基础知识/浏览器.md'},
          {text: '后端', link: '/基础知识/后端.md'},
          {text: '计算机', link: '/基础知识/计算机.md'},
          {text: '图形学', link: '/基础知识/图形学.md'}
        ]
      }
    ],
    // 左侧边栏
    sidebar: {
      '/基础知识/': [
        '',
        'javascript',
        'css',
        '网络',
        '浏览器',
        '后端',
        '计算机',
        '图形学'
        
      ]
    } 
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}
