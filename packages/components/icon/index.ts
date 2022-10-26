import type { App } from 'vue'
import { defineComponent } from 'vue'
import { initIconSvg, withInstall } from '@be-ui/utils'
import SvgIcon from './src/be-icon.vue'
import { createCustom } from './src/be-custom-icon'

initIconSvg()

const BeIcon = withInstall(SvgIcon)

BeIcon.BeIconComponents = (name: string, option: { template?: string }): object | void => {
  const tempStr: string | undefined = option.template
  if (!tempStr) {
    console.error('The ‘template’ field in the parameter ‘option’ is required')
    return
  }
  // 根据模板参数，创建组件对象
  const compInstance: object = defineComponent(createCustom(tempStr))
  ;(compInstance as any).install = (app: App): void => {
    app.component(name, compInstance)
  }
  return compInstance
}

const customCache = new Set()
BeIcon.createFromIconfontCN = (url: string): void => {
  if (
    typeof document !== 'undefined'
    && typeof window !== 'undefined'
    && typeof document.createElement === 'function'
    && url.length
    && !customCache.has(url)
  ) {
    const script = document.createElement('script')
    script.setAttribute('src', url)
    script.setAttribute('data-namespace', url)
    customCache.add(url)
    document.body.appendChild(script)
  }
}
export {
  BeIcon,
}
export default BeIcon
export const BeIconComponents = BeIcon.BeIconComponents
export const createFromIconfontCN = BeIcon.createFromIconfontCN
