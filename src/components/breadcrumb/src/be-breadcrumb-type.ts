/*
* @be-breadcrumb-type.ts.ts
* @deprecated 
* @author czh
* @update (czh 2021/11/22)
*/
import {ComponentInternalInstance} from "vue";

export interface IBreadcrumb {
    install?: Function
    name: string
}

export interface IBreadcrumbInst extends ComponentInternalInstance {
    uid: number
}