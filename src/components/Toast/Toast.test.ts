import { nextTick } from 'vue'
import { describe, expect, it, vi, afterEach } from 'vitest'

import { setToastGlobalOptions, show } from './index'

function getToasts() {
  return Array.from(document.body.querySelectorAll<HTMLElement>('.toast'))
}

function removeAllToasts() {
  getToasts().forEach((el) => el.parentElement?.remove())
}

describe('Toast', () => {
  afterEach(() => {
    removeAllToasts()
    vi.useRealTimers()
    // reset global defaults
    setToastGlobalOptions({ duration: 3000, position: 'top', closable: true })
  })

  it('1) show function renders Toast', async () => {
    vi.useFakeTimers()

    setToastGlobalOptions({ duration: 5000, position: 'top', closable: true })
    const close = show('Hello Toast')

    await nextTick()
    expect(getToasts().length).toBe(1)
    expect(document.body.querySelector('.toast__content')?.textContent).toContain('Hello Toast')

    close()
    vi.advanceTimersByTime(300)
    await nextTick()
    expect(getToasts().length).toBe(0)
  })

  it('2) auto-close works', async () => {
    vi.useFakeTimers()

    setToastGlobalOptions({ duration: 50, position: 'top', closable: true })
    show('Auto Close')

    await nextTick()
    expect(getToasts().length).toBe(1)

    // 先触发 Toast.vue 内部 duration close，再等待 index.ts 的 LEAVE_MS(220)
    vi.advanceTimersByTime(50 + 240)
    await nextTick()

    expect(getToasts().length).toBe(0)
  })

  it('3) manual close works', async () => {
    vi.useFakeTimers()

    setToastGlobalOptions({ duration: 10000, position: 'top', closable: true })
    const close = show('Manual Close')

    await nextTick()
    expect(getToasts().length).toBe(1)

    close()
    vi.advanceTimersByTime(260)
    await nextTick()

    expect(getToasts().length).toBe(0)
  })

  it('4) different types have different style classes', async () => {
    vi.useFakeTimers()
    setToastGlobalOptions({ duration: 10000, position: 'top', closable: true })

    const closeSuccess = show.success('成功')
    await nextTick()
    expect(document.body.querySelector('.toast--type-success')).toBeTruthy()
    closeSuccess()
    vi.advanceTimersByTime(260)
    await nextTick()

    const closeError = show.error('失败')
    await nextTick()
    expect(document.body.querySelector('.toast--type-error')).toBeTruthy()
    closeError()
    vi.advanceTimersByTime(260)
    await nextTick()

    const closeWarning = show.loading('加载中...')
    await nextTick()
    // loading 在 index.ts 里使用 info 类型
    expect(document.body.querySelector('.toast--type-info')).toBeTruthy()
    closeWarning()
  })
})

