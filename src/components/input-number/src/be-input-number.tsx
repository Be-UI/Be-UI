import {defineComponent, getCurrentInstance, ref, VNode} from 'vue'
import {IInputNumInstance} from "./be-input-number-type";
import {JsxElement} from "vue-tsc/typescript/lib/tsserverlibrary";

export default defineComponent({
    name: 'be-input-number',
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
    },
    setup(props, ctx) {
        // 當前實例
        const internalInstance = getCurrentInstance() as IInputNumInstance
        const inputInnerVal = ref<string>('')
        /**
         * 输入响应
         * @param {String} value - 输入值
         */
        const handleInput = (value: string): void => {
            inputInnerVal.value = value
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
        return () => {
            return (
                <div class={`
                     be-input-number 
                     ${props.disabled ? 'be-input-number__disabled ' : ''}`}
                     onFocus={($event) => handleFocus($event)}
                     tabindex='0'>
                    {renderPreSlot()}
                    <div class={`be-input-number__${props.size} be-input-number__default`}>
                        <be-input
                            tabindex='1'
                            size={props.size}
                            isInner={true}
                            disabled={props.disabled}
                            onFocus={(val: string, $event: InputEvent) => handleFocus($event)}
                            custom-class='be-input-number__inner'
                            value={inputInnerVal.value}
                            onInput={handleInput}>
                        </be-input>
                        <div class={`
                         be-input-number__op 
                         ${props.disabled ? 'be-input-number__op__disabled ' : ''}`}
                             onFocus={($event) => handleFocus($event)}
                             tabindex='1'>
                            <be-icon icon='up'
                                     tabindex='2'
                                     onClick={handleIncrease}
                                     className='be-input-number__up'>
                            </be-icon>
                            <be-icon icon='under'
                                     tabindex='2'
                                     onClick={handleReduce}>
                            </be-icon>
                        </div>
                    </div>
                    {renderNextSlot()}
                </div>
            )
        }
    }

});
