import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Elias Notes",
  description: "Front-End Notes",
  base: "/le-note/",
  lang: "zh-CN",

  // 头部标签
  head: [["link", { rel: "icon", href: "/logo.jpeg" }]],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.jpeg",
    siteTitle: "Elias Notes",

    // 导航栏
    nav: [
      {
        text: "基础",
        items: [
          { text: "JavaScript", link: "/基础知识/javascript" },
          { text: "CSS", link: "/基础知识/css" },
          { text: "网络", link: "/基础知识/网络" },
          { text: "浏览器", link: "/基础知识/浏览器" },
          { text: "后端", link: "/基础知识/后端" },
          { text: "计算机", link: "/基础知识/计算机" },
          { text: "图形学", link: "/基础知识/图形学" },
          { text: "常用命令", link: "/基础知识/常用命令" },
          { text: "TypeScript", link: "/基础知识/typescript" },
          { text: "工具函数", link: "/基础知识/工具函数" },
          { text: "APIJSON", link: "/基础知识/APIJSON" },
        ],
      },
      {
        text: "框架",
        items: [
          { text: "Webpack", link: "/框架/webpack" },
          { text: "React", link: "/框架/react" },
          { text: "单体仓库", link: "/框架/单体仓库" },
          { text: "VUE", link: "/框架/VUE" },
        ],
      },
    ],

    // 侧边栏
    sidebar: {
      "/基础知识/": [
        {
          text: "基础知识",
          items: [
            { text: "JavaScript", link: "/基础知识/javascript" },
            { text: "CSS", link: "/基础知识/css" },
            { text: "网络", link: "/基础知识/网络" },
            { text: "浏览器", link: "/基础知识/浏览器" },
            { text: "后端", link: "/基础知识/后端" },
            { text: "计算机", link: "/基础知识/计算机" },
            { text: "图形学", link: "/基础知识/图形学" },
            { text: "常用命令", link: "/基础知识/常用命令" },
            { text: "TypeScript", link: "/基础知识/typescript" },
            { text: "工具函数", link: "/基础知识/工具函数" },
            { text: "APIJSON", link: "/基础知识/APIJSON" },
          ],
        },
      ],
      "/框架/": [
        {
          text: "框架",
          items: [
            { text: "Webpack", link: "/框架/webpack" },
            { text: "React", link: "/框架/react" },
            { text: "单体仓库", link: "/框架/单体仓库" },
            { text: "VUE", link: "/框架/VUE" },
          ],
        },
      ],
    },

    // 社交链接
    socialLinks: [{ icon: "github", link: "https://github.com/elias-cug" }],

    // 页脚
    footer: {
      message: "Hep Licensed",
      copyright: "Copyright © 2022-present EliasLee",
    },

    // 搜索
    search: {
      provider: "local",
    },

    // 编辑链接
    editLink: {
      pattern: "https://github.com/elias-cug/Elias-Doc/edit/main/docs/:path",
    },

    // 最后更新时间
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
  },
});
