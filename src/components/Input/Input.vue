<template>
  <div :class="classes" :aria-disabled="isDisabled">
    <input
      :class="['input__field', { 'input__field--readonly': readonly }]"
      type="text"
      :value="model"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :readonly="readonly"
      :maxlength="htmlMaxlength"
      @input="onInput"
    />

    <button
      v-if="showClear"
      class="input__clear"
      type="button"
      :disabled="isDisabled || readonly"
      aria-label="Clear"
      @click="clear"
    >
      <span class="input__clear-icon" aria-hidden="true">×</span>
    </button>

    <div class="input__counter" aria-hidden="true">
      {{ counterText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InputSize } from './types'

type Props = {
  modelValue: string
  size: InputSize
  placeholder: string
  disabled: boolean
  readonly: boolean
  clearable: boolean
  maxlength: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  placeholder: '',
  disabled: false,
  readonly: false,
  clearable: false,
  maxlength: 0,
  modelValue: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// v-model 双向绑定（使用 computed getter/setter）
const model = computed<string>({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const isDisabled = computed(() => props.disabled)

const htmlMaxlength = computed(() => {
  // 约定：maxlength <= 0 表示不限制
  return props.maxlength > 0 ? props.maxlength : undefined
})

const counterText = computed(() => {
  const count = model.value?.length ?? 0
  return props.maxlength > 0 ? `${count}/${props.maxlength}` : `${count}`
})

const showClear = computed(() => {
  if (!props.clearable) return false
  if (isDisabled.value || props.readonly) return false
  return (model.value?.length ?? 0) > 0
})

const classes = computed(() => {
  return [
    'input',
    `input--size-${props.size}`,
    {
      'input--disabled': isDisabled.value,
      'input--readonly': props.readonly,
      'input--has-clear': showClear.value,
    },
  ]
})

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  model.value = target.value
}

function clear() {
  if (isDisabled.value || props.readonly) return
  model.value = ''
}
</script>

<style scoped lang="scss">
.input {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;

  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background-color: #ffffff;

  padding: 0 10px;
  transition: border-color 0.15s ease, background-color 0.15s ease, opacity 0.15s ease;

  &__field {
    flex: 1;
    width: 100%;
    border: none;
    outline: none;
    background: transparent;

    font-size: 14px;
    padding: 10px 0;
    color: #1f1f1f;

    &--readonly {
      cursor: default;
    }
  }

  &__clear {
    flex: 0 0 auto;
    border: none;
    background: transparent;
    cursor: pointer;

    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    color: #8c8c8c;
    transition: background-color 0.15s ease, color 0.15s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
      color: #595959;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  &__clear-icon {
    font-size: 18px;
    line-height: 1;
    transform: translateY(-1px);
  }

  &__counter {
    position: absolute;
    right: 10px;
    bottom: 7px;

    font-size: 12px;
    color: #bfbfbf;
    user-select: none;
    pointer-events: none;
  }

  // Size
  &--size-small {
    .input__field {
      font-size: 13px;
      padding: 8px 0;
    }

    .input__counter {
      bottom: 6px;
    }
  }

  &--size-medium {
    .input__field {
      font-size: 14px;
      padding: 10px 0;
    }

    .input__counter {
      bottom: 7px;
    }
  }

  &--size-large {
    .input__field {
      font-size: 15px;
      padding: 12px 0;
    }

    .input__counter {
      bottom: 8px;
    }
  }

  // States
  &--disabled {
    opacity: 0.6;
    background-color: #f5f5f5;
    cursor: not-allowed;
  }

  &--readonly {
    background-color: #fafafa;
  }
}
</style>

