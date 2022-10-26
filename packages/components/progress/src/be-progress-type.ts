import type { ComponentInternalInstance } from 'vue'

export interface IProgress {
  install?: Function
  name: string
}

export interface IProgressInst extends ComponentInternalInstance {
  uid: number
}
export type IProgressColor = { to: string; from: string } | string

export interface IProgressSuccess {
  percent: number
  color: string
}
