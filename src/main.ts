import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
import BeUI from './components'

app.use(BeUI)
app.mount('#app')
