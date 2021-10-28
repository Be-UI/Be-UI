import {computed, defineComponent, reactive, ref, h, getCurrentInstance, Transition, VNode} from 'vue'
import '../../../assets/style/be-select.scss';
import {ISelect} from "../src/be-select-type";
import BeInputSelect from "../../autocomplete/src/be-input-select.vue";
import BePopover from "../../popover/src/be-popover.vue";
import BeIcon from "../../svg-icon/src/be-icon.vue";
import {IInputSelectFunc} from "../../autocomplete/src/be-autocomplete-type";
import {getUuid} from "../../../utils/common";

export default defineComponent({
    name: "be-select",
    components: {BeInputSelect, BePopover,BeIcon},
    emits: [
        'update:modelValue',
    ],
    props: {
        /**
         * 整体禁用
         */
        disabled: {
            type: Boolean,
            default: false
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
         * 數據list
         */
        list: {
            type: Array,
            default: () => [
                {id: 'qwdasdqw', label: 'gadohgae'},
                {id: 'qwdasddqw', label: 'aaqw'}
            ]
        },
        /**
         * 绑定值 （完成）
         */
        modelValue: {},
        /**
         * 下拉label
         */
        labelValue:{
            type:String,
            default:'label'
        },
        /**
         * 下拉key
         */
        keyValue:{
            type:String,
        },
        /**
         * placeholder
         */
        placeholder:{
            type:String,
            default:'请选择'
        }

    },
    setup(props, ctx) {
        const internalInstance = getCurrentInstance() as ISelect
        const uid = internalInstance.uid
        // 只读
        const readonlyInput = ref<boolean>(true)
        // cursor 的样式
        const cursor = props.disabled ? 'not-allowed' : readonlyInput.value ? 'pointer' : ''
        const loading = ref<boolean>(false)
        const dataList = ref<Array<any>>(props.list)
        const roateAnima = ref<string>('')

        // 沒有指定key，則生成
        if (!props.keyValue) {
            dataList.value.forEach(val => {
                val.id = getUuid()
            })
        }

        // 输入建议下拉样式
        let selectStyle = reactive({width: '0px'})
        /**
         * 计算输入建议下拉框位置
         * @param {Element} $eventDom - 输入建议下拉框dom
         */
        const computedPositon = ($eventDom: HTMLElement | null): void => {
            if (!$eventDom) return
            selectStyle.width = Number(window.getComputedStyle($eventDom).width.split('px')[0]) + 'px'
        }
        /**
         * 更新數據方法
         * @param value
         */
        const updateValue = (value: any): void => {
            if (props.keyValue) {
                ctx.emit('update:modelValue', value)
            } else {
                ctx.emit('update:modelValue', value[props.labelValue])
            }
        }
        /**
         * 下拉搜索选择事件方法
         * @param {Object } value - 选中后值
         * @param {Number} index - 点击索引
         */
        const handleSelect = (value: any, index: number): void => {
            updateValue(value)

            /** 输入建议选中 select 事件
             * @event select
             * @param {Object} value - 点击对象数据
             * @param {Number} index - 点击的对应列表索引
             */
                // 关闭下拉，清除缓存
            const curInstPopover = internalInstance.refs.beSelectPopover as IInputSelectFunc
            curInstPopover.close()
        }
        // 事件目标元素
        let eventDom: HTMLElement | null = null

        /**
         * focus 事件处理方法
         * @param {Event} event - 事件对象
         */
        const handleFocus = (event: Event): void => {
            // 获取事件目标元素，计算宽度，用于下拉样式设置
            const $eventDom: HTMLElement | null = (event.target as HTMLInputElement).parentElement
            eventDom = $eventDom
            computedPositon($eventDom)

            /* ctx.emit('focus', valInner.value)
             // 焦點獲取數據
             if (props.fetchSuggestions && props.focusTrigger) {
                 getSuggestions()
             }*/
        }
        const selectOpenChange = ():void =>{


        }
        const renderOption = ():Array<VNode> => {
            const keyValue = props?.keyValue || 'id'
            let optionList:Array<VNode> = []
            dataList.value.forEach((val,index)=>{
                optionList.push((
                    <div
                        class='be-select-option'
                        key={val[keyValue]}
                        onClick = {()=>handleSelect(val,index)} >
                        {val[props.labelValue]}
                    </div>
                ))
            })
            return optionList
        }
        return () => {
            return (
                <div id={`be_select-${uid}`}
                     class='be-select'>
                    <be-popover
                        onUpdate={selectOpenChange}
                        trigger="click"
                        placement="bottom"
                        ref="beSelectPopover"
                        trigger-elm={`be_select-${uid}`}
                        custom-class="be-select-popover">
                        {{
                            default: (
                                <div style={selectStyle} class='be-select-option-body'>
                                    {renderOption()}
                                </div>
                              /*  <be-input-select
                                    selectStyle={selectStyle}
                                    onSelect={handleSelect}
                                    loading={loading.value}
                                    labelValue={props.labelValue}
                                    keyValue={props.keyValue}
                                    select-list={dataList.value}>
                                </be-input-select>*/
                            ),
                            trigger: (
                                <div class='be-select-body'>
                                    <input readonly={readonlyInput.value}
                                           value={props.modelValue}
                                           placeholder={props.placeholder}
                                           onFocus={($event) => handleFocus($event)}
                                           disabled={props.disabled}
                                           class={`be-select-input be-select-input__${props.size}`}
                                           style={{
                                               cursor: cursor
                                           }}
                                    />
                                    <be-icon icon='under' class={`be-select-icon`}></be-icon>
                                </div>
                            )
                        }}
                    </be-popover>
                </div>
            )

        }
    }
})