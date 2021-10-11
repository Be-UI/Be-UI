/*
* @be-pagenation-type.d.ts.ts
* @deprecated 
* @author czh
* @update (czh 2021/10/11)
*/
export interface IPageProvide{
    pageSize:number
    currentPage:number
    isFront:boolean
    layout:Array<string>
    pageData:Array<any>
    isDynamic:boolean
    disabledJump:boolean
    disabled:boolean
    pagerShowCount:number
    pageCount:number
    jumpPage:string,
    pageParamsFront:any,
    pageNumVal:string
}
