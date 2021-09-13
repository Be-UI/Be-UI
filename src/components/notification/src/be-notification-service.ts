/*
* @be-notification-service.ts
* @description notification服务调用脚本
* @author czh
* @update (czh 2021/06/07)
*/
import {createVNode, render, DefineComponent} from 'vue';
import beNotifyComponents from './be-notification';
import type { INotifyOption, ItInstanceMap} from './be-notification-type'

// 各個方向的實例緩存
let instanceMap:ItInstanceMap = {
    topLeft:[],
    topRight:[],
    bottomLeft:[],
    bottomRight:[]
}
// 是否缓存标识
let isCache:boolean = false
/**
 * 关闭方法
 * @param {Object} instance - 组件实例上下文
 * @param {Boolean} isAll - 是否关闭全部
 */
const closeNotify = function (instance:DefineComponent,isAll:boolean = false):void{
    if (!instance) return;
    let index = -1
    let pacement:string = (instance.props && instance.props.option.placement)
    const instanceUid:number = (instance.component && instance.component.uid) || instance.uid
    const instanceEl = instance.el || instance.ctx.$el
    let instancesList = Object(instanceMap)[pacement]
    let direction = /^top-/.test(pacement) ? 'top' : 'bottom';
    let len = instancesList.length
    // 關閉全部
    if(isAll){
        closeAll()
        return
    }
    // 从缓存中找到要删除的组件实例索引
    try {
        instancesList.forEach((val:DefineComponent, i:number) => {
            if (instanceUid=== val.instance.component.uid) {
                index = i;
                throw new Error('EndIterative');
            }
        });
    }catch(e) {
        if(e.message!=="EndIterative") throw e;
    }
    // 獲取要關閉的組件實例
    let currentInstance = instancesList[index]
    // 从缓存中删除
    instancesList.splice(index, 1);
    if (len < 1) return;
    // 計算刪除後的其他組件偏移
    const removedHeight = instanceEl.offsetHeight;
    for (let i = index; i < len - 1 ; i++) {
            instancesList[i].instance.el.style[direction] =
            parseInt(instancesList[i].instance.el.style[direction], 10) - removedHeight - 35 + 'px';
    }
    // 根据组件uid过滤组件实例
    Object(instanceMap)[pacement] = Object(instanceMap)[pacement].filter((val:any) => {
        return val.instance.component.uid !== instanceUid
    })
    // 关闭
    close(instanceEl,currentInstance.elm)

}

/**
 * 關閉方法
 * @param compInstance 組件實例
 * @param elm 挂載元素dom
 */
const close = (compInstance:HTMLElement,elm:HTMLElement):void=>{
    if (compInstance && compInstance.parentNode) {
        render(null, elm)
    }
}
/**
 * 關閉全部方法
 */
const closeAll = ():void=>{
    Object.keys(instanceMap).forEach((placement:any)=>{
        placement.forEach((val:any)=>{
            close(val.instance.el,val.elm)
        })
    })
    instanceMap = {
        topLeft:[],
        topRight:[],
        bottomLeft:[],
        bottomRight:[]
    }
}
/**
 * 計算偏移
 * @param {Object} option - 配置對象
 * @param {Array} instanceArr - 組件緩存數組
 * @param {Boolean} isCache - 當前實例是否緩存過
 */
const computeOffset = (option:INotifyOption,instanceArr:Array<Object>,isCache:boolean,instance:any):void=>{
    // 计算偏移
    let verticalOffset:number = 0;
    let direction:string = ''
    if (option.placement === 'topLeft' || option.placement === 'topRight') {
        verticalOffset = option.offsetTop || 0
        direction = 'offsetTop'
    }
    if (option.placement === 'bottomLeft' || option.placement === 'bottomRight') {
        verticalOffset = option.offsetBottom || 0
        direction = 'offsetBottom'
    }
    if (!isCache) {
        instanceArr.forEach((item:any) => {
            verticalOffset += (item.instance.el.offsetHeight || 0 )+ 35;
        });
    }
    verticalOffset += 35;
    instance.el.style.bottom = verticalOffset + 'px'
}

/**
 * 渲染组件实例
 * @param {Object} option - 配置對象
 * @param {Array} instanceArr - 組件緩存數組
 * @param {Boolean} isCacheInner - 當前實例是否緩存過
 * @param instance
 */
const componentRender = (option:INotifyOption,instanceArr:Array<Object>,isCacheInner:boolean,instance:any):any=>{
    let elm:any =null
    let instanceInner = instance
    // 如果instance 为null，则是没有传入key 或者没有匹配到实例缓存，就创建新的
    if (!instanceInner) {
        instanceInner = createVNode(beNotifyComponents, {option});
        instanceInner.props.option.isShow = true;
        elm = document.createElement('div')
        render(instanceInner,elm)
        const bodyElement:Element | null= document.querySelector('body')
        if (bodyElement && bodyElement.append) {
            bodyElement.append(instanceInner.el)
        } else {
            bodyElement && bodyElement.appendChild(instanceInner.el)
        }
    } else {
        // 找到原先的实例，删除，再更新option 重新渲染
        let placement = option.placement || 'topRight'
        let instancesList = Object(instanceMap)[placement]
        let instanceCache:any = null
        let indexCache:any = null
        instancesList.forEach((val:any,index:number) => {
           if(val.instance.component.uid === instanceInner.instance.component.uid){
               instanceCache = val.elm
               indexCache = index
           }

        })
        if(!instanceCache || !indexCache && indexCache !== 0) return
        instancesList.splice(indexCache, 1);
        render(null,instanceCache)
        isCache = false
        instanceInner = componentRender(option,instanceArr,isCache,null)
    }
    if (!isCacheInner) {
        // 缓存组件对象
        instanceArr.push({instance:instanceInner,elm})
    }
    return instanceInner
}
/**
 * 創建组件实例
 * @param {Object} options - 配置對象
 */
const createNotify = function (options:INotifyOption) :object {
    // 初始默认配置
    const defaultOption= {
        isShow:false,
        style: {},
        placementSelf:'',
        titles:'',//
        customClass:'',//
        msgType:'warning',//
        offsetTop:0,//
        offsetBottom:0,//
        placement:'topRight',//
        bodyRender:null,//
        iconPreRender:null,//
        closeRender:null,//
        description:'',//
        duration:4500,//
        key:'',//
        timer:0,//
        onClose: undefined,//关闭回调方法
        onClick:undefined,  //点击回调方法
        closeNotify
    }
    // 合并配置参数
    let option:INotifyOption = Object.assign({}, defaultOption, options)
    // 根据方向，获取缓存实例列表
    let instanceArr:Array<Object> = []
    if (option.placement === undefined) {
        instanceArr  = instanceMap.topRight as Array<Object>
    } else {
        instanceArr = Object(instanceMap)[option.placement]
    }

    let instance:any = null
    // 如果传入了key，则遍历实例缓存，拿到对应实例
    if (option.key) {
        instanceArr.forEach((val:any) => {
            if (val.instance.props.option.key === option.key) {
                isCache = true
                instance = val
            }
        })
    }
    // 渲染组件实例
    instance = componentRender(option,instanceArr,isCache,instance)
    // 计算偏移
    computeOffset(option,instanceArr,isCache,instance)
    return {notify: instance, close: closeNotify.bind(this, instance)}
}

export const BeNotify = (options:INotifyOption):object =>{
    return createNotify(options)
};