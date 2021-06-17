import Vue from 'vue'
import App from './App.vue'
import BeUI  from './components/index.js'
Vue.config.productionTip = false
Vue.use(BeUI)
new Vue({
  render: h => h(App),
}).$mount('#app')
