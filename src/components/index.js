import BeMsg from '../components/message-box/index.js';// 支持 服务调用
import BeNotification from '../components/notification/index.js';// 支持服务调用
import BeLoading from '../components/loading/index.js';// 支持 服务调用、按需组件式调用、全局组件调用
import BeIcon from '../components/svg-icon/index.js';// 支持 按需组件式调用、全局组件调用
import BeDialog from '../components/dialog/index.js';// 支持 按需组件式调用、全局组件调用
import BeButton from '../components/button/index.js';// 支持 按需组件式调用、全局组件调用
import BePager from '../components/pagination/index.js';// 支持 按需组件式调用、全局组件调用
import BePopover from '../components/popover/index.js';// 支持 按需组件式调用、全局组件调用
import BeTooltip from '../components/tooltip/index.js';// 支持 按需组件式调用、全局组件调用
import BeEllipsis from '../components/ellipsis/index.js';// 支持 按需组件式调用、全局组件调用
// 以BeUI在入口文件批量引用
const components = [
    BeLoading.instance,
    BeIcon.service,
    BeDialog.service,
    BeButton.service,
    BePager.service,
    BePopover.service,
    BeTooltip.service,
    BeEllipsis.service
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
export const beDialog = BeDialog
export const beButton = BeButton
export const bePager = BePager
export const bePopover = BePopover
export const beTooltip = BeTooltip
export const beEllipsis= BeEllipsis
