/*
* @index.ts
* @deprecated 
* @author czh
* @update (czh 2021/10/13)
*/
import beInput from './src/be-input.vue'
import {App} from 'vue'
import type {SFCWithInstall} from '../../utils/types'

beInput.install = (app: App): void => {
    app.component(beInput.name, beInput)
}
const BeInput = beInput as SFCWithInstall<typeof beInput>
export default BeInput
