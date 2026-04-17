import type { App, Plugin } from 'vue'

import Button from './components/Button'
import Input from './components/Input'
import Modal from './components/Modal'
import Toast, { show } from './components/Toast'

const components = [Button, Input, Modal, Toast] as const

export type VueUiLibComponent = (typeof components)[number]

// 支持 app.use(VueUiLib)
export const install: Plugin['install'] = (app: App) => {
  components.forEach((component) => {
    const name = (component as { name?: string }).name
    if (!name) return
    app.component(name, component)
  })
}

// 组件导出（支持按需引入）
export { Button, Input, Modal, Toast }

// Toast 函数式能力
export { show, setToastGlobalOptions } from './components/Toast'

// 类型导出
export type * from './components/Button'
export type * from './components/Input'
export type * from './components/Modal'
export type * from './components/Toast'
export type * from './types'

// 默认导出插件（支持 Vue.use() 生态）
const VueUiLib = { install }
export default VueUiLib

