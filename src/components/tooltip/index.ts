
import { App} from 'vue'
import beTooltip from './src/be-tooltip.vue'
import type {SFCWithInstall} from "../../utils/types";
/**
 * 组件装载方法
 * @param app
 */
beTooltip.install = (app:App): void => {
    app.component(beTooltip.name,beTooltip)
}

/**
 * 自定义图标方法,该方法会直接根据参数name构造图名为 name-icon 的图标组件
 */
const BeTooltip = beTooltip as SFCWithInstall<typeof beTooltip>
export default BeTooltip