/*
* @index.ts
* @deprecated 
* @author czh
* @update (czh 2021/11/16)
*/
import {App} from 'vue'
import beInputNumber from './src/be-input-number'
import type {SFCWithInstall} from "../../utils/types";
import '../../assets/style/be-input-number.scss'

/**
 * 组件装载方法
 * @param app
 */
beInputNumber.install = (app: App): void => {
    app.component(beInputNumber.name, beInputNumber)
}
const BeInputNumber = beInputNumber as SFCWithInstall<typeof beInputNumber>
export default BeInputNumber