<template>
  <Teleport to="body">
    <transition name="toast-fade" @after-leave="dispatchUpdate">
      <div
        v-if="internalVisible"
        ref="toastEl"
        :class="classes"
        class="toast"
        :data-toast-position="position"
        :style="toastStyle"
      >
        <span v-if="hasIcon" class="toast__icon" aria-hidden="true" />

        <div class="toast__content">
          <slot>{{ message }}</slot>
        </div>

        <button
          v-if="closable"
          class="toast__close"
          type="button"
          aria-label="Close"
          @click="close"
        >
          ×
        </button>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

import type { ToastEmits, ToastProps } from './types'

const props = withDefaults(defineProps<ToastProps>(), {
  duration: 3000,
  position: 'top',
  visible: true,
  message: '',
  closable: true,
})

const emit = defineEmits<ToastEmits>()

// 内部可控：保证 duration 自动关闭不依赖父组件同步 visible
const internalVisible = ref(props.visible)
watch(
  () => props.visible,
  (val) => {
    internalVisible.value = val
  },
)

const toastEl = ref<HTMLElement | null>(null)
const offsetY = ref(0)
const gapPx = 8

const hasIcon = true

const classes = computed(() => {
  return [
    'toast',
    `toast--type-${props.type}`,
    `toast--position-${props.position}`,
  ]
})

function baseStyle() {
  if (props.position === 'top') {
    return {
      top: '16px',
      bottom: 'auto',
      transform: `translateX(-50%) translateY(${offsetY.value}px)`,
    }
  }

  if (props.position === 'bottom') {
    return {
      top: 'auto',
      bottom: '16px',
      transform: `translateX(-50%) translateY(${-offsetY.value}px)`,
    }
  }

  // center
  return {
    top: '50%',
    bottom: 'auto',
    transform: `translate(-50%, -50%) translateY(${offsetY.value}px)`,
  }
}

const toastStyle = computed(() => baseStyle())

let timer: number | undefined

function startTimer() {
  stopTimer()
  const ms = props.duration
  if (!ms || ms <= 0) return
  timer = window.setTimeout(() => close(), ms)
}

function stopTimer() {
  if (timer) window.clearTimeout(timer)
  timer = undefined
}

function close() {
  if (!internalVisible.value) return
  internalVisible.value = false
  emit('update:visible', false)
  emit('close')
  // 元素离场后 DOM 会更新，触发一次刷新让其它 toast 重新计算堆叠偏移
  dispatchUpdate()
}

function dispatchUpdate() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('vue-ui-lib:toast-update', { detail: { position: props.position } }))
}

function recomputeOffset() {
  const el = toastEl.value
  if (!el) return

  const pos = props.position
  const all = Array.from(
    document.body.querySelectorAll<HTMLElement>(`.toast[data-toast-position="${pos}"]`),
  ).filter((n) => n.offsetHeight > 0) // 只统计已渲染出来的 toast

  const idx = all.indexOf(el)
  if (idx <= 0) {
    offsetY.value = 0
    return
  }

  let sum = 0
  for (let i = 0; i < idx; i++) {
    sum += all[i].offsetHeight + gapPx
  }
  offsetY.value = sum
}

watch(
  internalVisible,
  (val) => {
    if (val) startTimer()
    else stopTimer()
  },
  { immediate: true },
)

// 堆叠偏移：挂载后以及其它 toast 状态变化时重新计算
function onUpdate(e: Event) {
  const detail = (e as CustomEvent).detail as { position?: ToastPosition } | undefined
  if (detail?.position && detail.position !== props.position) return
  // next frame 让 DOM 布局生效（避免 offsetHeight 为 0）
  requestAnimationFrame(() => recomputeOffset())
}

if (typeof window !== 'undefined') {
  window.addEventListener('vue-ui-lib:toast-update', onUpdate)
}

watch(internalVisible, (val) => {
  if (val) {
    requestAnimationFrame(() => recomputeOffset())
  }
})

onBeforeUnmount(() => {
  stopTimer()
  if (typeof window !== 'undefined') {
    window.removeEventListener('vue-ui-lib:toast-update', onUpdate)
  }
})
</script>

<style scoped lang="scss">
.toast {
  position: fixed;
  left: 50%;
  z-index: 99999;

  min-width: 280px;
  max-width: 520px;
  padding: 12px 40px 12px 16px;

  border-radius: 10px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);

  display: flex;
  align-items: center;
  gap: 10px;

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.14);
}

.toast__icon {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex: 0 0 auto;
}

.toast__content {
  color: #1f1f1f;
  font-size: 13px;
  line-height: 1.4;
  flex: 1 1 auto;
  word-break: break-word;
}

.toast__close {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  border: none;
  background: transparent;
  cursor: pointer;

  width: 28px;
  height: 28px;
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.45);

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    color: rgba(0, 0, 0, 0.65);
  }
}

.toast--type-success {
  border-color: rgba(82, 196, 26, 0.35);
  background: rgba(82, 196, 26, 0.08);

  .toast__icon {
    background: #52c41a;
  }
}

.toast--type-error {
  border-color: rgba(255, 77, 79, 0.35);
  background: rgba(255, 77, 79, 0.08);

  .toast__icon {
    background: #ff4d4f;
  }
}

.toast--type-warning {
  border-color: rgba(250, 173, 20, 0.35);
  background: rgba(250, 173, 20, 0.08);

  .toast__icon {
    background: #faad14;
  }
}

.toast--type-info {
  border-color: rgba(22, 119, 255, 0.35);
  background: rgba(22, 119, 255, 0.08);

  .toast__icon {
    background: #1677ff;
  }
}

// fade animation
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
}
</style>

