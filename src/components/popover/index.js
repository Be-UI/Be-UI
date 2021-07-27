import bePopover from './src/be-popover'
const BePopover = {
    install: function (Vue) {
        Vue.component('be-popover', bePopover)
    },
    service: bePopover,
}
export default BePopover;