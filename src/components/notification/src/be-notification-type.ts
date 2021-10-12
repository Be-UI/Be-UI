/*
* @be-notification-type.ts
* @deprecated 
* @author czh
* @update (czh 2021/9/8)
*/
import type { ComponentInternalInstance,DefineComponent} from 'vue'
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
    bodyRender: any,
    iconPreRender: any,
    closeRender: any,
}

export type ItInstanceMap = {
    topLeft?: Array<Object>,
    topRight?: Array<Object>,
    bottomLeft?: Array<Object>,
    bottomRight?: Array<Object>,
}
export interface INotfiy extends ComponentInternalInstance {
    uid: number
}