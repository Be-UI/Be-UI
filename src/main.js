import Vue from 'vue'
import App from './App.vue'
import BeUI  from './components/index.js'
import mountDirective from './utils/direactives/read-directive'
mountDirective(Vue)
Vue.config.productionTip = false
Vue.use(BeUI)
new Vue({
  render: h => h(App),
}).$mount('#app')
