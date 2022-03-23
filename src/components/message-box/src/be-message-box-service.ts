/*
 * @be-message-box-service.ts
 * @description messageBox服务调用脚本
 * @author czh
 * @update (czh 2021/06/07)
 */

import { createVNode, render, VNode } from 'vue'
import beMsgComponents from './be-message-box'
import type { INMsgOption } from './be-message-box-type'

/**
 * 渲染组件实例
 * @param {Object} option - 配置對象
 */
const componentRender = (option: INMsgOption): void => {
  const elm: HTMLElement = document.createElement('div')
  const close = option.onClose as Function
  const onCloseFunc = (): void => {
    render(null, elm)
    close && close()
  }
  option.onClose = onCloseFunc
  const instanceInner: VNode = createVNode(beMsgComponents, { ...option })
  instanceInner.props && (instanceInner.props.isShow = true)
  render(instanceInner, elm)
  const bodyElement: Element | null = document.querySelector('body')
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
const createMsg = (options: INMsgOption): object => {
  const defaultOption = {
    isDrag: false,
    titles: '',
    customClass: '',
    msgType: 'info',
    footerType: 'center',
    footerRender: null,
    bodyRender: null,
    iconPreRender: null,
    iconNextRender: null,
    isOpenModal: true,
  }
  // 合并配置参数
  const option: INMsgOption = Object.assign({}, defaultOption, options)
  // 渲染组件实例
  const instance = componentRender(option)
  return { msg: instance }
}
export const BeMsg = (options: INMsgOption): object => {
  return createMsg(options)
}
