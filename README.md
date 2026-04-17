# Vue UI Lib

一个基于 Vue 3 + TypeScript + Vite 构建的轻量级组件库，提供常用业务组件与统一样式规范，支持按需引入与完整类型提示。

## 项目介绍

`vue-ui-lib` 旨在帮助你快速搭建中后台和业务系统页面，当前已内置 Button、Input、Modal、Toast 等基础组件，并配套 VitePress 文档与 Vitest 单元测试。

## 技术栈

- Vue 3
- TypeScript
- Vite 8
- Vue SFC (`<script setup>`)
- Sass / SCSS
- Vitest + @vue/test-utils
- VitePress

## 安装使用

### 安装

```bash
npm install vue-ui-lib
```

### 全量引入

```ts
import { createApp } from 'vue'
import App from './App.vue'
import VueUiLib from 'vue-ui-lib'
import 'vue-ui-lib/dist/style.css'

const app = createApp(App)
app.use(VueUiLib)
app.mount('#app')
```

### 按需引入

```ts
import { Button, Input, Modal, show } from 'vue-ui-lib'
import 'vue-ui-lib/dist/style.css'
```

## 组件列表

当前组件库包含：

- Button 按钮
- Input 输入框
- Modal 弹窗
- Toast 轻提示（组件模式 + 函数式调用）

## 开发命令

```bash
# 本地开发
npm run dev

# 构建项目
npm run build

# 组件库构建
npm run build:lib

# 单元测试
npm run test

# 文档开发
npm run docs:dev

# 文档构建
npm run docs:build

# 预览
npm run preview
```

## 在线文档链接

- 本地文档（开发环境）：[http://localhost:5173](http://localhost:5173)
- 线上文档（部署后替换）：[https://your-org.github.io/vue-ui-lib](https://your-org.github.io/vue-ui-lib)
