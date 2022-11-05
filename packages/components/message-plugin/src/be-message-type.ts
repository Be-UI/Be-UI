import type { ComponentInternalInstance } from 'vue'
import {INotifyOption} from "../../notification-plugin";

export interface IMessage extends INotifyOption{
  titles?: string
  customClass?: string
  msgType?: string
  offsetTop?: number
  placement?: string
  duration?: number
  key?: string
  onClose?: () => void
  iconPreRender?: any
  closeRender?: any
  compType?: string
  close?: boolean
  loading?: boolean
}

export interface ItInstanceMap {
  topLeft?: Array<any>
  topRight?: Array<any>
  bottomLeft?: Array<any>
  bottomRight?: Array<any>
}

export interface IMsgInstance extends ComponentInternalInstance {
  uid: number
  el: HTMLElement
}

export interface IMsgInst {
  message: any
  close: Function
  update: Function
}
