import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vue UI Lib',
  description: '基于 Vue 3 + TypeScript 的轻量组件库',
  base: '/vue-ui-lib/',
  lang: 'zh-CN',
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#1677ff' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/getting-started' },
      { text: '组件', link: '/components/button' },
      { text: 'GitHub', link: 'https://github.com/Gsq921/vue-ui-lib' },
    ],

    sidebar: {
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Input 输入框', link: '/components/input' },
          ],
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Modal 弹窗', link: '/components/modal' },
            { text: 'Toast 轻提示', link: '/components/toast' },
          ],
        },
      ],
      '/guide/': [
        {
          text: '指南',
          items: [{ text: '快速开始', link: '/guide/getting-started' }],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-org/vue-ui-lib' },
    ],

    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Vue UI Lib',
    },
  },
})

