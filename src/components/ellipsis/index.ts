/*
import beEllipsis from './src/be-ellipsis'
const BeEllipsis = {
    install: function (Vue) {
        Vue.component('be-ellipsis', beEllipsis)
    },
    service: beEllipsis,
}
export default BeEllipsis;*/

import { App } from 'vue'
import type { SFCWithInstall } from '../../utils/types'
import BeEllipsis from './src/be-ellipsis.vue'

BeEllipsis.install = (app: App): void => {
    app.component(BeEllipsis.name, BeEllipsis)
}

const _Ellipsis: SFCWithInstall<typeof BeEllipsis> = BeEllipsis

export default _Ellipsis
