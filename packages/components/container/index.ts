/*
 * @index.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/12/7)
 */

import { withInstall } from '@be-ui/utils'
import beContainer from './src/be-container.vue'
import beAside from './src/be-aside.vue'
import beMain from './src/be-main.vue'
import beFooter from './src/be-footer.vue'
import beHeader from './src/be-header.vue'

export const BeContainer = withInstall(beContainer)

export const BeAside = withInstall(beAside)

export const BeMain = withInstall(beMain)

export const BeFooter = withInstall(beFooter)

export const BeHeader = withInstall(beHeader)
