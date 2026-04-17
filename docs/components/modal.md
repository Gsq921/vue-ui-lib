# Modal 弹窗

Modal 用于展示重要信息或承载表单内容，支持 `Teleport` 到 `body`、遮罩关闭、插槽扩展和滚动穿透处理。

## 组件介绍

- 支持 `v-model:visible` 控制显示/隐藏
- 支持自定义标题与宽度
- 支持点击遮罩关闭（可配置）
- 打开时自动锁定 `body` 滚动（`overflow: hidden`）
- 支持 `header`、`default`、`footer` 插槽
- 内置淡入淡出过渡动画

## 在线预览 Demo

<script setup lang="ts">
import { ref } from 'vue'
import Button from '../../src/components/Button'
import Modal from '../../src/components/Modal'

const visible = ref(false)
</script>

<Button type="primary" @click="visible = true">打开弹窗</Button>

<Modal
  v-model:visible="visible"
  title="示例弹窗"
  width="560px"
  :show-close="true"
  :close-on-click-overlay="true"
>
  <p style="margin:0;">这里是 Modal 内容区域，可以放置任意内容。</p>

  <template #footer>
    <div style="display:flex;justify-content:flex-end;gap:8px;">
      <Button @click="visible = false">取消</Button>
      <Button type="primary" @click="visible = false">确认</Button>
    </div>
  </template>
</Modal>

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示弹窗（`v-model:visible`） | `boolean` | `false` |
| title | 标题文本 | `string` | `''` |
| width | 弹窗宽度 | `string` | `'520px'` |
| showClose | 是否显示右上角关闭按钮 | `boolean` | `true` |
| closeOnClickOverlay | 点击遮罩是否关闭 | `boolean` | `true` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:visible | 显隐状态变化时触发 | `(value: boolean)` |
| close | 弹窗关闭时触发 | `-` |

## 使用示例代码

```vue
<template>
  <Button type="primary" @click="visible = true">Open Modal</Button>

  <Modal
    v-model:visible="visible"
    title="新增数据"
    width="600px"
    :close-on-click-overlay="false"
  >
    <p>这里放表单内容...</p>

    <template #footer>
      <Button @click="visible = false">取消</Button>
      <Button type="primary" @click="submit">提交</Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Modal } from 'vue-ui-lib'

const visible = ref(false)

function submit() {
  visible.value = false
}
</script>
```

