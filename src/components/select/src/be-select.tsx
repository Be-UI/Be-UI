import {
    computed,
    defineComponent,
    reactive,
    ref,
    h,
    getCurrentInstance,
    Transition,
    VNode,
    nextTick,
    watch,
    onMounted
} from 'vue'
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
        'select',
        'focus',
        'blur',
        'openChange',
        'clear',
        'MouseEnter',
        'MouseLeave',
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
               /* {id: 'qwdasdqw', label: 'gadohgae',disabled:true},
                {id: 'qwdasddqw', label: 'aaqw'}*/
                {
                    type:'group',
                    label:'group1',
                    id:'asdwq',
                    children:[
                        {
                            label: 'Drive My Car',
                            id: 'songdqw1'
                        },
                        {
                            label: 'Drive My Car',
                            id: 'song1as',
                            disabled:true
                        }
                    ]
                },
                {
                    type:'group',
                    label:'group2',
                    id:'asdwqf',
                    children:[
                        {
                            label: 'Drive My Car dwqd',
                            id: 'songdqw1a'
                        },
                        {
                            label: 'Drive My Car asd',
                            id: 'song1aqws',
                            disabled:true
                        }
                    ]
                }
            ]
        },
        /**
         * 绑定值 （完成）
         */
        modelValue: {

        },
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
        },
        /**
         * 可清空
         */
        clear:{
            type: Boolean,
            default: false
        },
        /**
         * 下拉图标
         */
        selectIcon:{
            type:String,
            default:'under'
        },
        /**
         * 开启分组
         */
        group:{
            type: Boolean,
            default: false
        },


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
        const list = computed(()=>{return props.list})
        watch(list,(nVal,oVal)=>{
            if(nVal !== oVal){
                handleList()
            }
        })
        /**
         * 處理列表數據
         */
        const handleList = ():void =>{
            // 分组数据处理逻辑
            if(props.group){
                let arr:Array<any> = []
                props.list.forEach((res:any)=> {
                    let group = {...res}
                    delete group.children
                    arr.push(group)
                    if(res.children?.length > 0){
                        res.children.forEach((childRes:any)=> {
                            arr.push(childRes)
                        })
                    }
                })
                dataList.value = arr
            }else{
                // 沒有指定key，則生成
                if (!props.keyValue) {
                    dataList.value.forEach(val => {
                        val.id = getUuid()
                    })
                }
            }
        }
        // 输入建议下拉样式
        let selectStyle = reactive({width: '0px'})
        /**
         * 计算输入建议下拉框位置
         */
        const computedPositon = (): void => {
            const $eventDom:HTMLElement | null = document.getElementById(`be-select-body${uid}`)
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
            /** 选中 select 事件
             * @event select
             * @param {Object} value - 点击对象数据
             * @param {Number} index - 点击的对应列表索引
             */
            ctx.emit('select', value,index)
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
            computedPositon()
            /** focus 事件
             * @event focus
             * @param {Event} event - 事件对象
             */
            ctx.emit('focus',event)
             // 焦點獲取數據
            /*  if (props.fetchSuggestions && props.focusTrigger) {
                 getSuggestions()
             }*/
        }
        /**
         * blur 事件处理方法
         * @param {Event} event - 事件对象
         */
        const handleBlur = (event: Event): void => {
            /** 输入 blur 事件
             * @event blur
             * @param {Event} event - 事件对象
             */
            ctx.emit('blur',event)
        }

        /**
         * 下拉列表展開關閉方法
         * @param {Boolean} showPopover - popover展開狀態
         */
        const selectOpenChange = (showPopover:boolean):void =>{
            /** 输入 openChange 事件
             * @event blur
             * @param {Boolean} showPopover - popover展開狀態
             */
            ctx.emit('openChange',showPopover)

        }
        const iconType = ref<string>(computed(()=>props.selectIcon).value)
        const changeIcon = (type:string | undefined):void =>{
            if(props.clear && props.modelValue){
                iconType.value = type || 'error'
                return
            }
        }
        /**
         * 處理鼠標移入
         * @param {Event} event - 事件对象
         */
        const handleMouseEnter = (event: Event):void =>{
            changeIcon(undefined)
            /** MouseEnter 事件
             * @event MouseEnter
             * @param {Event} event - 事件对象
             */
            ctx.emit('MouseEnter',event)
        }
        /**
         * 處理鼠標移出
         * @param {Event} event - 事件对象
         */
        const handleMouseLeave = (event: Event):void =>{
            changeIcon(props.selectIcon)
            /** MouseLeave 事件
             * @event MouseLeave
             * @param {Event} event - 事件对象
             */
            ctx.emit('MouseLeave',event)
        }
        /**
         * 清除方法
         */
        const handleClear = ():void =>{
            updateValue('')
            /** 输入 clear 事件
             * @event clear
             */
            ctx.emit('clear')
            changeIcon(props.selectIcon)
        }
        /**
         * 選項列表渲染
         */
        const renderOption = ():Array<VNode> => {
            const keyValue = props?.keyValue || 'id'
            let optionList:Array<VNode> = []
            dataList.value.forEach((val,index)=>{
                // 分组分割线
                optionList.push((
                    <div
                        class={`
                        ${val.type === 'group' && index !== 0 ? 'be-select-option__line' : ''}
                        ${val.type === 'group' ? 'be-select-option__group' : 'be-select-option'}
                        ${val.disabled ? 'be-select-option__disabled' : ''}`}
                        key={val[keyValue]}
                        onClick = {()=>{
                            if(val.disabled || val.type === 'group') return
                            handleSelect(val,index)
                        }} >
                        {val[props.labelValue]}
                    </div>
                ))
            })
            return optionList
        }
        onMounted(()=>{
            handleList()
        })
        return () => {
            return (
                <div id={`be_select-${uid}`}
                     class='be-select'>
                    <be-popover
                        onUpdate={selectOpenChange}
                        trigger='click'
                        placement="bottom"
                        ref="beSelectPopover"
                        trigger-elm={`be_select-${uid}`}
                        custom-class="be-select-popover">
                        {{
                            default: (
                                <div style={selectStyle} class='be-select-option-body'>
                                    {renderOption()}
                                </div>
                            ),
                            trigger: (
                                <div class='be-select-body'
                                     id={`be-select-body${uid}`}
                                     style={{
                                         cursor: cursor
                                     }}
                                     tabindex={`0`}
                                     onMouseenter={($event) =>handleMouseEnter($event)}
                                     onMouseleave={($event) =>handleMouseLeave($event)}
                                     onFocus={($event) => handleFocus($event)}
                                     onBlur={($event)=>handleBlur($event)}>
                                    <input readonly={readonlyInput.value}
                                           tabindex={`-1`}
                                           onFocus={computedPositon}
                                           value={props.modelValue}
                                           placeholder={props.placeholder}
                                           disabled={props.disabled}
                                           style={{
                                               cursor: cursor
                                           }}
                                           class={`be-select-input be-select-input__${props.size}`}
                                    />
                                    <be-icon icon={iconType.value}
                                             onClick={($event:Event)=>{
                                                 if(iconType.value === 'error') {
                                                     handleClear()
                                                     $event.stopPropagation()
                                                 }}}
                                             class={`be-select-icon`}>
                                    </be-icon>
                                </div>
                            )
                        }}
                    </be-popover>
                </div>
            )
        }
    }
})