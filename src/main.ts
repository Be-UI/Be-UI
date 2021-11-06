import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import BeUI  from './components'
import "./assets/style/be-popover.scss";
app.use(BeUI)
app.mount('#app')
