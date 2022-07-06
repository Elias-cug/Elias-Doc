module.exports = {
  title: 'EliasLee Notes',
  description: 'EliasLee 的笔记',
  base: '/',
  port: 8080,
  head: [],
  plugins: [],
  themeConfig: {
    // 添加导航栏
    nav: [
      {
        text: '基础',
        ariaLabel: 'base',
        items: [
          { text: 'javascript', link: '/base/javascript' },
          { text: 'css', link: '/base/css' }
        ]
      }
    ],
    // 左侧边栏
    sidebar: [
      {
        title: '基础知识', // 必要的
        path: '/base/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [{ title: 'javascript', path: '/base/javascript' }]
      }
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}
