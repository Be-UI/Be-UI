import type { ComponentInternalInstance, VNode } from 'vue'

export interface IBreadcrumb {
  install?: Function
  name: string
}

export interface IBreadcrumbInst extends ComponentInternalInstance {
  uid: number
}
export interface IBreadcrumbItemVnode extends VNode {
  beBreadcrumbIndex?: string
}
export interface IBreadcrumbPopover {
  close: Function
  changeDisplay: Function
  addEvent: Function
  computePosition: Function
  show: boolean
}
