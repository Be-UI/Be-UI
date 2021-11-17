import {computed, defineComponent, getCurrentInstance, nextTick, onMounted, reactive, ref, useAttrs, VNode} from 'vue'
import {IInputNumInstance} from "./be-input-number-type";
import {IInputInst} from "../../input/src/be-input-type";
import {isFunction} from "../../../utils/common";

export default defineComponent({
    name: 'be-input-number',
    emits: [
        'prevIconClick',
        'nextIconClick',
        'update:modelValue',
        'input',
        'change',
        'clear',
        'focus',
        'blur',
        'keydown',
        'mouseleave',
        'mouseenter',
    ],
    props: {
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
         * 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用
         */
        parser:{
            type:[Function,String],
            default:''
        },
        /**
         * 指定输入框展示值的格式
         */
        formatter:{
            type:[Function,String],
            default:''
        }
    },
    setup(props, ctx) {
        // 當前實例
        const internalInstance = getCurrentInstance() as IInputNumInstance
        const uid = internalInstance.uid
        const attrs = useAttrs()
        const inputInnerVal = ref<string>('')
        /**
         * 输入响应
         * @param {String} value - 输入值
         */
        const handleInput = (value: string): void => {
            inputInnerVal.value = value
            updateInput(inputInnerVal.value)
        }
        /**
         * 点击减少方法
         */
        const handleReduce = (): void => {
            console.log('Reduce')
            if (props.disabled) return
        }
        /**
         * 点击增加方法
         */
        const handleIncrease = (): void => {
            console.log('Increase')
            if (props.disabled) return
        }
        /**
         * focus 事件处理方法
         * @param {Event} event - 事件对象
         */
        const handleFocus = (event: Event): void => {

        }
        /**
         * input 事件处理方法，实现双向绑定
         * @param {String | Number} val - 更新后值
         */
        const updateInput = (val: string | number): void => {
            ctx.emit('update:modelValue', val)
        }
        /**
         * change 事件处理方法
         * @param { String } value - 更新后值
         */
        const handleChange = (value:string): void => {
            ctx.emit('change', value)
        }
        /**************************************** 暴露对外的公共方法 *******************************************/
        const beInputInner = ref<any>(null)
        nextTick(() => {
            beInputInner.value = reactive(internalInstance.refs[`beInputInner${uid}`] as IInputInst)

        })
        const inputInnerInst = computed(() => {
            return beInputInner.value
        })
        /**
         * 手动聚焦方法
         * @public
         */
        const focus = (): void => {
            nextTick(() => {
                inputInnerInst.value.focus()
            })
        }
        /**
         * 手动失焦方法
         * @public
         */
        const blur = (): void => {
            inputInnerInst.value.blur()
        }
        /**
         * 手动选择文字方法
         * @public
         */
        const select = (): void => {
            inputInnerInst.value.select()
        }
        /**************************************** 前後插槽渲染 *******************************************/
        /**
         * 渲染前置插槽
         */
        const renderPreSlot = ():string | VNode => {
            if(internalInstance.slots.pre){
                return (
                    <div class='be-input-number__pre'>
                        {internalInstance.slots.pre()}
                    </div>
                )
            }else{
                return ''
            }
        }
        /**
         * 渲染后置插槽
         */
        const renderNextSlot = ():string | VNode => {
            if(internalInstance.slots.next){
                return (<div class='be-input-number__next'>
                    {internalInstance.slots.next()}
                </div>)
            }else{
                return ''
            }
        }
        /**
         * 初始化方法
         */
        const init = ():void=> {
            if(props.formatter && props.parser && isFunction(props.formatter) && isFunction(props.formatter)){
                debugger
            }
        }
        onMounted(()=>{
            init()
        })
        return{
            uid,
            attrs,
            inputInnerVal,
            blur,
            select,
            focus,
            handleFocus,
            handleChange,
            renderPreSlot,
            handleInput,
            handleIncrease,
            handleReduce,
            renderNextSlot,
        }
    },
    render(){
        return (
            <div class={`
                     be-input-number 
                     ${this.disabled ? 'be-input-number__disabled ' : ''}`}
                 onFocus={($event) => this.handleFocus($event)}
                 tabindex='0'>
                {this.renderPreSlot()}
                <div class={`be-input-number__${this.size} be-input-number__default`}>
                    <be-input
                        tabindex='1'
                        ref={`beInputInner${this.uid}`}
                        {...this.attrs}
                        size={this.size}
                        isInner={true}
                        onChange={this.handleChange}
                        disabled={this.disabled}
                        onFocus={(val: string, $event: InputEvent) => this.handleFocus($event)}
                        custom-class='be-input-number__inner'
                        value={this.inputInnerVal}
                        onInput={this.handleInput}>
                    </be-input>
                    <div class={`
                         be-input-number__op 
                         ${this.disabled ? 'be-input-number__op__disabled ' : ''}`}
                         onFocus={($event) => this.handleFocus($event)}
                         tabindex='1'>
                        <be-icon icon='up'
                                 tabindex='2'
                                 onClick={this.handleIncrease}
                                 className='be-input-number__up'>
                        </be-icon>
                        <be-icon icon='under'
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
