import { createApp, h, reactive } from 'vue'
import Toast from './Toast.vue'

import type { ToastProps, ToastPosition, ToastType } from './types'

type ToastGlobalOptions = Partial<Omit<ToastProps, 'type' | 'message' | 'visible'>>

const defaultGlobalOptions: Required<Pick<ToastGlobalOptions, 'duration' | 'position' | 'closable'>> =
  {
    duration: 3000,
    position: 'top',
    closable: true,
  }

let globalOptions: ToastGlobalOptions = { ...defaultGlobalOptions }

export function setToastGlobalOptions(options: ToastGlobalOptions) {
  globalOptions = { ...globalOptions, ...options }
}

type CloseFn = () => void

function mountToast(opts: {
  type: ToastType
  message: string
  duration?: number
  position?: ToastPosition
  closable?: boolean
}): CloseFn {
  if (typeof document === 'undefined') return () => {}

  const container = document.createElement('div')
  document.body.appendChild(container)

  const state = reactive({ visible: true })
  let closed = false

  let cleanupTimer: number | undefined

  const LEAVE_MS = 220
  let app: ReturnType<typeof createApp> | null = null

  const scheduleCleanup = () => {
    if (closed) return
    closed = true
    if (cleanupTimer) window.clearTimeout(cleanupTimer)
    cleanupTimer = window.setTimeout(() => {
      app?.unmount()
      container.remove()
    }, LEAVE_MS)
  }

  app = createApp({
    render: () =>
      h(Toast, {
        type: opts.type,
        message: opts.message,
        duration: opts.duration ?? globalOptions.duration,
        position: opts.position ?? globalOptions.position,
        closable: opts.closable ?? globalOptions.closable,
        visible: state.visible,
        'onUpdate:visible': (v: boolean) => {
          state.visible = v
          if (!v) scheduleCleanup()
        },
        onClose: () => scheduleCleanup(),
      }),
  })

  app.mount(container)

  const close: CloseFn = () => {
    if (!state.visible) return
    state.visible = false
    scheduleCleanup()
  }

  return close
}

type ShowFn = {
  (message: string): CloseFn
  success: (message: string) => CloseFn
  error: (message: string) => CloseFn
  loading: (message: string) => CloseFn
  setDefaults: (options: ToastGlobalOptions) => void
}

const show = ((message: string) => {
  return mountToast({
    type: 'info',
    message,
  })
}) as ShowFn

show.success = (message: string) =>
  mountToast({
    type: 'success',
    message,
  })

show.error = (message: string) =>
  mountToast({
    type: 'error',
    message,
  })

show.loading = (message: string) =>
  mountToast({
    type: 'info',
    message,
    // loading 不自动关闭；靠返回的 close() 手动关闭
    duration: 0,
  })

show.setDefaults = setToastGlobalOptions

export { show }

// 仍然保留组件与类型导出，便于你做其它用法（如直接使用组件）
export { Toast }
export type { ToastPosition, ToastType, ToastProps }

export default Toast

