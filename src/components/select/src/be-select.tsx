import {
    computed,
    defineComponent,
    reactive,
    ref,
    getCurrentInstance,
    VNode,
    watch,
    onMounted, nextTick, useAttrs
} from 'vue'
import '../../../assets/style/be-select.scss';
import {IOption, ISelect} from "../src/be-select-type";
import BeInputSelect from "../../autocomplete/src/be-input-select.vue";
import BePopover from "../../popover/src/be-popover.vue";
import BeIcon from "../../svg-icon/src/be-icon.vue";
import {IInputSelectFunc} from "../../autocomplete/src/be-autocomplete-type";
import {debounce, getUuid, isFunction, isString} from "../../../utils/common";

export default defineComponent({
    name: "be-select",
    components: {BeInputSelect, BePopover, BeIcon},
    emits: [
        'update:modelValue',
        'select',
        'focus',
        'blur',
        'openChange',
        'clear',
        'search',
        'MouseEnter',
        'MouseLeave',
        'scroll',
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
            default: () => []
        },
        /**
         * 绑定值 （完成）
         */
        modelValue: {},
        /**
         * 下拉label
         */
        labelValue: {
            type: String,
            default: 'label'
        },
        /**
         * 下拉key
         */
        keyValue: {
            type: String,
        },
        /**
         * placeholder
         */
        placeholder: {
            type: String,
            default: '请选择'
        },
        /**
         * 可清空
         */
        clear: {
            type: Boolean,
            default: false
        },
        /**
         * 下拉图标
         */
        selectIcon: {
            type: String,
            default: 'under'
        },
        /**
         * 开启分组
         */
        group: {
            type: Boolean,
            default: false
        },
        /**
         * 动态扩展
         */
        extend: {
            type: Boolean,
            default: false
        },
        /**
         * 开启搜索匹配
         */
        search: {
            type: Boolean,
            default: false
        },
        /**
         * 搜索匹配方法
         */
        searchFunc: {
            type: Function,
        },
        /**
         * 搜索排序方法
         */
        sortFunc: {
            type: Function,
        },
        /**
         * 开启远程搜索
         */
        remote: {
            type: Boolean,
            default: false
        },
        /**
         * 远程搜索方法
         */
        remoteFunc: {
            type: Function,
        },
        /**
         * 指定样式
         */
        customClass: {
            type: String,
            default: ''
        }

    },
    setup(props, ctx) {
        // 當前實例
        const internalInstance = getCurrentInstance() as ISelect
        // 當前實例uid
        const uid = internalInstance.uid
        // 下拉數據列表
        const dataList = ref<Array<any>>([])
        // 下拉數據列表監聽
        const list = computed(() => {
            return props.list
        })
        watch(list, (nVal, oVal) => {
            if (nVal !== oVal) {
                handleList(props.list)
            }
        })
        // 列表緩存
        let listCache: Array<any> = []
        /**
         * 處理列表數據
         * @param {Array} list - 数据列表
         */
        const handleList = (list: Array<any>): void => {
            // 分组数据处理逻辑
            if (props.group) {
                let arr: Array<any> = []
                list.forEach((res: any) => {
                    let group = {...res}
                    delete group.children
                    arr.push(group)
                    if (res.children?.length > 0) {
                        res.children.forEach((childRes: any) => {
                            arr.push(childRes)
                        })
                    }
                })
                dataList.value = arr
            } else {
                // 沒有指定key，則生成
                if (!props.keyValue) {
                    list.forEach(val => {
                        val.id = getUuid()
                    })
                }
                if (props.keyValue) {
                    list.forEach((val:any) => {
                        if(!val[props.keyValue || 'id']){
                            val[props.keyValue || 'id'] = getUuid()
                        }
                    })
                }
                dataList.value = list
            }
            listCache = JSON.parse(JSON.stringify(dataList.value))
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
            ctx.emit('select', value, index)
            // 关闭下拉，清除缓存
            const curInstPopover = internalInstance.refs.beSelectPopover as IInputSelectFunc
            curInstPopover.close()
        }
        /**
         * 更新數據方法
         * @param value
         */
        const updateValue = (value: any): void => {
            if (isString(value)) {
                ctx.emit('update:modelValue', value)
            } else {
                ctx.emit('update:modelValue', value[props.labelValue])
            }
        }
        /**************************************** 樣式相關處理 ************************************/
            // 只读
        const readonlyInput = ref<boolean>(true)
        if (props.search) {
            readonlyInput.value = false
        }
        // cursor 的样式
        let cursor = props.disabled ? 'not-allowed' : readonlyInput.value ? 'pointer' : ''
        // 输入建议下拉样式
        let selectStyle = reactive({width: '0px'})
        /**
         * 计算输入建议下拉框位置
         */
        const computedPositon = (): void => {
            const $eventDom: HTMLElement | null = document.getElementById(`be-select-body${uid}`)
            if (!$eventDom) return
            selectStyle.width = Number(window.getComputedStyle($eventDom).width.split('px')[0]) + 'px'
        }
        /**************************************** 各種事件方法 ************************************/
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
            ctx.emit('focus', event)
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
            ctx.emit('blur', event)
        }
        // 當前實例屬性attr
        const curAttrs = useAttrs()
        /**
         * 下拉列表展開關閉方法
         * @param {Boolean} showPopover - popover展開狀態
         */
        const selectOpenChange = (showPopover: boolean): void => {
            // 增加滾動監聽
            if (showPopover && curAttrs.onScroll) {
                nextTick(() => {
                    const dom = document.getElementById(`be_select_option_container_${uid}`)
                    dom?.addEventListener('scroll', handleScroll)
                })

            }
            /** 输入 openChange 事件
             * @event blur
             * @param {Boolean} showPopover - popover展開狀態
             */
            ctx.emit('openChange', showPopover)

        }
        // 圖標類型
        const iconType = ref<string>(computed(() => props.selectIcon).value)
        /**
         * 修改圖標方法。鼠標移入 變成清楚圖標
         * @param {String} type - 圖標類型
         */
        const changeIcon = (type: string | undefined): void => {
            if (props.clear && props.modelValue) {
                iconType.value = type || 'error'
                return
            }
        }
        /**
         * 處理鼠標移入
         * @param {Event} event - 事件对象
         */
        const handleMouseEnter = (event: Event): void => {
            changeIcon(undefined)
            /** MouseEnter 事件
             * @event MouseEnter
             * @param {Event} event - 事件对象
             */
            ctx.emit('MouseEnter', event)
        }
        /**
         * 處理鼠標移出
         * @param {Event} event - 事件对象
         */
        const handleMouseLeave = (event: Event): void => {
            changeIcon(props.selectIcon)
            /** MouseLeave 事件
             * @event MouseLeave
             * @param {Event} event - 事件对象
             */
            ctx.emit('MouseLeave', event)
        }
        /**
         * 清除方法
         */
        const handleClear = (): void => {
            updateValue('')
            /** 输入 clear 事件
             * @event clear
             */
            ctx.emit('clear')
            changeIcon(props.selectIcon)
            dataList.value = listCache
        }

        const handleScroll = (): void => {
            ctx.emit('scroll')
        }
        const addScrollEvt = (): void => {
            const dom = document.getElementById(`be_select_option_container_${uid}`)
            dom?.addEventListener('scroll', handleScroll)
        }

        /**************************************** 擴展渲染選項方法 ************************************/
        /**
         * 擴展渲染
         * 不支持分組
         */
        const renderExtendElm = (): VNode | void => {
            if (props.extend && !props.group) {
                return (
                    <div class={`
                        be-select-option__extend`}>
                        <be-input value={addItem.value} onInput={handleInput}>
                        </be-input>
                        <be-icon icon='add' onClick={addItemToList}></be-icon>
                    </div>
                )
            }
        }
        // 新增的下拉選項數據
        const addItem = ref<string>('')
        /**
         * 新增的下拉選項數據賦值方法
         * @param {String} value - 新增選項值
         */
        const handleInput = (value: string): void => {
            addItem.value = value
        }
        /**
         * 新增選綫組裝，並加入到列表中
         */
        const addItemToList = (): void => {
            if (addItem.value) {
                let item: IOption = {}
                let keyValue = props.keyValue || 'id'
                let labelValue = props.keyValue || 'label'
                item[keyValue] = getUuid()
                item[labelValue] = addItem.value
                dataList.value.push(item)
                addItem.value = ''
            }
        }
        /**************************************** 輸入匹配建議相關方法 ************************************/
        /**
         * 匹配输入建议
         * @param {string} value - 輸入值
         * @param {Array} ordData - 原始數據集
         */
        const matchSuggestions = (value: string, ordData: Array<any>): void => {
            const filter = (value: string, ordData: Array<any>, labelValue: string) => {
                let arr = value ? ordData.filter(
                    (val: any) => {
                        return (val[labelValue].toString().toLowerCase().indexOf(value.toLowerCase()) >= 0);
                    }
                ) : ordData
                return arr.length > 0 ? arr : ordData
            }
            // dataList.value
            // 匹配過濾
            let filterRes = props.searchFunc ? props.searchFunc(value, ordData, props.labelValue) : filter(value, ordData, props.labelValue)
            // 排序調用排序
            if (props.sortFunc) {
                filterRes.sort(props.sortFunc)
            }
            ctx.emit('search', filterRes)
            dataList.value = filterRes
        }
        // 远程时设置为不触发，由input事件内手动渲染
        const trigger = ref<string>('click')
        if (props.remote && isFunction(props.remoteFunc)) {
            trigger.value = 'none'
        }
        // loading顯示標識
        const loading = ref<boolean>(false)
        /**
         * 输入事件
         * @param {Event} event - 事件对象
         */
        const inputChange = (event: Event): void | Function => {
            // 更新值
            const $eventDom = (event.target as HTMLInputElement)
            updateValue($eventDom.value)
            const curInstPopover = internalInstance.refs.beSelectPopover as IInputSelectFunc
            // 开启远程搜索时
            if (props.remote && isFunction(props.remoteFunc) && props.remoteFunc) {
                const handleRemote = function () {
                    // 为空，关闭下拉 直接返回
                    if (!$eventDom.value) {
                        curInstPopover.close()
                        return;
                    }
                    // 手动触发下拉显示
                    curInstPopover.changeDisplay(true)
                    loading.value = true
                    // 执行回调拿数据
                    props.remoteFunc && props.remoteFunc((query: Array<any>) => {
                        loading.value = false
                        // 处理数据并进行筛选
                        handleList(query)
                        matchSuggestions($eventDom.value, listCache)

                    })
                }
                return debounce(handleRemote, 300).call(this)
            }
            // 匹配輸入建議
            matchSuggestions($eventDom.value, listCache)
        }
        onMounted(() => {
            handleList(props.list)

        })
        /**
         * 選項列表渲染
         */
        const renderOption = (): Array<VNode> => {
            const keyValue = props?.keyValue || 'id'
            let optionList: Array<VNode> = []
            dataList.value.forEach((val, index) => {
                // 選項列表
                optionList.push((
                    <div
                        class={`
                        ellipsis
                        ${val.type === 'group' && index !== 0 ? 'be-select-option__line' : ''}
                        ${val.type === 'group' ? 'be-select-option__group' : 'be-select-option'}
                        ${val.disabled ? 'be-select-option__disabled' : ''}`}
                        key={val[keyValue]}
                        onClick={() => {
                            if (val.disabled || val.type === 'group') return
                            handleSelect(val, index)
                        }}>
                        {/*有插槽就渲染插槽*/}
                        {internalInstance.slots.default ? internalInstance.slots.default(val, index) : val[props.labelValue]}
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
                        trigger={trigger.value}
                        placement="bottom"
                        ref="beSelectPopover"
                        trigger-elm={`be_select-${uid}`}
                        custom-class="be-select-popover">
                        {{
                            default: (
                                <div style={selectStyle} class='be-select-option-body'>
                                    <div class={`
                                    be-select-option-container 
                                    scrollDiy 
                                    ${loading.value ? 'be-select-loading ' : ''}`}
                                         id={`be_select_option_container_${uid}`}>
                                        {/*渲染loading 或者列表 */}
                                        {loading.value ?
                                            <be-icon icon='loading' spin width='25' height='25'
                                                     fill='#606266'>
                                            </be-icon> : renderOption()}
                                    </div>
                                    {/*动态扩展*/}
                                    {renderExtendElm()}
                                </div>
                            ),
                            trigger: (
                                <div class={`be-select-body ${props.customClass}`}
                                     id={`be-select-body${uid}`}
                                     style={{
                                         cursor: cursor
                                     }}
                                     tabindex={`0`}
                                     onMouseenter={($event) => handleMouseEnter($event)}
                                     onMouseleave={($event) => handleMouseLeave($event)}
                                     onFocus={($event) => handleFocus($event)}
                                     onBlur={($event) => handleBlur($event)}>
                                    <input readonly={readonlyInput.value}
                                           tabindex={`-1`}
                                           onFocus={computedPositon}
                                           value={props.modelValue}
                                           placeholder={props.placeholder}
                                           disabled={props.disabled}
                                           onInput={($event) => inputChange($event)}
                                           style={{
                                               cursor: cursor
                                           }}
                                           class={`be-select-input be-select-input__${props.size}`}
                                    />
                                    <be-icon icon={iconType.value}
                                             onClick={($event: Event) => {
                                                 if (iconType.value === 'error') {
                                                     handleClear()
                                                     $event.stopPropagation()
                                                 }
                                             }}
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