/*
 * @index.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/11/22)
 */

import beContextmenu from './src/be-contextmenu.vue'
import beContextmenuItem from './src/be-contextmenu-item.vue'
import beContextmenuSubMenu from './src/be-contextmenu-sub-menu.vue'
import { withInstall } from "@be-ui/utils/with-install"

export const BeContextmenu = withInstall(beContextmenu)

export const BeContextmenuItem = withInstall(beContextmenuItem)

export const BeContextmenuSubMenu = withInstall(beContextmenuSubMenu)
