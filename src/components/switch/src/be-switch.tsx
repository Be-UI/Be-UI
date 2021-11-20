import {defineComponent, onMounted, ref} from "vue";
import {isBool, isNumber, isString} from "../../../utils/common";
import BeIcon from '../../svg-icon/src/be-icon.vue'

export default defineComponent({
    name: 'BeSwitch',
    components: {BeIcon},
    emits: [
        'update:modelValue',
        'change',
        'click',
    ],
    props: {
        /**
         * 绑定值 （完成）
         */
        modelValue: {
            type: [Boolean, String, Number],
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'large',
        },
        customClass: {
            type: String,
            default: '',
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
        checkedValue: {
            type: [Boolean, String, Number],
        },
        unCheckedValue: {
            type: [Boolean, String, Number],
        }
    },
    setup(props, ctx) {
        const innerState = ref<boolean>(false)
        const switching = ref<string>('')
        /**
         * 切换状态方法
         */
        const switchState = (): void => {
            switching.value = 'be-switching'
            setTimeout(() => {
                switching.value = ''
            }, 500)
            // 切换状态
            if (innerState.value) {
                innerState.value = false
                const changeData = {
                    newVal: props.unCheckedValue ? props.unCheckedValue : false,
                    oldVal: props.checkedValue ? props.checkedValue : true
                }
                ctx.emit('change', changeData)
                ctx.emit('update:modelValue', props.unCheckedValue ? props.unCheckedValue : false)
            } else {
                innerState.value = true
                const changeData = {
                    newVal: props.checkedValue ? props.checkedValue : true,
                    oldVal: props.unCheckedValue ? props.unCheckedValue : false
                }
                ctx.emit('change', changeData)
                ctx.emit('update:modelValue', props.checkedValue ? props.checkedValue : true)
            }

        }
        /**
         * 点击方法
         * @param {Event} $event - 事件对象
         */
        const handleClick = ($event?: Event): void => {
            if (props.disabled || props.isLoading) return
            ctx.emit('click', $event)
            switchState()
        }
        /**
         * 初始化方法
         */
        const init = (): void => {
            if (props.unCheckedValue !== undefined
                && (isBool(props.unCheckedValue)
                    || isString(props.unCheckedValue)
                    || isNumber(props.unCheckedValue))
                && props.modelValue === props.unCheckedValue) {
                innerState.value = false
            }
            if (props.checkedValue !== undefined
                && (isBool(props.checkedValue)
                    || isString(props.checkedValue)
                    || isNumber(props.checkedValue))
                && props.modelValue === props.checkedValue) {
                innerState.value = true
            }
        }
        onMounted(() => {
            init()
        })
        return () => {
            return (
                <div
                    class={`
                        be-switch
                        be-switch__${props.size}
                        ${(props.disabled || props.isLoading) ? 'be-switch__disabled' : ''}
                        ${innerState.value ? 'be-switch__checked' : 'be-switch__unChecked'}
                        ${switching.value}
                        ${props.customClass}
                    `}
                    tabindex='0'
                    onClick={($event) => handleClick($event)}>
                    {innerState.value ? <span>checked</span> : ''}
                    <div class='be-switch-circle'>
                        {props.isLoading ?
                            <be-icon spin icon='loading' customClass='be-switch-circle-icon'></be-icon> : ''}
                    </div>
                    {!innerState.value ? <span>unChecked</span> : ''}
                </div>
            )
        }
    }
})