export type ToastType = 'success' | 'error' | 'warning' | 'info'
export type ToastPosition = 'top' | 'center' | 'bottom'

export type ToastProps = {
  type: ToastType
  duration?: number
  position?: ToastPosition
  visible?: boolean
  message?: string
  closable?: boolean
}

export type ToastEmits = {
  (e: 'update:visible', value: boolean): void
  (e: 'close'): void
}

