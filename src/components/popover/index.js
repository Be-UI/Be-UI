import bePopover from './src/be-popover-trigger-bku.vue'
const BePopover = {
    install: function (Vue) {
        Vue.component('be-popover', bePopover)
    },
    service: bePopover,
}
export default BePopover;