import { App } from 'vue'
import Button from './src/be-button'
import { IButton } from './src/be-button-type'
import '../../assets/style/be-button.scss'
const button = Button as IButton
/**
 * 组件装载方法
 * @param app
 */
button.install = (app: App): void => {
  app.component(button.name || '', button)
}
const BeButton: IButton = button
export default BeButton
