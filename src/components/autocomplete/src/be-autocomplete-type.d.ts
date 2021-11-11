/*
* @be-autocomplete-type.d.ts.ts
* @deprecated 
* @author czh
* @update (czh 2021/10/15)
*/
import {ComponentInternalInstance} from "vue";

export interface IInputSelectInst extends ComponentInternalInstance {
    uid: number
}
export interface IInputSelectFunc {
    close:Function
    changeDisplay:Function,
    computePosition:Function,
    show:boolean
}