import { createApp } from 'vue'
import './assets/style/reset.scss'
// import BeUI from 'be-ui'
import App from './views/App.vue'
import '@be-ui/style/src/index.scss'
const app = createApp(App)
// app.use(BeUI)
app.mount('#app')

