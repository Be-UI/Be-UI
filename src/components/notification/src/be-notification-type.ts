/*
* @be-notification-type.ts
* @deprecated 
* @author czh
* @update (czh 2021/9/8)
*/
import type { VNode } from 'vue'
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
    bodyRender: any,//完成
    iconPreRender: any,//完成
    closeRender: any,//完成
}
export type NotificationVM = VNode
type ItInstanceMapItem = {
    vm: NotificationVM
}
export type ItInstanceMap = {
    topLeft?: Array<ItInstanceMapItem>,
    topRight?: Array<ItInstanceMapItem>,
    bottomLeft?: Array<ItInstanceMapItem>,
    bottomRight?: Array<ItInstanceMapItem>,
}