import { App } from 'vue'
import type { SFCWithInstall } from '../../utils/type/types'
import beEllipsis from './src/be-ellipsis.vue'

beEllipsis.install = (app: App): void => {
  app.component(beEllipsis.name, beEllipsis)
}
const BeEllipsis = beEllipsis as SFCWithInstall<typeof beEllipsis>
export default BeEllipsis
