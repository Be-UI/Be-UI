import {App} from 'vue'
import beSwitch from './src/be-switch'
import {ISwitch} from "./src/be-switch-type";
import '../../assets/style/be-switch.scss'

const switchComp = beSwitch as ISwitch
/**
 * 组件装载方法
 * @param app
 */
switchComp.install = (app: App): void => {
    app.component(switchComp.name || '', switchComp)
}
const BeSwitch: ISwitch = switchComp
export default BeSwitch;