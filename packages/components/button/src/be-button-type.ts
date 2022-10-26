/*
 * @be-icon.d.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/9/29)
 */
import type { ComponentInternalInstance } from 'vue'

export interface IButton {
  install?: Function
  name: string
}

export interface IButtonInst extends ComponentInternalInstance {
  uid: number
  attrs: any
}
