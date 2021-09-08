/*
* @be-notification-service.ts
* @description notification服务调用脚本
* @author czh
* @update (czh 2021/06/07)
*/
import { createVNode, render,DefineComponent,createApp } from 'vue';
import beNotifyComponents from './be-notification';
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
 * @param {Boolean} isSelf - 是否源于组件内部调用
 * @param {Boolean} isAll - 是否关闭全部
 */
/*const closeNotify = function (instance:DefineComponent,isAll:boolean = false,isSelf:boolean = false):void{
    if (!instance) return;
    let index = -1
    let pacement:string = instance.option.placement
    let instancesList = Object(instanceMap)[pacement]
    let direction = /^top-/.test(pacement) ? 'top' : 'bottom';
    let len = instancesList.length
    // 關閉全部
    if(isAll){
        Object.keys(instanceMap).forEach((placement:any)=>{
            placement.forEach((val:any)=>{
                val.close()
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
            if (instance._uid === val._uid) {
                index = i;
                throw new Error('EndIterative');
            }
        });
    }catch(e) {
        if(e.message!=="EndIterative") throw e;
    }
    // 从缓存中删除
    instancesList.splice(index, 1);
    if (len <= 1) return;
    const removedHeight = instance.$el.offsetHeight;
    for (let i = index; i < len - 1 ; i++) {
            instancesList[i].$el.style[direction] =
            parseInt(instancesList[i].$el.style[direction], 10) - removedHeight - 35 + 'px';
    }
    // 根据组件uid过滤组件实例
   /!* instanceMap[pacement] = instanceMap[pacement].filter(val => {
        return val._uid !== instance._uid
    })*!/
    // 关闭
    if(!isSelf){
        instance.close()
    }
}*/
// 挂在原型上，共组件内部调用
//beNotifyConstructor.prototype.$closeNotify = closeNotify




const createNotify = function (options:INotifyOption) :object {
    // 初始默认配置
    const defaultOption = {
        titles: '',
        customClass: '',
        msgType: 'warning',
        offsetTop: 0,
        offsetBottom: 0,
        placement: 'topRight',
        bodyRender: null,
        iconPreRender: null,
        closeRender: null,
        description: '',
        duration: 4500,
        key: '',
        //关闭回调方法
        onClose: null,
        //点击回调方法
        onClick:null
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
            if (val.key === option.key) {
                isCache = true
                instance = val
            }
        })
    }
    // 如果instance 为null，则是没有传入key 或者没有匹配到实例缓存，就创建新的
    if (!instance) {
        // 因为option是在data里维护，所有这里直接改写data方法。并使用createApp
        Object(beNotifyComponents).data = ():object =>{
            return {
                option,
                containerClass:''
            }
        }
        instance = createApp(beNotifyComponents).mount(document.createElement('div'))
        // 挂载元素
        const bodyElement:Element | null= document.querySelector('body')
        if (bodyElement && bodyElement.append) {
            bodyElement.append(instance.$el)
        } else {
            bodyElement && bodyElement.appendChild(instance.$el)
        }
    } else {
        Object(instance).option = option
    }
    instance.$nextTick(()=>{
        instance.option.isShow = true;
    })
    // 设置组件的偏移
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
            verticalOffset += item.$el.offsetHeight + 35;
        });
    }
    verticalOffset += 35;
    instance.option[direction] = verticalOffset
    if (!isCache) {
        // 绑定事件
        instance.$selfEvent = {
            // 支持点击关闭回调和点击回调
            onClick:option.onClick,
            onClose:option.onClose
        }
        instanceObj.push(instance)
    }
    return {notify: instance, close: closeNotify.bind(this, instance)}
}

export const BeNotify = (options:INotifyOption):object =>{
    return createNotify(options)
};