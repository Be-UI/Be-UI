import { App } from 'vue'
import beProgress from './src/be-progress'
import { IProgress } from './src/be-progress-type'
import '../../style/src/be-progress.scss'

const progressComp = beProgress as IProgress
/**
 * 组件装载方法
 * @param app
 */
progressComp.install = (app: App): void => {
  app.component(progressComp.name || '', progressComp)
}
const BeProgress: IProgress = progressComp
export default BeProgress
