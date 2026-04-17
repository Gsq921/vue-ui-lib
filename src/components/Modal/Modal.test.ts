import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import Modal from './Modal.vue'

function getPanel() {
  return document.body.querySelector('.modal__panel')
}

function getOverlay() {
  return document.body.querySelector('.modal__overlay')
}

function getCloseButton() {
  return document.body.querySelector('.modal__close')
}

describe('Modal', () => {
  const originalOverflow = document.body.style.overflow
  const originalPaddingRight = document.body.style.paddingRight

  // reset style between tests (important for scroll lock)
  afterEach(() => {
    document.body.style.overflow = originalOverflow
    document.body.style.paddingRight = originalPaddingRight
  })

  it('1) visible controls show/hide', async () => {
    const wrapper = mount(Modal, {
      props: {
        visible: false,
        title: 'T',
        width: '520px',
        showClose: true,
        closeOnClickOverlay: true,
      },
      slots: {
        default: 'Body',
      },
    })

    expect(getPanel()).toBeNull()

    await wrapper.setProps({ visible: true })
    expect(getPanel()).not.toBeNull()

    await wrapper.setProps({ visible: false })
    expect(getPanel()).toBeNull()

    await wrapper.unmount()
  })

  it('2) clicking overlay closes', async () => {
    const wrapper = mount(Modal, {
      props: {
        visible: true,
        title: '',
        width: '520px',
        showClose: true,
        closeOnClickOverlay: true,
      },
    })

    const overlay = getOverlay()
    expect(overlay).not.toBeNull()
    overlay!.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    const updateEvents = wrapper.emitted('update:visible')
    expect(updateEvents).toBeTruthy()
    expect(updateEvents?.[0]).toEqual([false])

    await wrapper.setProps({ visible: false })
    expect(getPanel()).toBeNull()

    await wrapper.unmount()
  })

  it('3) clicking close button closes', async () => {
    const wrapper = mount(Modal, {
      props: {
        visible: true,
        title: 'Hello',
        width: '520px',
        showClose: true,
        closeOnClickOverlay: false,
      },
    })

    const closeBtn = getCloseButton()
    expect(closeBtn).not.toBeNull()

    closeBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    const updateEvents = wrapper.emitted('update:visible')
    expect(updateEvents).toBeTruthy()
    expect(updateEvents?.[0]).toEqual([false])

    await wrapper.setProps({ visible: false })
    expect(getPanel()).toBeNull()

    await wrapper.unmount()
  })

  it('4) scroll lock: body overflow hidden while visible', async () => {
    const wrapper = mount(Modal, {
      props: {
        visible: true,
        title: 'Lock',
        width: '520px',
        showClose: false,
        closeOnClickOverlay: true,
      },
    })

    expect(document.body.style.overflow).toBe('hidden')

    await wrapper.setProps({ visible: false })
    // Modal should restore original overflow value (usually empty string)
    expect(document.body.style.overflow).toBe(originalOverflow)

    await wrapper.unmount()
  })

  it('5) slots render content', async () => {
    const wrapper = mount(Modal, {
      props: {
        visible: true,
        title: '',
        width: '520px',
        showClose: true,
        closeOnClickOverlay: true,
      },
      slots: {
        header: '<span class="test-header">My Header</span>',
        default: '<div class="test-body">My Body</div>',
        footer: '<div class="test-footer">My Footer</div>',
      },
    })

    expect(getPanel()).not.toBeNull()
    expect(document.body.querySelector('.test-header')?.textContent).toBe('My Header')
    expect(document.body.querySelector('.test-body')?.textContent).toBe('My Body')
    expect(document.body.querySelector('.test-footer')?.textContent).toBe('My Footer')

    await wrapper.unmount()
  })
})

