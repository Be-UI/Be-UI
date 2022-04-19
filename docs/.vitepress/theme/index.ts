// import ElementPlus from 'element-plus'
import 'normalize.css'
import index, { globals } from '../vitepress'
import type { Theme } from 'vitepress'
import 'virtual:windi.css'
import '../../public/be-ui/style.css'
import BeUI from '../../public/be-ui/be-ui.es.js'
export const define = <T>(value: T): T => value
export default define<Theme>({
  Layout: index,
  enhanceApp: ({ app }) => {
    app.use(BeUI)
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
})
