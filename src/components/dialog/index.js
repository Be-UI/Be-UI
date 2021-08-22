import beDialog from './src/be-dialog.vue'
const BeDialog = {
    install: function (Vue) {
        Vue.component('be-dialog', beDialog)
    },
    service: beDialog,
}
export default BeDialog;