/*
* @be-progress-type.d.ts.ts
* @deprecated 
* @author czh
* @update (czh 2022/3/1)
*/
import type {ComponentInternalInstance,} from 'vue'


export interface IProgress {
    install?: Function
    name: string
}

export interface IProgressInst extends ComponentInternalInstance {
    uid: number
}
export interface IProgressColor{
    to:string
    from:string
}
export interface IProgressSuccess{
    percent:number
    color:string
}
