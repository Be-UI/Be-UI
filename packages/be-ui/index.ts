import type { App } from 'vue'
// 按需引用

import * as componentList from '@be-ui/components'
type componentKeyType = keyof typeof componentList
export const install = function install(app:App) {
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
export * from '@be-ui/components'
