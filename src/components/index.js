import BeMsg from '../components/message-box/index.js';// 支持 服务调用
import BeNotification from '../components/notification/index.js';// 支持服务调用
import BeLoading from '../components/Loading/index.js';// 支持 服务调用、按需组件式调用、全局组件调用
import BeIcon from '../components/svg-icon/index.js';// 支持 按需组件式调用、全局组件调用
// 以BeUI在入口文件批量引用
const components = [
    BeLoading.service,
    BeIcon.service
]
const install = function(Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });

    Vue.prototype.$beMsg = BeMsg.service;
    Vue.prototype.$beLoding = BeLoading.service;
    Vue.prototype.$beNotify = BeNotification.service;
    Vue.prototype.$beIconRender = BeIcon.service;

};
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {
    version: '0.0.1 - beta',
    install
}

// 单个组件按需引用
export const beLoading = BeLoading
export const beIcon = BeIcon
