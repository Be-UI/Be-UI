import beTooltip from './src/be-tooltip'
const BeTooltip = {
    install: function (Vue) {
        Vue.component('be-tooltip', beTooltip)
    },
    service: beTooltip,
}
export default BeTooltip;