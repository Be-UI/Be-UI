/*
* @be-message-type.ts
* @deprecated 
* @author czh
* @update (czh 2021/11/12)
*/
import type { ComponentInternalInstance} from 'vue'
export type IMessage = {
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
export interface IMsgInstance extends ComponentInternalInstance {
    uid: number
}
export interface IMsgInst {
    message: IMsgInstance,
    close: Function,
}