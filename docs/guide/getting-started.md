# 快速开始

本章节会带你在项目中接入 `vue-ui-lib`，并快速使用基础组件。

## 安装

```bash
npm install vue-ui-lib
# or
pnpm add vue-ui-lib
# or
yarn add vue-ui-lib
```

## 全量引入（插件方式）

```ts
import { createApp } from 'vue'
import App from './App.vue'
import VueUiLib from 'vue-ui-lib'
import 'vue-ui-lib/dist/style.css'

const app = createApp(App)
app.use(VueUiLib)
app.mount('#app')
```

## 按需引入

```ts
import { Button, Input, Modal } from 'vue-ui-lib'
import 'vue-ui-lib/dist/style.css'
```

```vue
<template>
  <Button type="primary">Primary Button</Button>
  <Input v-model="keyword" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input } from 'vue-ui-lib'

const keyword = ref('')
</script>
```

## Toast 函数式调用

```ts
import { show } from 'vue-ui-lib'

show('这是一条消息')
show.success('操作成功')
show.error('操作失败')

const close = show.loading('加载中...')
setTimeout(() => close(), 1500)
```

