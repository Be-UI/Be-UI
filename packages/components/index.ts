import type { App } from 'vue'
// 按需引用
export * from './install-components'
import * as components from './install-components'
import 'virtual:windi.css'
import '../style/index.scss'
const componentList: object = components
type componentKeyType = keyof typeof componentList
export const install = function (app: App) {
  Object.keys(componentList).forEach((key: string) => {
    const component = componentList[key as componentKeyType]
    if (component['install']) {
      app.use(component)
    }
  })
  return app
}
const version = '3.0.2'
export { version }
export default {
  version,
  install,
}
