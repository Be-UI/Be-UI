/*
* @be-input-number-type.ts
* @deprecated 
* @author czh
* @update (czh 2021/11/12)
*/
import type { ComponentInternalInstance} from 'vue'
export type IInputNum = {
    titles?: string,
    customClass?: string,
    msgType?: string,
    offsetTop?: number,
    placement?: string,
    duration?: number,
    key?: string,
    onClose?: () => void
    iconPreRender: any,
    closeRender: any,
    compType:string,
    close?:boolean,
    loading?:boolean,
}

export type ItInstanceMap = {
    topLeft?: Array<Object>,
    topRight?: Array<Object>,
    bottomLeft?: Array<Object>,
    bottomRight?: Array<Object>,
}
export interface IInputNumInstance extends ComponentInternalInstance {
    uid: number
    el:HTMLElement
}
export interface IInputNumInst {
    message: IInputNumInstance,
    close: Function,
    update: Function,
}
export interface IInputNumLimit {
   type:string,
   val:string | number
}

