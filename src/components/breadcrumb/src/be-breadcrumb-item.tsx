import {computed, defineAsyncComponent, defineComponent, getCurrentInstance, h, VNode} from "vue";
import {IBreadcrumbInst, IBreadcrumbItemVnode, IBreadcrumbPopover} from "./be-breadcrumb-type";
import {useBrowserLocation} from "../../../utils/use-browser-location";


export default defineComponent({
    name: 'BeBreadcrumbItem',
    components:{
        'be-popover': defineAsyncComponent(() => import("../../popover")),
    },
    emits: [
        'clickOption',
    ],
    props: {
        // 分隔符
        separator: {
            type: String,
            default: '/'
        },
        // 下拉配置
        option: {
            type: Array,
            default: () => []
        },
        // 跳转目标
        to: {
            type: String,
        },
        // 禁用
        disabled: {
            type: Boolean,
            default: false
        },
    },
    setup(props,ctx) {
        // 當前實例
        const internalInstance = getCurrentInstance() as IBreadcrumbInst
        const browserLocationRef = useBrowserLocation()
        const htmlTag = computed(() => (props.to ? 'a' : 'span'))
        const ariaCurrentRef = computed(() =>
            browserLocationRef.value.href === props.to ? 'location' : null
        )
        /**
         * 点击跳转方法
         * @param {Event} event - 事件对象
         */
        const handleClick = (event: Event): void => {
            if ((internalInstance.vnode as IBreadcrumbItemVnode).beBreadcrumbIndex === 'last'
                ||optionList.value.length > 0
                || props.disabled) {
                event.preventDefault()
            }
        }
        /**
         * 下拉点击方法
         * @param  val - 事件对象
         */
        const handleClickItem = (val:any): void => {
           ctx.emit('clickOption',val)
           const curInstPopover = internalInstance.refs.beBreadcrumbPopover as IBreadcrumbPopover
           curInstPopover.close()
        }
        const optionList = computed(() => props.option)
        /**
         * 渲染下拉列表
         */
        const renderOption = ():Array<VNode> => {
            let renderList: Array<VNode> = []
            optionList.value.forEach((val:any) => {
                // 選項列表
                renderList.push((
                    <li key={val.id} class='be-breadcrumb-item-li' onClick={()=>handleClickItem(val)}>
                        {val.label}
                    </li>
                ))
            })
            return renderList
        }
        /**
         * 渲染插槽内容
         */
        const renderContent = ():VNode => {
           return <div class='be-breadcrumb-item__content' v-slots='trigger'>
               {h(
                   htmlTag.value,
                   {
                       'aria-current': ariaCurrentRef.value,
                       href: props.to,
                       onClick: ($event: Event) => handleClick($event)
                   },
                   internalInstance.slots.default ? internalInstance.slots.default() : ''
               )}
           </div>
        }
        return () => {
            return (
                <div class={`
                     be-breadcrumb-item
                     ${props.disabled ? 'be-breadcrumb-item__disabled' : ''} `}
                     aria-label="BeBreadcrumbItem">
                    {optionList.value.length > 0 ?<be-popover
                        ref="beBreadcrumbPopover"
                        customClass='be-breadcrumb-popover'
                        placement='bottom'
                        trigger={props.disabled ? 'none' : 'click'}>
                        {{
                            default: () =>  <ul>{renderOption()}</ul>,
                            trigger: () => renderContent(),
                        }}
                    </be-popover> :renderContent() }
                    <div class='be-breadcrumb-item__separator'>
                        {internalInstance.slots.separator ? internalInstance.slots.separator() : props.separator}
                    </div>
                </div>
            )
        }
    }
})