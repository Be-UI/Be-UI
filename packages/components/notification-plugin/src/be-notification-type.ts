import type { ComponentInternalInstance } from 'vue'
export interface INotifyOption {
  titles?: string
  customClass?: string
  msgType?: string
  offsetTop?: number
  offsetBottom?: number
  placement?: string
  description?: string
  duration?: number
  key?: string
  onClose?: () => void
  onClick?: (e?:Event) => void
  compType?: string
  close?: boolean
  isUpdate?: boolean
  bodyRender?: any
  iconPreRender?: any
  closeRender?: any
  closeNotify?: Function
  placementSelf?: string
  style?: any
  loading?: boolean
  isShow?: boolean
}

export interface ItInstanceMap {
  topLeft?: Array<any>
  topRight?: Array<any>
  bottomLeft?: Array<any>
  bottomRight?: Array<any>
  topCenter?: Array<any>
}

export interface INotify extends ComponentInternalInstance {
  uid: number
  el: HTMLElement
}

export interface INotifyInst {
  notify: any
  close: any
}
