
import { ComponentInternalInstance } from 'vue'

export interface IInputSelectInst extends ComponentInternalInstance {
  uid: number
}

export interface IInputSelectFunc extends ComponentInternalInstance{
  close: Function
  changeDisplay: Function
  computePosition: Function
  show: boolean
}
