import beDialog from './src/be-dialog.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../../utils/type/types'
import '../../style/src/be-dialog.scss'

beDialog.install = (app: App): void => {
  app.component(beDialog.name, beDialog)
}
const BeDialog = beDialog as SFCWithInstall<typeof beDialog>
export default BeDialog
