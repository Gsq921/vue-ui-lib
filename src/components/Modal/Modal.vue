<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="visibleModel" class="modal">
        <div class="modal__overlay" @click="onOverlayClick" />

        <div
          class="modal__panel"
          :style="{ width }"
          role="dialog"
          aria-modal="true"
          @click.stop
        >
          <div v-if="title || hasHeaderSlot" class="modal__header">
            <slot name="header">
              <div class="modal__headerInner">
                <div class="modal__title">{{ title }}</div>
                <button
                  v-if="showClose"
                  class="modal__close"
                  type="button"
                  aria-label="Close"
                  @click="onClose"
                >
                  ×
                </button>
              </div>
            </slot>
          </div>

          <div class="modal__body">
            <slot />
          </div>

          <div v-if="hasFooterSlot" class="modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, watch, useSlots } from 'vue'

import type { ModalEmits, ModalProps } from './types'

const props = withDefaults(defineProps<ModalProps>(), {
  visible: false,
  title: '',
  width: '520px',
  showClose: true,
  closeOnClickOverlay: true,
})

const emit = defineEmits<ModalEmits>()

// v-model:visible
const visibleModel = computed({
  get: () => props.visible,
  set: (val: boolean) => emit('update:visible', val),
})

const slots = useSlots()
const hasHeaderSlot = computed(() => Boolean(slots.header))
const hasFooterSlot = computed(() => Boolean(slots.footer))

function onClose() {
  if (!props.visible) return
  emit('update:visible', false)
  emit('close')
}

function onOverlayClick() {
  if (!props.closeOnClickOverlay) return
  onClose()
}

// -------- scroll lock (prevent background scroll-through) --------
let lockCount = 0
let prevOverflow = ''
let prevPaddingRight = ''

function lockBodyScroll() {
  // in SSR / non-browser env guard
  if (typeof document === 'undefined') return
  const body = document.body
  const documentEl = document.documentElement

  // 记录原值（只在第一次锁定时记录）
  prevOverflow = body.style.overflow
  prevPaddingRight = body.style.paddingRight

  // 避免隐藏滚动条导致页面抖动
  const scrollBarWidth = window.innerWidth - documentEl.clientWidth
  if (scrollBarWidth > 0) body.style.paddingRight = `${scrollBarWidth}px`
  body.style.overflow = 'hidden'
}

function unlockBodyScroll() {
  if (typeof document === 'undefined') return
  const body = document.body
  body.style.overflow = prevOverflow
  body.style.paddingRight = prevPaddingRight
}

watch(
  () => props.visible,
  (val) => {
    if (val) {
      lockCount += 1
      if (lockCount === 1) lockBodyScroll()
    } else {
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) unlockBodyScroll()
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  // 如果组件被卸载但仍然可见，也要释放锁
  if (props.visible) {
    lockCount = Math.max(0, lockCount - 1)
    if (lockCount === 0) unlockBodyScroll()
  }
})
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  &__overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.45);
  }

  &__panel {
    position: relative;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.25);
    overflow: hidden;
  }

  &__header {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
  }

  &__headerInner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  &__title {
    font-size: 16px;
    font-weight: 700;
    color: #1f1f1f;
  }

  &__close {
    border: none;
    background: transparent;
    cursor: pointer;

    width: 32px;
    height: 32px;
    border-radius: 8px;

    font-size: 18px;
    color: #595959;
    transition: background-color 0.15s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }

  &__body {
    padding: 20px;
  }

  &__footer {
    padding: 16px 20px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}

// fade transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

