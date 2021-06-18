/*
* @be-loading-service.js
* @description loading组件的服务调用脚本
* @author czh
* @update (czh 2021/06/06)
*/
import Vue from 'vue';
import beLoadingComponents from './be-loading.vue';
const LoadingConstructor = Vue.extend(beLoadingComponents);
LoadingConstructor.prototype.close = function (){
    // 移除dom
    const bodyElement = document.querySelector('body')
    const loaderElement = document.getElementById('be_load_' + this._uid)
    if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
        bodyElement.removeChild(loaderElement);
    }
    // 销毁组件
    this.$destroy()
}
export function BeLoading(options = {}) {
    const defaultOption = {
        isBackground:true,
        bgColor:'rgba(255,255,255,.5)',
        customRender : () => null,
        text:'',
        size:'default',
        customClass:'',
        color:'#4F60A7FF',
        colorText:'black',
        delay:0
    }
    const instance = new LoadingConstructor({
        el:document.createElement('div')
    })
    const bodyElement = document.querySelector('body')
    if (bodyElement.append) {
        bodyElement.append(instance.$el)
    } else {
        bodyElement.appendChild(instance.$el)
    }
    // 手动设置props
    Vue.nextTick(() => {
        instance._props.show = true;
        instance._props.isFullScreen = true;
        instance._props.isBackground = options.isBackground === undefined ? defaultOption.isBackground : options.isBackground
        instance._props.bgColor = options.bgColor || defaultOption.bgColor
        instance._props.customRender = options.customRender || defaultOption.customRender
        instance._props.text = options.text || defaultOption.text
        instance._props.size = options.size || defaultOption.size
        instance._props.customClass = options.customClass || defaultOption.customClass
        instance._props.color = options.color || defaultOption.color
        instance._props.delay = options.delay || defaultOption.delay
        instance._props.colorText = options.colorText || defaultOption.colorText
    });
    return instance
}