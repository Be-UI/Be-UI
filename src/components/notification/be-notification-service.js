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
    topLeft: [],
    topRight: [],
    bottomLeft: [],
    bottomRight: []
}

/**
 * js手动关闭方法
 * @param {Object} instance - 组件实例上下文
 * @param {Boolean} isSelf - 是否源于组件内部调用
 */
const closeNotify = function (instance,isSelf = false,isAll = false) {
    // 關閉全部
    if(isAll){
        Object.keys(instanceMap).forEach(placement=>{
            placement.forEach(val=>{
                val.close()
            })
        })
        instanceMap = {
            topLeft: [],
            topRight: [],
            bottomLeft: [],
            bottomRight: []
        }
        return
    }
    // 根据组件uid过滤组件实例
    instanceMap[instance.option.placement] = instanceMap[instance.option.placement].filter(val => {
        return val._uid !== instance._uid
    })
    // 关闭
    if(!isSelf){
        instance.close()
    }
}
// 挂在原型上，共组件内部调用
beNotifyConstructor.prototype.$closeNotify = closeNotify
const createNotify = function (options = {}) {
    // 节流处理，防止多次调用时，前一个没有渲染，第二个开始生成
    const defaultOption = {
        titles: '',//完成
        customClass: '',//完成
        msgType: 'warning',//完成
        offsetTop: 0,//完成
        offsetBottom: 0,//完成
        placement: 'topRight',//完成
        bodyRender: null,//完成
        iconPreRender: null,//完成
        closeRender: null,//完成
        description: '',//完成
        duration: 4500,//完成
        key: '',//完成
        //关闭回调方法
        onClose: null,//完成
        //点击回调方法
        onClick:null//完成
    }
    // 合并配置参数
    let option = Object.assign({}, defaultOption, options)
    let instanceObj = null
    // 根据方向，获取缓存实例列表
    if (option.placement === undefined) {
        instanceObj = instanceMap.topRight
    } else {
        instanceObj = instanceMap[option.placement]
    }
    let isCache = false
    let instance = null
    // 如果传入了key，则遍历实例缓存，拿到对应实例
    if (option.key) {
        instanceObj.forEach(val => {
            if (val.key === option.key) {
                isCache = true
                instance = val
            }
        })
    }
    // 如果instance 为null，则是没有传入key 或者没有匹配到实例缓存，就创建新的
    if (!instance) {
        instance = new beNotifyConstructor({
            data: {option}
        }).$mount()
        instance.key = option.key || ''
        // 挂载元素
        const bodyElement = document.querySelector('body')
        if (bodyElement.append) {
            bodyElement.append(instance.$el)
        } else {
            bodyElement.appendChild(instance.$el)
        }
    } else {
        // instance
        instance.option = option
    }
    instance.$nextTick(()=>{
        instance.option.isShow = true;
    })

    let verticalOffset;
    if (option.placement === 'topLeft' || option.placement === 'topRight') {
        verticalOffset = option.offsetTop || 0
    }
    if (option.placement === 'bottomLeft' || option.placement === 'bottomRight') {
        verticalOffset = option.offsetBottom || 0
    }
    if (!isCache) {
        instanceObj.forEach(item => {
            verticalOffset += item.$el.offsetHeight + 35;
        });
    }
    verticalOffset += 35;
    // 第一个的时候不需要处理，直接使用传入的偏移
    if (option.placement === 'topLeft' || option.placement === 'topRight') {
        instance.option.offsetTop = verticalOffset
    }
    if (option.placement === 'bottomLeft' || option.placement === 'bottomRight') {
        instance.option.offsetBottom = verticalOffset
    }
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

export function BeNotify(options = {}) {
    return createNotify(options)
}