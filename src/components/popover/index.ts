
import { App} from 'vue'
import bePopover from './src/be-popover.vue'
import type {SFCWithInstall} from "../../utils/types";
/**
 * 组件装载方法
 * @param app
 */
bePopover.install = (app:App): void => {
    app.component(bePopover.name,bePopover)
}
const BePopover = bePopover as SFCWithInstall<typeof bePopover>
export default BePopover