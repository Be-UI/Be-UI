/*
* @be-pagenation-type.d.ts.ts
* @deprecated 
* @author czh
* @update (czh 2021/10/11)
*/
import {ComponentInternalInstance, VNode} from "vue";
export interface IPageProvide{
    pageSize:number
    currentPage:number
    isFront:boolean
    layout:Array<string>
    pageData:Array<any>
    isDynamic:boolean
    isOrdianry:boolean
    disabledJump:boolean
    disabled:boolean
    pagerShowCount:number
    pageCount:number
    jumpPage:string,
    pageParamsFront:any,
    pageNumVal:string
}
export interface IPagerInst {
    onPagerClick:Function
}
export interface IPagerEvt {
    onUpdatePage: Function
    onChangePage: Function
    onGetPageCount:Function
}
export interface IPagerRenderLsit {
    page:VNode
    jump?:VNode
    info?:VNode
    next?:VNode
    prev?:VNode
    pNum?:VNode
}
export interface IPage extends ComponentInternalInstance {
    uid: number
}
export type IPageData = {
    currentPage: number
    pageCount: number
    pageSize: number
}
export interface IPageParamsFront {
    maxPageNum:number
}
export interface IPagerMix {
    jumpPage:string
    pageParamsFront:IPageParamsFront,
    pageNumVal:string
}
export interface IPagesFront {
    sliceList?:Map<any,any>
    frontList?:Array<number>,
    prePageFront?:Function,
    nextPageFront?:Function,
}
