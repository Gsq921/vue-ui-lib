<template>
  <button
    :class="classes"
    :disabled="isDisabled"
    type="button"
    @click="handleClick"
  >
    <span v-if="loading" class="btn__spinner" aria-hidden="true" />
    <i v-else-if="icon" class="btn__icon" :class="icon" aria-hidden="true" />
    <span class="btn__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { ButtonEmits, ButtonProps } from './types'

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'medium',
  loading: false,
  disabled: false,
})

const emit = defineEmits<ButtonEmits>()

const isDisabled = computed(() => props.disabled || props.loading)

const classes = computed(() => {
  return [
    'btn',
    `btn--type-${props.type}`,
    `btn--size-${props.size}`,
    {
      'btn--loading': props.loading,
      'btn--disabled': isDisabled.value,
    },
  ]
})

function handleClick(e: MouseEvent) {
  // loading/disabled 状态下不触发 click
  if (isDisabled.value) return
  emit('click', e)
}
</script>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0 14px;

  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  user-select: none;

  transition: background-color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease,
    transform 0.05s ease;

  &__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  &__spinner {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.35);
    border-top-color: rgba(255, 255, 255, 1);
    animation: btn-spin 0.8s linear infinite;
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
  }

  &--disabled,
  &:disabled {
    opacity: 0.6;
  }

  // Size
  &--size-small {
    height: 30px;
    font-size: 13px;
    padding: 0 12px;
  }

  &--size-medium {
    height: 36px;
    font-size: 14px;
    padding: 0 14px;
  }

  &--size-large {
    height: 42px;
    font-size: 15px;
    padding: 0 16px;
  }

  // Type
  &--type-primary {
    background-color: #1677ff;
    border-color: #1677ff;
    color: #fff;

    &:hover:not(:disabled) {
      background-color: #0f5fd8;
      border-color: #0f5fd8;
    }
  }

  &--type-success {
    background-color: #52c41a;
    border-color: #52c41a;
    color: #fff;

    &:hover:not(:disabled) {
      background-color: #389e0d;
      border-color: #389e0d;
    }
  }

  &--type-danger {
    background-color: #ff4d4f;
    border-color: #ff4d4f;
    color: #fff;

    &:hover:not(:disabled) {
      background-color: #d9363e;
      border-color: #d9363e;
    }
  }

  &--type-default {
    background-color: #ffffff;
    border-color: #d9d9d9;
    color: #1f1f1f;

    &:hover:not(:disabled) {
      background-color: #f5f5f5;
      border-color: #bfbfbf;
    }

    .btn__spinner {
      // default 按钮 spinner 颜色对比
      border: 2px solid rgba(0, 0, 0, 0.12);
      border-top-color: rgba(0, 0, 0, 0.65);
    }
  }

  &--loading {
    // loading 状态下可以加一个视觉提示
  }
}

@keyframes btn-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>