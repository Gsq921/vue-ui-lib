# Input 输入框

Input 用于文本录入场景，支持 `v-model` 双向绑定、清空按钮、禁用/只读状态及字数统计展示。

## 组件介绍

- 支持 `v-model`（基于 `modelValue` / `update:modelValue`）
- 支持尺寸：`small` / `medium` / `large`
- 支持 `clearable` 清空按钮
- 支持 `disabled` 和 `readonly`
- 支持 `maxlength` 字数限制与右下角计数

## 在线预览 Demo

<script setup lang="ts">
import { ref } from 'vue'
import Input from '../../src/components/Input'

const text = ref('Hello Vue UI Lib')
const readonlyText = ref('只读内容')
</script>

<div style="display:flex;flex-direction:column;gap:12px;margin:12px 0 18px;max-width:420px;">
  <Input v-model="text" placeholder="请输入内容" :clearable="true" :maxlength="30" />
  <Input v-model="readonlyText" size="small" :readonly="true" />
  <Input v-model="text" size="large" placeholder="大尺寸输入框" />
</div>

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值（`v-model`） | `string` | `''` |
| size | 输入框尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| placeholder | 占位文本 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否显示清空按钮 | `boolean` | `false` |
| maxlength | 最大输入长度（`<= 0` 表示不限制） | `number` | `0` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 输入值变化时触发 | `(value: string)` |

## 使用示例代码

```vue
<template>
  <Input
    v-model="keyword"
    placeholder="请输入关键词"
    :clearable="true"
    :maxlength="20"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Input } from 'vue-ui-lib'

const keyword = ref('')
</script>
```

