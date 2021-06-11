/*
* @be-message-box-service.js
* @description messageBox服务调用脚本
* @author czh
* @update (czh 2021/06/07)
*/
import Vue from 'vue';
import beMsgComponents from './be-message-box.vue';
const beMsgConstructor = Vue.extend(beMsgComponents);
export function BeMsg(options = {}) {
    const defaultOption = {
        isDrag:false,
        titles:'',
        customClass:'',
        msgType:'warning',
        footerType:'center',
        footerRender:null,
        bodyRender:null,
        iconPreRender:null,
        iconNextRender:null,
        isOpenModal:true,
    }
    const instance = new beMsgConstructor({
        el:document.createElement('div')
    })
    const bodyElement = document.querySelector('body')
    if (bodyElement.append) {
        bodyElement.append(instance.$el)
    } else {
        bodyElement.appendChild(instance.$el)
    }
    // 手动设置props
    instance.$nextTick(() => {
        instance._props.isShow = true
        instance._props.isDrag = options.isDrag || defaultOption.isDrag
        instance._props.isOpenModal = options.isOpenModal === undefined ? defaultOption.isOpenModal:options.isOpenModal
        instance._props.titles = options.titles || defaultOption.titles
        instance._props.customClass = options.customClass || defaultOption.customClass
        instance._props.msgType = options.msgType || defaultOption.msgType
        instance._props.footerType = options.footerType || defaultOption.footerType
        instance._props.footerRender = options.footerRender || defaultOption.footerRender
        instance._props.bodyRender = options.bodyRender || defaultOption.bodyRender
        instance._props.iconPreRender = options.iconPreRender || defaultOption.iconPreRender
        instance._props.iconNextRender = options.iconNextRender || defaultOption.iconNextRender
        // 绑定事件
        instance.$selfEvent = {
            confirm:options.confirm,
            close:options.close
        }
    });
    return instance
}