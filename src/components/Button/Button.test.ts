import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Button from './Button.vue'

describe('Button', () => {
  it('1) should render normally', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'default',
        size: 'medium',
        loading: false,
        disabled: false,
      },
      slots: {
        default: 'Button',
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.text()).toContain('Button')
    expect(wrapper.find('.btn__spinner').exists()).toBe(false)
  })

  it('2) type prop changes style class', async () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        size: 'medium',
        loading: false,
        disabled: false,
      },
      slots: { default: 'Test' },
    })

    expect(wrapper.classes()).toContain('btn--type-primary')

    await wrapper.setProps({ type: 'success' })
    expect(wrapper.classes()).toContain('btn--type-success')
  })

  it('3) loading state shows spinner and disables button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'default',
        size: 'medium',
        loading: true,
        disabled: false,
      },
      slots: { default: 'Loading' },
    })

    const button = wrapper.get('button')
    expect(wrapper.find('.btn__spinner').exists()).toBe(true)
    expect(button.element).toBeInstanceOf(HTMLButtonElement)
    expect((button.element as HTMLButtonElement).disabled).toBe(true)
  })

  it('4) disabled state disables button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'default',
        size: 'medium',
        loading: false,
        disabled: true,
      },
      slots: { default: 'Disabled' },
    })

    const button = wrapper.get('button')
    expect((button.element as HTMLButtonElement).disabled).toBe(true)
    expect(wrapper.find('.btn__spinner').exists()).toBe(false)
  })

  it('5) click event triggers', async () => {
    const wrapper = mount(Button, {
      props: {
        type: 'default',
        size: 'medium',
        loading: false,
        disabled: false,
      },
      slots: { default: 'Click' },
    })

    await wrapper.get('button').trigger('click')

    const emitted = wrapper.emitted('click')
    expect(emitted).toBeTruthy()
    expect(emitted?.length).toBe(1)
  })
})
