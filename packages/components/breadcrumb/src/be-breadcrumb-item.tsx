import type { VNode } from 'vue'
import { computed, defineComponent, getCurrentInstance, h, nextTick, onMounted } from 'vue'
import { useBrowserLocation } from '@be-ui/utils'
import { BePopover } from '@be-ui/components'
import { getUuid } from '@be-ui/utils'
import type { IBreadcrumbInst, IBreadcrumbItemVnode, IBreadcrumbPopover } from './be-breadcrumb-type'
export default defineComponent({
  name: 'BeBreadcrumbItem',
  components: {
    BePopover,
  },

  props: {
    // 分隔符
    separator: {
      type: String,
      default: '/',
    },
    // 下拉配置
    option: {
      type: Array,
      default: () => [],
    },
    // 跳转目标
    to: {
      type: String,
      default: '',
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    click: {
      type: Function,
    },
    clickOption: {
      type: Function,
    },
    /**
     * 内部调用，更新布局，
     */
    forceUpdate: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    // 當前實例
    const internalInstance = getCurrentInstance() as IBreadcrumbInst
    const uid = internalInstance?.uid
    const browserLocationRef = useBrowserLocation()
    const htmlTag = computed(() => (props.to && !props.click && !props.disabled && !props.clickOption ? 'a' : 'span'))
    const ariaCurrentRef = computed(() =>
      browserLocationRef.value.href === props.to ? 'location' : null,
    )
    const optionList = computed(() => props.option)
    /**
     * 点击跳转方法
     * @param {Event} event - 事件对象
     */
    const handleClick = (event: Event): void => {
      // @ts-ignore
      if (
        (internalInstance?.vnode as IBreadcrumbItemVnode)?.beBreadcrumbIndex === 'last'
        || optionList.value.length > 0
        || props.disabled
      ) {
        event.preventDefault()
        return
      }
      if (props.click && !props.disabled) {
        event.preventDefault()
        props.click(event)
      }
    }
    /**
     * 下拉点击方法
     * @param  val - 事件对象
     */
    const handleClickItem = (val: any) => {
      if (props?.clickOption)
        props?.clickOption(val)

      const curInstPopover = (internalInstance?.refs.beBreadcrumbPopover) as IBreadcrumbPopover
      // @ts-ignore
      curInstPopover.close()
    }

    /**
     * 渲染下拉列表
     */
    const renderOption = () => {
      const renderList: Array<VNode> = []
      optionList.value.forEach((val: any) => {
       // @ts-ignore
        const id = val.id ? val.id as string : getUuid()
       // @ts-ignore
        const label = val.label
        renderList.push(
         // @ts-ignore
          <li key={id} class="be-breadcrumb--li" onClick={() => handleClickItem(val)}>{label}</li>,
        )
      })

      return renderList
    }
    /**
     * 渲染插槽内容
     */
    const renderContent = (): VNode => {
      return (
        <div
          class="be-breadcrumb--item__content"
          ref="BeBreadcrumbItem"
          id={`be_breadcrumb_item__content${uid}`}
          onClick={($event: Event) => handleClick($event)}>
          {h(
            htmlTag.value,
            {
              'aria-current': ariaCurrentRef.value,
              'href': props.to,
            },
            internalInstance?.slots.default ? internalInstance?.slots.default() : '',
          )}
        </div>
      )
    }
    onMounted(() => {
      nextTick(() => {
        const curInstPopover = internalInstance?.refs.beBreadcrumbPopover as IBreadcrumbPopover
        optionList.value.length > 0
       // @ts-ignore
          && curInstPopover.addEvent(internalInstance?.refs.BeBreadcrumbItem)
      })
    })
    return () => {
     // @ts-ignore
      return (
        <div
          class={`
                     be-breadcrumb--item
                     ${props.disabled ? 'be-breadcrumb--item__disabled' : ''} `}
          aria-label="BeBreadcrumbItem">
          {optionList.value.length > 0
            ? (
              <be-popover
                  forceUpdate={props.forceUpdate}
                  ref="beBreadcrumbPopover"
                  customClass="be-breadcrumb--popover"
                  placement="bottom"
                  trigger={props.disabled ? 'none' : 'click'}>
                  {{
                    default: () => <ul>{renderOption()}</ul>,
                    trigger: () => renderContent(),
                  }}
              </be-popover>
              )
            : (
                renderContent()
              )}
          <div class="be-breadcrumb--item__separator">
            {internalInstance?.slots?.separator
              ? internalInstance?.slots?.separator()
              : props.separator}
          </div>
        </div>
      )
    }
  },
})
