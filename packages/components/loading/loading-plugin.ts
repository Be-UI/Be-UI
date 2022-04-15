/*
 * @loading-plugin.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/10/9)
 */
import { beLoading } from './src/be-loading-service'
import { ILoadingPlg } from './src/be-loading-type'

const load: ILoadingPlg = {
  close: beLoading.close,
  init: beLoading.init,
}
/**
 * 组件装载方法
 * @param app
 */
const BeLoadingSer: ILoadingPlg = load
export default BeLoadingSer
