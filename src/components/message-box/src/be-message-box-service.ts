/*
* @be-message-box-service.ts
* @description messageBox服务调用脚本
* @author czh
* @update (czh 2021/06/07)
*/

import {createVNode, render, DefineComponent, VNode} from 'vue';
import beMsgComponents from './be-message-box';
import type { INMsgOption} from './be-message-box-type'
const instanceMap = {}
/**
 * 渲染组件实例
 * @param {Object} option - 配置對象
 */
const componentRender = (option:INMsgOption):void=>{
    let elm:HTMLElement
    let close = option.onClose as Function
    let onClose = ()=>{
        render(null,elm)
        close()
    }
    option.onClose = onClose
    let instanceInner:VNode = createVNode(beMsgComponents, {...option});
    instanceInner.props && (instanceInner.props.isShow = true);
    elm = document.createElement('div')
    render(instanceInner,elm)
    const bodyElement:Element | null= document.querySelector('body')
    if (bodyElement && bodyElement.append) {
        bodyElement.append(instanceInner.el as Node)
    } else {
        bodyElement && bodyElement.appendChild(instanceInner.el as Node)
    }
}
/**
 * 創建组件实例
 * @param {Object} options - 配置對象
 */
const createMsg = (options:INMsgOption) :object => {
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
    // 合并配置参数
    let option:INMsgOption = Object.assign({}, defaultOption, options)
    // 渲染组件实例
    let instance = componentRender(option)
    return {msg: instance}
}
export const BeMsg = (options:INMsgOption):object =>{
    return createMsg(options)
};

