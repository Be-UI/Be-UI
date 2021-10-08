/*
* @be-loading-type.d.ts
* @deprecated 
* @author czh
* @update (czh 2021/10/8)
*/
import type { ComponentInternalInstance,} from 'vue'
export interface ILoading {
    install?:Function
    name:string
}
export interface ILoadingInst extends ComponentInternalInstance {
    uid: number
    attrs:any
    ctx:any
}
export interface IPosStyle {
    width:string | number
    height:string | number
    top:string | number
    left:string | number
    right:number
    bottom:number
}