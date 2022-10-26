/*
 * @be-loading-service.ts
 * @description loading组件的服务调用脚本
 * @author czh
 * @update (czh 2021/06/06)
 */
import type { RendererNode, VNode } from 'vue'
import { createVNode, render } from 'vue'
import beLoadingComponents from './be-loading.vue'
import type { ILoadingPlg } from './be-loading-type'

const closeLoading = (instance: RendererNode) => {
  render(null, instance.beLoadingElm)
}
/**
 * 初始化方法
 * @param {Object} options - props配置向
 */
const initLoading = (options = {}) => {
  const defaultOption = {
    isBackground: true,
    bgColor: 'rgba(255,255,255,.5)',
    customRender: () => null,
    text: '',
    size: 'default',
    customClass: '',
    color: '#4F60A7FF',
    colorText: 'black',
    delay: 0,
    round: 5,
    show: false,
    isFullScreen: true,
  }
  // 合并参数
  const option = Object.assign({}, defaultOption, options)
  const instanceInner: RendererNode = createVNode(beLoadingComponents, { ...option })
  // 设置全屏和显示
  instanceInner.props.show = true
  instanceInner.props.isFullScreen = true
  // 渲染挂载
  const elm: HTMLElement = document.createElement('div')
  render(instanceInner as VNode, elm)
  const bodyElement: HTMLElement | null = document.querySelector('body')
  if (bodyElement && bodyElement.append)
    bodyElement.append(instanceInner.el)
  else
    bodyElement && bodyElement.appendChild(instanceInner.el)

  instanceInner.beLoadingElm = elm
  return instanceInner
}
export default beLoadingComponents
export const beLoading: ILoadingPlg = {
  close: closeLoading,
  init: initLoading,
}
