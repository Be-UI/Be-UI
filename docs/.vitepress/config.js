/*
 * @config.js
 * @deprecated
 * @author czh
 * @update (czh 2022/4/14)
 */
import { defineConfigWithTheme } from 'vitepress'

export default defineConfigWithTheme({
  repo: 'xinlei3166/vitepress-theme-demoblock',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }], // 浏览器tab的title 图标
  ],
  // ...
  base: '/',
  title: 'Be-UI3', // 浏览器tab的title和head的title
  description: 'be-ui3 Vue3组件库',
  themeConfig: {
    docsDir: 'docs',
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    docsBranch: 'master',
    algolia: {
      appId: '8PP3C12CN4',
      apiKey: 'e7283cc70aef16ddc9363ce9f7e87332',
      indexName: 'be_ui3',
    },
    // head 的导航
    nav: [
      { text: '首页', link: '/' },
      { text: '介绍', link: '/views/introduction/intro' },
      { text: '文档', link: '/views/introduction/other' },
    ],
    /*sidebar: {
            '/document/': {
                views: [
                    {
                        text: "Basics",
                        children: [
                            {
                                text: "Design",
                                link: "views/document/design"
                            },
                            {
                                text: "Navigation",
                                link: "views/document/nav"
                            },
                            {
                                text: "Installation",
                                link: "views/document/installation"
                            },
                            {
                                text: "Quick Start",
                                link: "views/document/quickstart"
                            }
                        ]
                    },
                    /!*{
                        text: '安装',
                        children: [
                            {
                                text: '是',
                                link: '/views/document/other'
                            },
                        ]
                    },
                    {
                        text: '其他',
                        children: [
                            {
                                text: '组件',
                                link: '/views/document/card'
                            },
                        ]
                    },*!/
                ]
            }
        },*/
    sidebar: {
      '/views/': [
        {
          text: '指南',
          link: '/views/introduction/intro',
          /* children: [
                        /!*{
                            text: '介绍',
                            link: '/views/introduction/intro'
                        },
                        {
                            text: '安装',
                            link: '/views/introduction/install'
                        },
                        {
                            text: '其他',
                            link: '/views/introduction/other'
                        }*!/
                    ]*/
        },
      ],
    },
  },
})
