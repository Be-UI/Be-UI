/*
* @be-notification-type.ts
* @deprecated 
* @author czh
* @update (czh 2021/9/8)
*/
import type { ComponentInternalInstance} from 'vue'
export type INotifyOption = {
    titles?: string,
    customClass?: string,
    msgType?: string,
    offsetTop?: number,
    offsetBottom?: number,
    placement?: string,
    description?: string,
    duration?: number,
    key?: string,
    onClose?: () => void
    onClick?: () => void
    bodyRender?: any,
    iconPreRender?: any,
    closeRender?: any,
    compType?:string
    close?:boolean,
    isUpdate?:boolean
}

export type ItInstanceMap = {
    topLeft?: Array<Object>,
    topRight?: Array<Object>,
    bottomLeft?: Array<Object>,
    bottomRight?: Array<Object>,
    topCenter?: Array<Object>,
}
export interface INotfiy extends ComponentInternalInstance {
    uid: number
}
export interface INotfiyInst {
    notify: INotfiy,
    close: Function,
}