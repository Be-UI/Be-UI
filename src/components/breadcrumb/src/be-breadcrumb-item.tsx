import {computed, defineComponent, getCurrentInstance, h} from "vue";
import {IBreadcrumbInst, IBreadcrumbItemVnode} from "./be-breadcrumb-type";
import {useBrowserLocation} from "../../../utils/use-browser-location";

export default defineComponent({
    name: 'BeBreadcrumbItem',
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
    setup(props) {
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
            ||props.disabled) {
                event.preventDefault()
            }
        }
        return () => {
            return (
                <div class={`
                be-breadcrumb-item
                ${props.disabled ? 'be-breadcrumb-item__disabled' :''}
                `}
                     aria-label="BeBreadcrumbItem">
                    <div class='be-breadcrumb-item__content'>
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
                    <div class='be-breadcrumb-item__separator'>
                        {internalInstance.slots.separator ? internalInstance.slots.separator() : props.separator}
                    </div>
                </div>
            )
        }
    }
})