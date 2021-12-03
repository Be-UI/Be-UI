import type {Plugin} from 'vue'
import {ComponentInternalInstance} from "vue";
import {Ref} from "@vue/reactivity";
// 定义插件类型，组件的引用会用到这个，然后走use、install
export type SFCWithInstall<T> = T & Plugin

export interface IEvent extends MouseEvent {
    path: Array<HTMLElement>
}
export type TimeoutHandle = ReturnType<typeof window.setTimeout>

export interface IOption {
    [key: string]: any
}
export declare type VNodeNormalizedRefAtom = {
    i: ComponentInternalInstance;
    r: VNodeRef;
    f?: boolean;
};
export declare type VNodeRef = string | Ref | ((ref: object | null, refs: Record<string, any>) => void);