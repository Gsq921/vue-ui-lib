import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Input from './Input.vue'

describe('Input', () => {
  it('1) supports v-model two-way binding', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'hello',
        size: 'medium',
        placeholder: 'Type...',
        disabled: false,
        readonly: false,
        clearable: false,
        maxlength: 0,
      },
    })

    await wrapper.find('input').setValue('world')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted?.length).toBe(1)
    expect(emitted?.[0]).toEqual(['world'])
  })

  it('2) clearable can clear input', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'abc',
        size: 'medium',
        placeholder: '',
        disabled: false,
        readonly: false,
        clearable: true,
        maxlength: 0,
      },
    })

    const clearBtn = wrapper.find('button.input__clear')
    expect(clearBtn.exists()).toBe(true)

    await clearBtn.trigger('click')

    // 受控组件：清空输入框需要父组件把 modelValue 更新为 ''
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]).toEqual([''])

    await wrapper.setProps({ modelValue: '' })
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('')
  })

  it('3) disabled disables input (and hides clear button)', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'abc',
        size: 'medium',
        placeholder: '',
        disabled: true,
        readonly: false,
        clearable: true,
        maxlength: 0,
      },
    })

    expect((wrapper.get('input').element as HTMLInputElement).disabled).toBe(true)
    expect(wrapper.find('button.input__clear').exists()).toBe(false)
  })

  it('4) maxlength limits and shows counter', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'abc',
        size: 'medium',
        placeholder: '',
        disabled: false,
        readonly: false,
        clearable: false,
        maxlength: 5,
      },
    })

    expect(wrapper.get('input').attributes('maxlength')).toBe('5')
    expect(wrapper.find('.input__counter').text()).toBe('3/5')
  })
})

