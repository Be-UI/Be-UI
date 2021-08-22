import beButton from './src/be-button.vue'
const BeButton = {
    install: function (Vue) {
        Vue.component('be-button', beButton)
    },
    service: beButton,
}
export default BeButton;