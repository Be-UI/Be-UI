// import ElementPlus from 'element-plus'
import 'normalize.css'
import index, { globals } from '../vitepress'
import type { Theme } from 'vitepress'
import 'virtual:windi.css'
import '../../../dist/style/css/index.css'
import BeUI from '../../../dist/index.esm.js'
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
