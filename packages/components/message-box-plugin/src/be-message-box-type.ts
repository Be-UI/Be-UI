import type { ComponentInternalInstance } from 'vue'

export interface INMsgOption {
  isShow?: boolean
  isDrag?: boolean
  titles?: string
  customClass?: string
  msgType?: string
  footerType?: string
  footerRender: any
  bodyRender: any
  iconPreRender: any
  iconNextRender: any
  isOpenModal?: boolean
  onConfirm?: () => void
  onClose?: () => void
}

export interface IMsg extends ComponentInternalInstance {
  uid: number
}
