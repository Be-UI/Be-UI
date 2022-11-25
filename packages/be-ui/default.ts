import * as componentList from '@be-ui/components'
import type { App } from 'vue'

type componentKeyType = keyof typeof componentList
export const install = function install(app: App) {
  Object.keys(componentList).forEach((key: string) => {
    const component = (componentList as Record<string, any>)[key as componentKeyType]
    if (component.install)
      app.use(component)
  })
  return app
}

export default {
  install,
}
