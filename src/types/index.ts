import type { ComponentPublicInstance } from 'vue'

/**
 * 通用变体（variant）类型：组件库里大量组件会复用这些枚举。
 * 你后续可以按需扩展（比如把 `Type` 对齐到 Button/Tag 等组件的取值）。
 */
export type Size = 'large' | 'default' | 'small' | 'mini'
export type Type =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'text'

export type ComponentInstance<C> = C extends new (...args: any[]) => infer R
  ? R
  : ComponentPublicInstance

/**
 * 组件实例类型导出：
 * 当你有一个组件 `MyComp`（默认导出 SFC 时通常可用 `typeof MyComp` 拿到组件类型），
 * 你可以用 `ComponentInstance<typeof MyComp>` 得到其实例类型。
 */

/**
 * 通用组件 Props 类型（可作为你各组件的基础字段）。
 */
export type CommonProps = {
  size?: Size
  type?: Type
  disabled?: boolean
  loading?: boolean
}

