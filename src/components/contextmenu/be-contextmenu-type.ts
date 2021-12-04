/*
* @be-contextmenu-type.ts
* @deprecated 
* @author czh
* @update (czh 2021/12/3)
*/
import {ComponentInternalInstance, VNode} from "vue";
import {IOption} from "../../utils/types";


export interface IContextMenu extends ComponentInternalInstance {
    uid: number,
    addRef:Function,
    clientWidth:number,
    clientHeight:number
}
export interface IPosition {
    top:number | string
    left:number | string
}
export interface IPositionStr{
    top:number
    left:number
}
export interface refNode {
    vnode: VNode
    el: Node
}

export interface MyWindow extends Window {
    $BeContextmenu: any;
}
