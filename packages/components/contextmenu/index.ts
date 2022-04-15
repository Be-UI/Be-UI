/*
 * @index.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/11/22)
 */
import { App } from 'vue'
import beContextmenu from './src/be-contextmenu.vue'
import beContextmenuItem from './src/be-contextmenu-item.vue'
import beContextmenuSubMenu from './src/be-contextmenu-sub-menu.vue'
import '../../style/be-contextmenu.scss'
import { SFCWithInstall } from '../../utils/types'
/**
 * 组件装载方法
 * @param app
 */
beContextmenu.install = (app: App): void => {
  app.component(beContextmenu.name || '', beContextmenu)
}
export const BeContextmenu = beContextmenu as SFCWithInstall<typeof beContextmenu>

/**
 * 组件装载方法
 * @param app
 */
beContextmenuItem.install = (app: App): void => {
  app.component(beContextmenuItem.name || '', beContextmenuItem)
}
export const BeContextmenuItem = beContextmenuItem as SFCWithInstall<typeof beContextmenuItem>

/**
 * 组件装载方法
 * @param app
 */
beContextmenuSubMenu.install = (app: App): void => {
  app.component(beContextmenuSubMenu.name || '', beContextmenuSubMenu)
}
export const BeContextmenuSubMenu = beContextmenuSubMenu as SFCWithInstall<
  typeof beContextmenuSubMenu
>
