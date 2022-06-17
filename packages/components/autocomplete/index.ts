/*
 * @index.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/10/13)
 */
import beAutocomplete from './src/be-autocomplete.vue'
import { withInstall } from "@be-ui/utils/with-install"


const BeAutocomplete = withInstall(beAutocomplete)
export {
  BeAutocomplete
}
export default BeAutocomplete
