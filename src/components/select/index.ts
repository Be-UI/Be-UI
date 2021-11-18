/*
* @index.ts
* @deprecated 
* @author czh
* @update (czh 2021/10/27)
*/

import {App} from 'vue'
import beSelect from './src/be-select-multiple'
import type {SFCWithInstall} from "../../utils/types";

/**
 * 组件装载方法
 * @param app
 */
beSelect.install = (app: App): void => {
    app.component(beSelect.name, beSelect)
}
const BeSelect = beSelect as SFCWithInstall<typeof beSelect>
export default BeSelect