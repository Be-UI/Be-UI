/*
 * @be-notification-type.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/9/8)
 */
import type { ComponentInternalInstance } from 'vue'

export type INotifyOption = {
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
  onClick?: () => void
  compType?: string
  close?: boolean
  isUpdate?: boolean
  bodyRender?: any
  iconPreRender?: any
  closeRender?: any
}

export type ItInstanceMap = {
  topLeft?: Array<any>
  topRight?: Array<any>
  bottomLeft?: Array<any>
  bottomRight?: Array<any>
  topCenter?: Array<any>
}

export interface INotfiy extends ComponentInternalInstance {
  uid: number
  el: HTMLElement
}

export interface INotfiyInst {
  notify: INotfiy
  close: Function
}
