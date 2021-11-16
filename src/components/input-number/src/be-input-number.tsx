import {defineComponent, computed, mergeProps, PropType, ref} from 'vue'
export default defineComponent({
    name:'be-input-number',
    props: {

    },
    setup(props,ctx) {
        const inputInnerVal = ref<string>('')
        /**
         * 输入响应
         * @param {String} value - 输入值
         */
        const handleInput = (value: string): void => {
            inputInnerVal.value = value
        }
        return ()=>{
            return (
                <div class={`be-input-number`}>
                    <be-input value={inputInnerVal.value} onInput={handleInput}>
                    </be-input>
                    <div class='be-input-number__op'>
                        <be-icon icon='up'></be-icon>
                        <be-icon icon='under'></be-icon>
                    </div>
                </div>
            )
        }
    }

});
