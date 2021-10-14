/*
* @be-input-type.d.ts.ts
* @deprecated 
* @author czh
* @update (czh 2021/10/13)
*/
import {ComponentInternalInstance} from "vue";

export interface IInputInst extends ComponentInternalInstance {
    uid: number
}
export interface IInputSelectInst {
    close:Function
}