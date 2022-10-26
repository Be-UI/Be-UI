import type { ComponentInternalInstance, VNode } from 'vue'

export interface IContextMenu extends ComponentInternalInstance {
  uid: number
  addRef: Function
  hide: Function
  clientWidth: number
  clientHeight: number
  install?: Function
  proxy: any
  name: string
}
export interface IPosition {
  top: number | string
  left: number | string
}
export interface IPositionStr {
  top: number
  left: number
}
export interface refNode {
  vnode: VNode
  el: Node
}
export interface MyWindow extends Window {
  $BeContextmenu: any
}
