/*
import bePopover from './src/be-popover.vue'
const BePopover = {
    install: function (Vue) {
        Vue.component('be-popover', bePopover)
    },
    service: bePopover,
}
export default BePopover;*/
import { App ,defineComponent,DefineComponent} from 'vue'
import bePopover from './src/be-popover-bc.vue'
import {SFCWithInstall} from "../../utils/types";
/**
 * 组件装载方法
 * @param app
 */
bePopover.install = (app:App): void => {
    app.component(bePopover.name,bePopover)
}

/**
 * 自定义图标方法,该方法会直接根据参数name构造图名为 name-icon 的图标组件
 */
const BePopover: SFCWithInstall<typeof bePopover> = bePopover
export default BePopover