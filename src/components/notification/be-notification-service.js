/*
* @be-notification-service.js
* @description notification服务调用脚本
* @author czh
* @update (czh 2021/06/07)
*/
import Vue from 'vue';
import beNotifyComponents from './be-notification.vue';
const beNotifyConstructor = Vue.extend(beNotifyComponents);
// 组件实例缓存
let instanceMap = {
    topLeft:[],
    topRight:[],
    bottomLeft:[],
    bottomRight:[]
}

export function BeNotify(options = {}) {
    const defaultOption = {
        titles:'',// 完成
        customClass:'',// 完成
        msgType:'warning',// 完成
        offsetTop:'24px',// 完成
        offsetBottom:'24px',// 完成
        placement:'topRight',// 完成
        bodyRender:null,// 完成
        iconPreRender:null,// 完成
        closeRender:null,// 完成
        description:'',// 完成
        duration:3000// 完成
    }
    let instanceObj = null
    if(options.placement === undefined){
        instanceObj = instanceMap.topRight
    }else{
        instanceObj = instanceMap[options.placement]
    }

    const instance = new beNotifyConstructor({
        el:document.createElement('div')
    })
    // 挂载元素
    const bodyElement = document.querySelector('body')
    if (bodyElement.append) {
        bodyElement.append(instance.$el)
    } else {
        bodyElement.appendChild(instance.$el)
    }
    // 手动设置props
    instance.$nextTick(() => {
        instance._props.isShow = true
        instance._props.titles = options.titles || defaultOption.titles
        instance._props.customClass = options.customClass || defaultOption.customClass
        instance._props.msgType = options.msgType || defaultOption.msgType
        instance._props.placement = options.placement || defaultOption.placement
        // 存在多个提示框时，根据缓存的提示框实力对象数量设置偏移
        let offsetBottom = options.offsetBottom || defaultOption.offsetBottom
        let offsetTop = options.offsetTop || defaultOption.offsetTop
        // 第二个起，偏移是第一个的偏移 + （高 + 20）* 数量
        if(instanceMap[instance._props.placement].length >= 1){
            const len = instanceObj.length
            let preHeight = Number(window.getComputedStyle(instanceObj[len - 1].$el.children[0]).height.split('px')[0])
            let preTop = Number(window.getComputedStyle(instanceObj[0].$el).top.split('px')[0])
            let preBottom = Number(window.getComputedStyle(instanceObj[0].$el).bottom.split('px')[0])
            offsetTop =   preTop + (instanceMap[instance._props.placement].length ) * (preHeight + 20)
            offsetBottom =  preBottom + (instanceMap[instance._props.placement].length ) * (preHeight + 20)
            if (instance._props.placement === 'topLeft' || instance._props.placement === 'topRight') {
                instance._props.offsetTop = offsetTop + 'px'
            }
            if (instance._props.placement === 'bottomLeft' || instance._props.placement === 'bottomRight') {
                instance._props.offsetBottom = offsetBottom + 'px'
            }
         }
         else{
            // 第一个的时候不需要处理，直接使用传入的偏移
            if (instance._props.placement === 'topLeft' || instance._props.placement === 'topRight') {
                instance._props.offsetTop = offsetTop
            }
            if (instance._props.placement === 'bottomLeft' || instance._props.placement === 'bottomRight') {
                instance._props.offsetBottom = offsetBottom
            }
         }
        instance._props.bodyRender = options.bodyRender || defaultOption.bodyRender
        instance._props.iconPreRender = options.iconPreRender || defaultOption.iconPreRender
        instance._props.closeRender = options.closeRender || defaultOption.closeRender
        instance._props.description = options.description || defaultOption.description
        // 绑定事件
        instance.$selfEvent = {
            confirm:options.onClick,
            close:options.onClose
        }
        instanceObj.push(instance)

         // 定时关闭
         const duration = options.duration || defaultOption.duration
        if(duration && duration !== 0 && Object.prototype.toString.call(duration) === '[object Number]'){
            setTimeout(()=>{
                instance.close()
            },duration)
        }
    });
    return instance
}