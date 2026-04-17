# Toast 轻提示

Toast 用于轻量级消息反馈，支持函数式调用、自动关闭、手动关闭和多条消息堆叠展示。

## 组件介绍

- 支持函数调用：`show('消息')`
- 支持快捷方法：`show.success()` / `show.error()` / `show.loading()`
- 支持 `duration` 自动关闭时长
- 支持 `position`：`top` / `center` / `bottom`
- 支持手动关闭并返回 `close()` 关闭句柄
- 多个 Toast 会按位置自动堆叠

## 在线预览 Demo

<script setup lang="ts">
import Button from '../../src/components/Button'
import { show } from '../../src/components/Toast'

function openInfo() {
  show('这是一条普通提示')
}

function openSuccess() {
  show.success('操作成功')
}

function openError() {
  show.error('操作失败')
}

function openLoading() {
  const close = show.loading('加载中，请稍候...')
  setTimeout(() => {
    close()
    show.success('加载完成')
  }, 1500)
}
</script>

<div style="display:flex;flex-wrap:wrap;gap:10px;margin:12px 0 16px;">
  <Button @click="openInfo">普通提示</Button>
  <Button type="success" @click="openSuccess">成功提示</Button>
  <Button type="danger" @click="openError">错误提示</Button>
  <Button type="primary" @click="openLoading">加载提示</Button>
</div>

## Props（组件模式）

> Toast 同时支持组件方式与函数式方式。以下是组件方式可配置项。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 提示类型 | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` |
| message | 提示文本 | `string` | `''` |
| duration | 自动关闭时间（毫秒，`<= 0` 不自动关闭） | `number` | `3000` |
| position | 显示位置 | `'top' \| 'center' \| 'bottom'` | `'top'` |
| visible | 是否显示 | `boolean` | `true` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:visible | 显隐变化时触发 | `(value: boolean)` |
| close | 关闭时触发 | `-` |

## 使用示例代码（函数式调用）

```ts
import { show } from 'vue-ui-lib'

show('这是一条消息')
show.success('保存成功')
show.error('保存失败')

const close = show.loading('加载中...')
setTimeout(() => {
  close()
}, 2000)
```

