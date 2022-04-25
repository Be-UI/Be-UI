/*
 * @config.js
 * @deprecated
 * @author czh
 * @update (czh 2022/4/14)
 */
import {defineConfigWithTheme} from 'vitepress'
import { mdPlugin } from './plugin/plugins'
export default defineConfigWithTheme({
    repo: 'xinlei3166/vitepress-theme-demoblock',
    head: [
        ['link', {rel: 'icon', type: 'image/svg+xml', href: '/logo.svg'}], // 浏览器tab的title 图标
    ],
    // ...
    base: '/',
    title: 'Be-UI3', // 浏览器tab的title和head的title
    description: 'be-ui3 Vue3组件库',
    markdown: {
        config: (md) => {
            return mdPlugin(md)
        }
    },
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
            {text: '首页', link: '/'},
            {text: '指南', link: '/views/introduction/intro'},
            {text: '文档', link: '/views/document/icon'},
        ],
        sidebar: {
             // 介绍页的 sidebar 不适用link 是使用锚点
            '/introduction/': [
                {
                    text: '指南',
                    link: '/views/introduction/intro',
                    children: [
                        {
                            text: '介绍',
                            link: '/views/introduction/intro',
                        },
                        {
                            text: '安装',
                            link: '/views/introduction/install'
                        },
                        {
                            text: '使用',
                            link: '/views/introduction/use'
                        },
                        {
                            text: '其他',
                            link: '/views/introduction/other'
                        }
                    ]
                },
            ],
            '/document/': [
                {
                    text: '文档',
                    link: '/views/document/icon',
                    children: [
                        {
                            text: '图标',
                            link: '/views/document/icon',
                        },
                        {
                            text: '自动补全',
                            link: '/views/document/autpcomplete'
                        },
                        {
                            text: '面包屑',
                            link: '/views/document/breadcrumb'
                        },
                        {
                            text: '按钮',
                            link: '/views/document/button'
                        },
                        {
                            text: '面包屑',
                            link: '/views/document/breadcrumb'
                        },{
                            text: '布局容器',
                            link: '/views/document/container'
                        },{
                            text: '右键菜单',
                            link: '/views/document/contextmenu'
                        },{
                            text: '弹窗',
                            link: '/views/document/dialog'
                        },{
                            text: '文本省略',
                            link: '/views/document/ellipsis'
                        },{
                            text: '输入框',
                            link: '/views/document/input'
                        },{
                            text: '数字输入框',
                            link: '/views/document/input-number'
                        },{
                            text: '载入',
                            link: '/views/document/loading'
                        },{
                            text: '信息盒子',
                            link: '/views/document/message-box'
                        },{
                            text: '消息信息',
                            link: '/views/document/message'
                        },{
                            text: '通知',
                            link: '/views/document/notification'
                        },{
                            text: '分页',
                            link: '/views/document/pager'
                        },{
                            text: '进度条',
                            link: '/views/document/progress'
                        },{
                            text: '选择框',
                            link: '/views/document/select'
                        },{
                            text: '开关',
                            link: '/views/document/switch'
                        },{
                            text: '标签',
                            link: '/views/document/tag'
                        },{
                            text: '提示框',
                            link: '/views/document/tooltip'
                        },
                        {
                            text: '弹出框',
                            link: '/views/document/popover'
                        },
                    ]
                },
            ],
        },
    },
})
