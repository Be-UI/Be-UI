// import ElementPlus from 'element-plus'

import index, { globals } from '../vitepress'

import type { Theme } from 'vitepress'
export const define = <T>(value: T): T => value
export default define<Theme>({
  Layout: index,
  enhanceApp: ({ app }) => {
    //app.use(ElementPlus)
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
})
