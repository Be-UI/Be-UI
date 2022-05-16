import loading from './src/be-loading-service'
import { App } from 'vue'
import { ILoading } from './src/be-loading-type'
import '../../style/src/be-loading.scss'
const load = loading as ILoading
/**
 * 组件装载方法
 * @param app
 */
load.install = (app: App): void => {
  app.component(load.name || '', load)
}
const BeLoading: ILoading = load
export default BeLoading
