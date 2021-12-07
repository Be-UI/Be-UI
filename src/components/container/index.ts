/*
* @index.ts
* @deprecated 
* @author czh
* @update (czh 2021/12/7)
*/
import {App} from 'vue'
import beContainer from './src/be-container.vue'
import beAside from './src/be-aside.vue'
import beMain from './src/be-main.vue'
import beFooter from './src/be-footer.vue'
import beHeader from './src/be-header.vue'

import '../../assets/style/be-main.scss'
import '../../assets/style/be-aside.scss'
import '../../assets/style/be-footer.scss'
import '../../assets/style/be-header.scss'
import '../../assets/style/be-container.scss'

import {SFCWithInstall} from "../../utils/types";
/**
 * 组件装载方法
 * @param app
 */
beContainer.install = (app: App): void => {
    app.component(beContainer.name || '', beContainer)
}
export const BeContainer = beContainer as SFCWithInstall<typeof beContainer>

/**
 * 组件装载方法
 * @param app
 */
beAside.install = (app: App): void => {
    app.component(beAside.name || '', beAside)
}
export const BeAside = beAside as SFCWithInstall<typeof beAside>;

/**
 * 组件装载方法
 * @param app
 */
beMain.install = (app: App): void => {
    app.component(beMain.name || '', beMain)
}
export const BeMain = beMain as SFCWithInstall<typeof beMain>;

/**
 * 组件装载方法
 * @param app
 */
beFooter.install = (app: App): void => {
    app.component(beFooter.name || '', beFooter)
}
export const BeFooter = beFooter as SFCWithInstall<typeof beFooter>;

/**
 * 组件装载方法
 * @param app
 */
beHeader.install = (app: App): void => {
    app.component(beHeader.name || '', beHeader)
}
export const BeHeader = beHeader as SFCWithInstall<typeof beHeader>;