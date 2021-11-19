import {
    computed,
    defineComponent,
    getCurrentInstance,
    nextTick, onBeforeUnmount,
    onMounted,
    reactive,
    ref,
    useAttrs,
    VNode,
    watch
} from 'vue'
import {IInputNumInstance, IInputNumLimit} from "./be-input-number-type";
import {IInputInst} from "../../input/src/be-input-type";
import {accAdd, accSub, checkNumber} from "../../../utils/common";
import beInput from '../../input'
import beIcon from '../../svg-icon'
export default defineComponent({
    name: 'be-input-number',
    components:{beInput,beIcon},
    emits: [
        'update:modelValue',
        'change',
        'blur',
        'focus',
        'select',
        'step',
        'pressEnter'
    ],
    props: {
        /**
         * 绑定值 （完成）
         */
        modelValue: {
            type: [String, Number],
            default: '',
        },
        /**
         * 大小
         * @values 'mini' | 'medium' | 'large'
         */
        size: {
            type: String,
            default: 'medium'
        },
        /**
         * 是否禁用（完成）
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * 是否开启键盘快捷行为
         */
        keyboard: {
            type: Boolean,
            default: false
        },
        /**
         * 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用
         */
        parser: {
            type: Function,
            default: (val: string | number) => val
        },
        /**
         * 指定输入框展示值的格式
         */
        formatter: {
            type: Function,
            default: (val: string | number) => val
        },
        /**
         * 最大值
         */
        max: {
            type: [String, Number],
            default: '',
        },
        /**
         * 最小值
         */
        min: {
            type: [String, Number],
            default: '',
        },
        /**
         * 步数
         */
        step: {
            type: Number,
            default: 1
        }
    },
    setup(props, ctx) {
        // 當前實例
        const internalInstance = getCurrentInstance() as IInputNumInstance
        const uid = internalInstance.uid
        const attrs = useAttrs()
        const tabindex = ref<number>(1)
        /**
         * focus 事件处理方法
         * @param {Event} event - 事件对象
         */
        const handleFocus = (event?: Event): void => {
            tabindex.value = -1
        }
        /**
         * Blur 事件处理方法
         * @param {string} val - 事件对象
         */
        const handleBlur = (val?: string): void => {
            tabindex.value = 1
        }
        // 内部维护输入框
        const inputInnerVal = ref<string>('')
        /**
         * 输入响应
         * @param {String} value - 输入值
         */
        const handleInput = (value: string): void => {
            let parserRes: string = props.parser(value)
            let pointCheck: boolean = false
            let splitRes: Array<string> = parserRes.split('.')
            splitRes.forEach((val: string) => {
                if (!val) {
                    pointCheck = true
                }
            })
            if (!pointCheck && !checkNumber(parserRes)) {
                parserRes = ''
            }
            inputInnerVal.value = ''
            nextTick(() => {
                if (pointCheck) {
                    inputInnerVal.value = props.formatter(parserRes)
                } else {
                    const val = (limitValue(parserRes) as IInputNumLimit).val
                    inputInnerVal.value = props.formatter(val)
                    updateInput(val)
                }

            })
        }
        /**
         * input 事件处理方法，实现双向绑定
         * @param {String | Number} value - 更新后值
         */
        const updateInput = (value: string | number): void => {
            ctx.emit('update:modelValue', value)
        }
        /**
         * 限制输入区间
         * @param value
         */
        const limitValue = <T, >(value: T) => {
            if (!value) return {val: value, type: ''}
            const val = Number(value)
            const max = props.max !== '' ? Number(props.max) : null
            const min = props.min !== '' ? Number(props.min) : null
            // max，min 为真，且在区间内 或者 max，min为假
            if ((max && min && min <= val && val <= max && max && min)
                || !max && !min
                || min && val >= min && !max
                || max && val <= max && !min
            ) {
                return {val: val, type: ''}
            }
            if (min && val < min) {
                return {val: min, type: 'limit'}
            }
            if (max && val > max) {
                return {val: max, type: 'limit'}
            }
        }
        /**
         * change 事件处理方法
         * @param { String } value - 更新后值
         */
        const handleChange = (value: string | number): void => {
            const val = props.parser(value)
            if (!val) {
                inputInnerVal.value = props.formatter(val)

            }
            ctx.emit('change', val)
        }
        /**************************************** 键盘响应以及增加方法 *******************************************/
        /**
         * 点击减少方法
         */
        const handleReduce = (): void => {
            if (props.disabled) return
            const res = accSub([Number(props.modelValue), Number(props.step)])
            updateInput((limitValue(res) as IInputNumLimit).val)
            ctx.emit('step', {value: res, type: 'reduce'})
        }
        /**
         * 点击增加方法
         */
        const handleIncrease = (): void => {
            if (props.disabled) return
            const res = accAdd(Number(props.modelValue), Number(props.step))
            updateInput((limitValue(res) as IInputNumLimit).val)
            ctx.emit('step', {value: res, type: 'increase'})
        }
        /**
         * 处理键盘响应事件
         */
        const handleKeyDown = (event: KeyboardEvent): void => {
            if(!props.keyboard) return
            if (event.key === 'ArrowUp') {
                handleIncrease()
            }
            if (event.key === 'ArrowDown') {
                handleReduce()
            }
            if (event.key === 'Enter') {
                ctx.emit('pressEnter', props.modelValue)
            }
        }
        /**************************************** 暴露对外的公共方法 *******************************************/
        const beInputInner = ref<any>(null)
        nextTick(() => {
            beInputInner.value = internalInstance.refs[`beInputInner${uid}`] && reactive(internalInstance.refs[`beInputInner${uid}`] as IInputInst)
        })
        const inputInnerInst = computed(() => {
            return beInputInner.value
        })
        /**
         * 手动聚焦方法
         * @public
         */
        const focus =  (): void => {
            nextTick(()=>{
                inputInnerInst.value.focus()
                ctx.emit('focus')
            })

        }
        /**
         * 手动失焦方法
         * @public
         */
        const blur = (): void => {
            inputInnerInst.value.blur()
            ctx.emit('blur')
        }
        /**
         * 手动选择文字方法
         * @public
         */
        const select = (): void => {
            inputInnerInst.value.select()
            ctx.emit('select')
        }
        /**************************************** 前後插槽渲染 *******************************************/
        /**
         * 渲染前置插槽
         */
        const renderPreSlot = (): string | VNode => {
            if (internalInstance.slots.pre) {
                return (
                    <div class='be-input-number__pre'>
                        {internalInstance.slots.pre()}
                    </div>
                )
            } else {
                return ''
            }
        }
        /**
         * 渲染后置插槽
         */
        const renderNextSlot = (): string | VNode => {
            if (internalInstance.slots.next) {
                return (<div class='be-input-number__next'>
                    {internalInstance.slots.next()}
                </div>)
            } else {
                return ''
            }
        }
        /**************************************** 初始化方法 *******************************************/
        /**
         * 初始化方法
         */
        const init = (): void => {
            if ((props.modelValue && checkNumber(props.modelValue.toString()) )|| props.modelValue === 0) {
                inputInnerVal.value = props.formatter(props.modelValue)
            }else{
                //console.error('You should pass in numeric or pure numeric string variables, such as 1 or \'12\'')
            }
        }
        const modelVal = computed(() => props.modelValue)
        watch(modelVal, (nVal: string | number) => {
            if (nVal) {
                inputInnerVal.value = props.formatter(nVal)
            }

        })
        const showLimit = computed(() => {
            return (limitValue(props.modelValue) as IInputNumLimit).type
        })
        onMounted(() => {
            init()
        })

        return {
            uid,
            attrs,
            inputInnerVal,
            showLimit,
            tabindex,
            blur,
            select,
            focus,
            handleFocus,
            handleBlur,
            handleChange,
            renderPreSlot,
            handleInput,
            handleIncrease,
            handleReduce,
            renderNextSlot,
            handleKeyDown,
        }
    },
    render() {
        return (
            <div class={`
                     be-input-number 
                     ${this.disabled ? 'be-input-number__disabled ' : ''}`}
                 id={`be_input_number${this.uid}`}
                 onFocus={($event) => this.handleFocus($event)}
                 onBlur={($event) => this.handleBlur($event)}
                 onKeydown={($event) => this.handleKeyDown($event)}
                 tabindex='0'>
                {this.renderPreSlot()}
                <div class={`be-input-number__${this.size} be-input-number__default`}>
                    <be-input
                        tabindex={this.tabindex}
                        ref={`beInputInner${this.uid}`}
                        {...this.attrs}
                        size={this.size}
                        isInner={true}
                        onChange={this.handleChange}
                        disabled={this.disabled}
                        onFocus={(val: string, $event: InputEvent) => this.handleFocus($event)}
                        onBlur={(val: string) => this.handleBlur(val)}
                        custom-class={`be-input-number__inner be-input-number__${this.showLimit}`}
                        value={this.inputInnerVal}
                        onInput={this.handleInput}>
                    </be-input>
                    <div class={`
                         be-input-number__op 
                         ${this.disabled ? 'be-input-number__op__disabled ' : ''}`}
                         onBlur={($event) => this.handleBlur($event)}
                         onFocus={($event) => this.handleFocus($event)}
                         tabindex='1'>
                        <be-icon icon='up'
                                 class='be-input-number__up'
                                 tabindex='2'
                                 onClick={this.handleIncrease}
                                 className='be-input-number__up'>
                        </be-icon>
                        <be-icon icon='under'
                                 class='be-input-number__down'
                                 tabindex='2'
                                 onClick={this.handleReduce}>
                        </be-icon>
                    </div>
                </div>
                {this.renderNextSlot()}
            </div>
        )
    }

});
