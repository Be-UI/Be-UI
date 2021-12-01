/*
* @be-breadcrumb-type.ts.ts
* @deprecated 
* @author czh
* @update (czh 2021/11/22)
*/
import {ComponentInternalInstance, VNode} from "vue";

export interface IBreadcrumb {
    install?: Function
    name: string
}

export interface IBreadcrumbInst extends ComponentInternalInstance {
    uid: number
}
export interface IBreadcrumbItemVnode extends VNode {
    beBreadcrumbIndex?:string
}
export interface IBreadcrumbPopover {
    close: Function
    changeDisplay: Function,
    addEvent:Function,
    computePosition: Function,
    show: boolean
}