import { defineComponent, getCurrentInstance } from 'vue'
import type { IBreadcrumb, IBreadcrumbInst, IBreadcrumbItemVnode } from './be-breadcrumb-type'
export default defineComponent({
  name: 'BeBreadcrumb',
  setup() {
    // 當前實例
    const internalInstance = getCurrentInstance() as IBreadcrumbInst
    const slots: Array<IBreadcrumbItemVnode> = internalInstance?.slots.default
      ? internalInstance?.slots.default()
      : []
    // 给插槽最后一个虚拟dom打上标记，在点击跳转时能够识别阻止
    if (
      slots.length > 0
      && (slots[slots.length - 1].type as IBreadcrumb).name === 'BeBreadcrumbItem'
    )
      slots[slots.length - 1].beBreadcrumbIndex = 'last'

    return () => {
      return (
        <div class="be-breadcrumb" aria-label="BeBreadcrumb">
          {slots}
        </div>
      )
    }
  },
})
