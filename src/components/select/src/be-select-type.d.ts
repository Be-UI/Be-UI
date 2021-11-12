/*
* @be-select-type.d.ts.ts
* @deprecated 
* @author czh
* @update (czh 2021/10/28)
*/
import {ComponentInternalInstance} from "vue";

export interface ISelect extends ComponentInternalInstance {
    uid: number
}

export interface IOption {
    [key: string]: any
}

