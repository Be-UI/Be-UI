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
// 节流方法
const throttle = function(func, delay) {
    let prev = Date.now();
    return function() {
        var context = this;
        var args = arguments;
        var now = Date.now();
        if (now - prev >= delay) {
            prev = Date.now();
            return func.apply(context, args);
        }
    }
}
// 说动关闭方法
const closeNotify = function(instance) {
    // 根据组件uid过滤组件实例
    instanceMap[instance._props.placement] = instanceMap[instance._props.placement].filter(val=>{
        return val._uid !== instance._uid
    })
    // 关闭
    instance.close()
}
const createNotify = function (options = {}){
    // 节流处理，防止多次调用时，前一个没有渲染，第二个开始生成
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
        duration:3000,// 完成,
        key:'',// 完成,
        //关闭回调方法
        onClose:null,
    }
    let instanceObj = null
    if(options.placement === undefined){
        instanceObj = instanceMap.topRight
    }else{
        instanceObj = instanceMap[options.placement]
    }
    let instance = null
    let isCache = false
    // 如果传入了key，则变量实例缓存，拿到对应实例
    if(options.key){
        instanceObj.forEach(val=>{
            if(val.$notifyKey === options.key){
                isCache = true
                instance = val
            }
        })
    }
    // 如果instance 为null，则是没有传入key 或者没有匹配到实例缓存，就创建新的
    if(!instance){
        instance = new beNotifyConstructor({
            el:document.createElement('div'),
        })
        instance.$notifyKey = options.key || ''
        // 挂载元素
        const bodyElement = document.querySelector('body')
        if (bodyElement.append) {
            bodyElement.append(instance.$el)
        } else {
            bodyElement.appendChild(instance.$el)
        }
    }

    // 手动设置props
    Vue.nextTick(() => {
        instance._props.isShow = true
        instance._props.titles = options.titles || defaultOption.titles
        instance._props.customClass = options.customClass || defaultOption.customClass
        instance._props.msgType = options.msgType || defaultOption.msgType
        instance._props.placement = options.placement || defaultOption.placement
        // 存在多个提示框时，根据缓存的提示框实力对象数量设置偏移
        let offsetBottom = options.offsetBottom || defaultOption.offsetBottom
        let offsetTop = options.offsetTop || defaultOption.offsetTop
        // 第二个起，偏移是第一个的偏移 + （高 + 20）* 数量
        debugger
        if(instanceMap[instance._props.placement].length >= 1 && !isCache){
            const len = instanceObj.length
            // 当前组件实例的这些偏移设置是根据上一个组件实例计算的
            // 所以这些操作放到一个组件实例$nextTick中处理
            instanceObj[len - 1].$nextTick(()=>{
                debugger
                let preHeight = Number(window.getComputedStyle(instanceObj[0].$el.children[0]).height.split('px')[0])
                let preTop = Number(window.getComputedStyle(instanceObj[0].$el).top.split('px')[0])
                let preBottom = Number(instanceObj[0].offsetBottom.split('px')[0])
                offsetTop =   preTop + (len - 1 ) * (preHeight + 20)
                offsetBottom =  preBottom + (len - 1) * (preHeight + 20)
                if (instance._props.placement === 'topLeft' || instance._props.placement === 'topRight') {
                    instance._props.offsetTop = offsetTop + 'px'
                }
                if (instance._props.placement === 'bottomLeft' || instance._props.placement === 'bottomRight') {
                    instance._props.offsetBottom = offsetBottom + 'px'
                }
            })
        }
        if(instanceMap[instance._props.placement].length < 1 && !isCache){
            // 第一个的时候不需要处理，直接使用传入的偏移
            if (instance._props.placement === 'topLeft' || instance._props.placement === 'topRight') {
                instance._props.offsetTop = offsetTop
            }
            if (instance._props.placement === 'bottomLeft' || instance._props.placement === 'bottomRight') {
                instance.$nextTick(()=>{
                    const preHeight = Number(window.getComputedStyle(instance.$el.children[0]).height.split('px')[0])
                    const Bottom = Number(offsetBottom.split('px')[0])
                    if(Bottom < preHeight ){
                        instance._props.offsetBottom = Bottom + preHeight + 20 + 'px'
                    }
                })

            }
        }
        instance._props.bodyRender = options.bodyRender || defaultOption.bodyRender
        instance._props.iconPreRender = options.iconPreRender || defaultOption.iconPreRender
        instance._props.closeRender = options.closeRender || defaultOption.closeRender
        instance._props.description = options.description || defaultOption.description
        // 绑定事件
        instance.$selfEvent = {
            // 支持点击关闭回调和点击回调
            onClick:options.onClick,
            onClose:options.onClose
        }
        if(!isCache){
            instanceObj.push(instance)
        }
        // 定时关闭
        const duration = options.duration === null ? null : defaultOption.duration
        if(duration && duration !== 0 && Object.prototype.toString.call(duration) === '[object Number]'){
            setTimeout(()=>{
                closeNotify(instance)
            },duration)
        }
    });
    return {notify:instance,close:closeNotify.bind(this,instance)}
}
export function BeNotify(options = {}) {
    return createNotify(options)
}