import { ComponentInternalInstance } from 'vue'

export interface ISwitch {
  install?: Function
  name: string
}

export interface ISwitchInst extends ComponentInternalInstance {
  uid: number
}
