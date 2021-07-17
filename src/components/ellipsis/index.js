import beEllipsis from './src/be-ellipsis'
const BeEllipsis = {
    install: function (Vue) {
        Vue.component('be-ellipsis', beEllipsis)
    },
    service: beEllipsis,
}
export default BeEllipsis;