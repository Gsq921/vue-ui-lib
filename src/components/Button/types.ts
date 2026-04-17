import type { ComponentInstance } from '../../types'
import type Button from './Button.vue'

export type ButtonType = 'primary' | 'success' | 'danger' | 'default'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  loading: boolean
  disabled: boolean
  icon?: string
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}

export type ButtonInstance = ComponentInstance<typeof Button>

