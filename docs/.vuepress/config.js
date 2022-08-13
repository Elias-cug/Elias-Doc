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
        text: 'javascript',
        ariaLabel: 'javascript',
        items: [
          {text: '基础知识点', link: '/javascript/base'}
        ]
      },
      {
        text: 'css',
        ariaLabel: 'css',
        items: [
          {text: '基础知识点', link: '/css/base'}
        ]
      }
    ],
    // 左侧边栏
    sidebar: {
      '/javascript/': [
        '',
        'base'
      ],
      '/css/': [
        '',
        'base'
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
