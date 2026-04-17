export type ModalProps = {
  visible: boolean
  title: string
  width: string
  showClose: boolean
  closeOnClickOverlay: boolean
}

export type ModalEmits = {
  (e: 'update:visible', value: boolean): void
  (e: 'close'): void
}

