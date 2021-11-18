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
import {accAdd, accSub, isFunction} from "../../../utils/common";

export default defineComponent({
    name: 'be-input-number',
    emits: [
        'update:modelValue',
        'change',
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
        parser:{
            type:Function,
            default:(val:string | number)=>val
        },
        /**
         * 指定输入框展示值的格式
         */
        formatter:{
            type:Function,
            default:(val:string | number)=>val
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
        step:{
            type: Number,
            default: 0.3
        }
    },
    setup(props, ctx) {
        // 當前實例
        const internalInstance = getCurrentInstance() as IInputNumInstance
        const uid = internalInstance.uid
        const attrs = useAttrs()
        /**
         * focus 事件处理方法
         * @param {Event} event - 事件对象
         */
        const handleFocus = (event: Event): void => {

        }
        // 内部维护输入框
        const inputInnerVal = ref<string>('')
        /**
         * 输入响应
         * @param {String} value - 输入值
         */
        const handleInput = (value: string): void => {
            inputInnerVal.value = ''
            nextTick(()=>{
                const val = (limitValue(props.parser(value)) as IInputNumLimit).val
                inputInnerVal.value = props.formatter(val)
                updateInput(val)
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
        const limitValue = <T,>(value:T) =>{
            if(!value)  return {val:value,type:''}
            const val = Number(value)
            const max = props.max !== '' ? Number(props.max) : null
            const min = props.min !== '' ? Number(props.min) : null
            // max，min 为真，且在区间内 或者 max，min为假
            if((max && min && min <= val && val <= max && max && min) || !max && !min) {
                return {val:val,type:''}
            }
            if(min && val < min ){return {val:min,type:'limit'}}
            if(max && val > max ){return {val:max,type:'limit'}}
        }
        /**
         * change 事件处理方法
         * @param { String } value - 更新后值
         */
        const handleChange = (value: string | number): void => {
            const val = props.parser(value)
            if(!val){
                inputInnerVal.value = props.formatter(val)

            }
            ctx.emit('change',  val)
        }
        /**************************************** 键盘响应以及增加方法 *******************************************/
        /**
         * 点击减少方法
         */
        const handleReduce = (): void => {
            if (props.disabled) return
            const res = accSub([Number(props.modelValue),Number(props.step)])
            updateInput(res)
            ctx.emit('step',{value:res,type:'reduce'})
        }
        /**
         * 点击增加方法
         */
        const handleIncrease = (): void => {
            if (props.disabled) return
            const res = accAdd(Number(props.modelValue),Number(props.step))
            updateInput(res)
            ctx.emit('step',{value:res,type:'increase'})
        }
        let keyBoradDom:HTMLElement
        /**
         * 添加键盘监听事件
         */
        const addKeyBoardEvt = ():void =>{
            keyBoradDom = document.getElementById(`be_input_number${uid}`) as HTMLElement
            keyBoradDom.addEventListener('keydown', handleKeyDown)
        }
        /**
         * 移除键盘监听事件
         */
        const removeKeyBoardEvt = ():void =>{
            keyBoradDom.removeEventListener('keydown', handleKeyDown)
        }
        /**
         * 处理键盘响应事件
         */
        const handleKeyDown = (event:KeyboardEvent):void =>{
            if(event.key === 'ArrowUp'){
                handleIncrease()
            }
            if(event.key === 'ArrowDown'){
                handleReduce()
            }
            if(event.key === 'Enter'){
                ctx.emit('pressEnter',props.modelValue)
            }
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
        /**************************************** 初始化方法 *******************************************/
        /**
         * 初始化方法
         */
        const init = ():void=> {
            if(props.modelValue){
                inputInnerVal.value = props.formatter(props.modelValue)
            }
            // 开启键盘事件监听
            if(props.keyboard){
                addKeyBoardEvt()
            }
        }
        const modelVal = computed(()=>props.modelValue)
        watch(modelVal,(nVal:string|number)=>{
            if(nVal){
                inputInnerVal.value = props.formatter(nVal)
                console.log(inputInnerVal.value)
            }

        })
        const showLimit = computed(()=>{
            return (limitValue(props.modelValue) as IInputNumLimit).type
        })
        onMounted(()=>{
            init()
        })
        onBeforeUnmount(() => {
            // 取消事件监听
            removeKeyBoardEvt()
        })
        return{
            uid,
            attrs,
            inputInnerVal,
            showLimit,
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
                 id={`be_input_number${this.uid}`}
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
                        custom-class={`be-input-number__inner be-input-number__${this.showLimit}`}
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
