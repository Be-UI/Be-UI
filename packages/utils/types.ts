import type { Plugin } from 'vue'
// 定义插件类型，组件的引用会用到这个，然后走use、install
export type SFCWithInstall<T> = T & Plugin

export interface IEvent extends MouseEvent {
  path: Array<HTMLElement>
}
export type TimeoutHandle = ReturnType<typeof window.setTimeout>

export interface IOption {
  [key: string]: any
}

export interface IWindowLocation {
  hash?: string
  host?: string
  hostname?: string
  href?: string
  origin?: string
  pathname?: string
  port?: string
  protocol?: string
  search?: string
}

export type TLog = 'info' | 'error' | 'warning' | 'success'
