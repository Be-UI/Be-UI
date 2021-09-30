import { App} from 'vue'
import beButton from './src/be-button.vue'
import {IButton} from "./src/be-button";
const button = beButton as IButton
/**
 * 组件装载方法
 * @param app
 */
button.install = (app:App): void => {
    app.component(button.name || '',button)
}
const BeButton:IButton = button
export default BeButton;