/*
* @be-notification-service.ts
* @description notification服务调用脚本
* @author czh
* @update (czh 2021/06/07)
*/
import {createVNode, render, DefineComponent, createApp, h} from 'vue';
import beNotifyComponents,{initNotify} from './be-notification';
import type {
    INotifyOption,
    ItInstanceMap
} from './be-notification-type'

// 各個方向的實例緩存
let instanceMap:ItInstanceMap = {
    topLeft:[],
    topRight:[],
    bottomLeft:[],
    bottomRight:[]
}
/**
 * js手动关闭方法
 * @param {Object} instance - 组件实例上下文
 * @param {Boolean} isAll - 是否关闭全部
 */
const closeNotify = function (instance:DefineComponent,isAll:boolean = false):void{
    debugger
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

    let currentInstance = instancesList[index]
    // 从缓存中删除
    instancesList.splice(index, 1);
    if (len < 1) return;
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
// 挂在原型上，共组件内部调用
//beNotifyConstructor.prototype.$closeNotify = closeNotify
const close = (compInstance:DefineComponent,elm:HTMLElement):void=>{
    if (compInstance && compInstance.parentNode) {
        //compInstance.parentNode.removeChild(compInstance);
        render(null, elm)
    }
}



const createNotify = function (options:INotifyOption) :object {
    // 初始默认配置
    const defaultOption = {
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
        //关闭回调方法
        onClose: null,
        //点击回调方法
        onClick:null,
        closeNotify
    }
    // 合并配置参数
    let option:INotifyOption = Object.assign({}, defaultOption, options)
    let instanceObj = null
    // 根据方向，获取缓存实例列表
    if (option.placement === undefined) {
        instanceObj = instanceMap.topRight
    } else {
        instanceObj = Object(instanceMap)[option.placement]
    }
    let isCache = false
    let instance:any = null
    // 如果传入了key，则遍历实例缓存，拿到对应实例
    if (option.key) {
        instanceObj.forEach((val:any) => {
            if (val.instance.props.option.key === option.key) {
                isCache = true
                instance = val
            }
        })
    }
    // 计算偏移
    let verticalOffset:number = 0;
    let direction = ''
    if (option.placement === 'topLeft' || option.placement === 'topRight') {
        verticalOffset = option.offsetTop || 0
        direction = 'offsetTop'
    }
    if (option.placement === 'bottomLeft' || option.placement === 'bottomRight') {
        verticalOffset = option.offsetBottom || 0
        direction = 'offsetBottom'
    }
    if (!isCache) {
        instanceObj.forEach((item:any) => {
            verticalOffset += (item.instance.el.offsetHeight || 0 )+ 35;
        });
    }
    verticalOffset += 35;
    Object(option)[direction] = verticalOffset
    let elm:any =null
    // 如果instance 为null，则是没有传入key 或者没有匹配到实例缓存，就创建新的
    if (!instance) {
        instance = h(beNotifyComponents, {option});
        instance.props.option.isShow = true;
        elm = document.createElement('div')
        render(instance,elm)
        // 挂载元素
        const bodyElement:Element | null= document.querySelector('body')
        if (bodyElement && bodyElement.append) {
            bodyElement.append(instance.el)
        } else {
            bodyElement && bodyElement.appendChild(instance.el)
        }
    } else {
        instance.props.option = option
    }
    if (!isCache) {
        // 缓存组件对象
        instanceObj.push({instance,elm})
    }
    return {notify: instance, close: ()=>{return closeNotify.bind(this, instance)}}
}

export const BeNotify = (options:INotifyOption):object =>{
    return createNotify(options)
};