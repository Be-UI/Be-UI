
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
const BeTooltip = beTooltip as SFCWithInstall<typeof beTooltip>
export default BeTooltip