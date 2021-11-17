/*
* @be-message-type.ts
* @deprecated 
* @author czh
* @update (czh 2021/11/12)
*/
import type {ComponentInternalInstance} from 'vue'

export type IMessage = {
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
    compType: string,
    close?: boolean,
    loading?: boolean,
}

export type ItInstanceMap = {
    topLeft?: Array<Object>,
    topRight?: Array<Object>,
    bottomLeft?: Array<Object>,
    bottomRight?: Array<Object>,
}

export interface IMsgInstance extends ComponentInternalInstance {
    uid: number
    el: HTMLElement
}

export interface IMsgInst {
    message: IMsgInstance,
    close: Function,
    update: Function,
}

