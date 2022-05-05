/*
 * @index.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/10/13)
 */
import beAutocomplete from './src/be-autocomplete.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../../utils/type/types'

beAutocomplete.install = (app: App): void => {
  app.component(beAutocomplete.name, beAutocomplete)
}
const BeAutocomplete = beAutocomplete as SFCWithInstall<typeof beAutocomplete>
export default BeAutocomplete
