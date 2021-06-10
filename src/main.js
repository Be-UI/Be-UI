import Vue from 'vue'
import App from './App.vue'
import BeIcon from './components/svg-icon/index'
Vue.config.productionTip = false
Vue.use(BeIcon)
new Vue({
  render: h => h(App),
}).$mount('#app')
