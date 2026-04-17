# Button 按钮

Button 是最基础的交互组件之一，用于触发操作、提交表单或进行页面行为跳转。  
`vue-ui-lib` 的 Button 支持多种类型、尺寸、加载态和禁用态，并提供完整的 TypeScript 类型定义。

## 组件介绍

- 支持 `type`：`primary` / `success` / `danger` / `default`
- 支持 `size`：`small` / `medium` / `large`
- 支持 `loading` 状态（显示加载图标并禁用点击）
- 支持 `disabled` 状态
- 支持 `icon` 图标类名
- 支持默认插槽内容

## 在线预览 Demo

<script setup lang="ts">
import { ref } from 'vue'
import Button from '../../src/components/Button'

const loading = ref(false)

function handleSubmit() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1200)
}
</script>

<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin:12px 0 18px;">
  <Button type="default">Default</Button>
  <Button type="primary">Primary</Button>
  <Button type="success">Success</Button>
  <Button type="danger">Danger</Button>
</div>

<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin:0 0 18px;">
  <Button size="small" type="primary">Small</Button>
  <Button size="medium" type="primary">Medium</Button>
  <Button size="large" type="primary">Large</Button>
</div>

<Button :loading="loading" type="primary" @click="handleSubmit">
  {{ loading ? '提交中...' : '点击触发加载态' }}
</Button>

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `'primary' \| 'success' \| 'danger' \| 'default'` | `'default'` |
| size | 按钮尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| loading | 是否为加载状态 | `boolean` | `false` |
| disabled | 是否禁用按钮 | `boolean` | `false` |
| icon | 图标 class 名（可选） | `string` | `undefined` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 按钮点击时触发（`loading` / `disabled` 时不会触发） | `(event: MouseEvent)` |

## 使用示例代码

```vue
<template>
  <div class="demo-row">
    <Button type="primary" @click="onClick">Primary Button</Button>
    <Button type="success">Success Button</Button>
    <Button type="danger" :disabled="true">Disabled Button</Button>
  </div>

  <div class="demo-row">
    <Button :loading="loading" type="primary" @click="onSubmit">
      {{ loading ? 'Loading...' : 'Submit' }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from 'vue-ui-lib'

const loading = ref(false)

function onClick(e: MouseEvent) {
  console.log('button click:', e)
}

function onSubmit() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}
</style>
```

