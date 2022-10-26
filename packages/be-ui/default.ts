import type { App } from 'vue'
import * as componentList from '@be-ui/components'

type componentKeyType = keyof typeof componentList
export const install = function install(app: App) {
  Object.keys(componentList).forEach((key: string) => {
    const component = componentList[key as componentKeyType]
   // @ts-ignore
    if (component.install) {
     // @ts-ignore
      app.use(component)
    }
  })
  return app
}

export default {
  install,
}
