import { defineComponent, ref, VNode, watch, onMounted } from 'vue'
import '../../../style/be-select.scss'
import { IOption } from './be-select-type'
import BeInputSelect from '../../autocomplete/src/be-input-select.vue'
import BePopover from '../../popover/src/be-popover.vue'
import BeIcon from '../../svg-icon/src/be-icon.vue'
import BeTag from '../../tag/src/be-tag.vue'
import { IInputSelectFunc } from '../../autocomplete/src/be-autocomplete-type'
import {
  arrDupRemov,
  debounce,
  getUuid,
  isFunction,
  jsonClone,
  mapToArr,
} from '../../../utils/common'
import composition from './be-select-composition'

export default defineComponent({
  name: 'BeSelectMultiple',
  components: { BeInputSelect, BePopover, BeIcon, BeTag },
  props: {
    /**
     * 整体禁用
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * 大小
     * @values 'mini' | 'medium' | 'large'
     */
    size: {
      type: String,
      default: 'medium',
    },
    /**
     * 數據list
     */
    list: {
      type: Array,
      default: () => [],
    },
    /**
     * 绑定值 （完成）
     */
    modelValue: {
      type: Array,
      default: () => [],
    },
    /**
     * 下拉label
     */
    labelValue: {
      type: String,
      default: 'label',
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
      default: '请选择',
    },
    /**
     * 可清空
     */
    clear: {
      type: Boolean,
      default: false,
    },
    /**
     * 下拉图标
     */
    selectIcon: {
      type: String,
      default: 'under',
    },
    /**
     * 开启分组
     */
    group: {
      type: Boolean,
      default: false,
    },
    /**
     * 动态扩展
     */
    extend: {
      type: Boolean,
      default: false,
    },
    /**
     * 开启搜索匹配
     */
    search: {
      type: Boolean,
      default: false,
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
      default: false,
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
      default: '',
    },
    /**
     * 最大tag数
     */
    maxTag: {
      type: String,
    },
    /**
     * 最大选择数
     */
    max: {
      type: String,
    },
  },
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
    'closeTag',
    'Deselect',
    'change',
  ],
  setup(props, ctx) {
    const {
      focusClass,
      internalInstance,
      uid,
      dataList,
      list,
      readonlyInput,
      cursor,
      selectStyle,
      iconType,
      trigger,
      loading,
      addItemList,
      addItem,
      handleInput,
      addItemToList,
      computedPosition,
      updatePopover,
      addScrollEvt,
      handleMouseLeave,
      handleMouseEnter,
      selectOpenChange,
      handleBlur,
      handleFocus,
      changeIcon,
    } = composition(props, ctx)
    let { listCache } = composition(props, ctx)
    watch(list, (nVal, oVal) => {
      if (nVal !== oVal) {
        handleList(props.list)
      }
    })
    /**
     * 處理列表數據
     * @param {Array} propList - 数据列表
     */
    const handleList = (propList: Array<any>): void => {
      const list = jsonClone(propList)
      // 分组数据处理逻辑
      if (props.group) {
        const arr: Array<any> = []
        list.forEach((res: any) => {
          res.isSelect = false
          const group = { ...res }
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
          list.forEach((val: any) => {
            val.isSelect = false
            val.id = getUuid()
          })
        }
        if (props.keyValue) {
          list.forEach((val: any) => {
            val.isSelect = false
            if (!val[props.keyValue || 'id']) {
              val[props.keyValue || 'id'] = getUuid()
            }
          })
        }
        dataList.value = list
      }
      listCache = jsonClone(dataList.value)
    }
    /**************************************** 擴展渲染選項方法 ************************************/
    /**
     * 擴展渲染
     * 不支持分組
     */
    const renderExtendElm = (): VNode | void => {
      if (props.extend && !props.group) {
        return (
          <div
            class={`
                        be-select-option__extend`}>
            <be-input value={addItem.value} onInput={handleInput}></be-input>
            <be-icon icon="add" onClick={addItemToList}></be-icon>
          </div>
        )
      }
    }
    /**************************************** 輸入匹配建議相關方法 ************************************/
    /**
     * 匹配输入建议
     * @param {string} inputValue - 輸入值
     * @param {Array} ordData - 原始數據集
     */
    const matchSuggestions = (inputValue: string, ordData: Array<any>): void => {
      // 大于最大数量直接返回
      if (tagList.value.length >= Number(props.max) && props.max) {
        return
      }
      const value = jsonClone(inputValue)
      // 模糊匹配方法
      const filter = (value: string, ordData: Array<any>, labelValue: string) => {
        const arr = value
          ? ordData.filter((val: any) => {
              return val[labelValue].toString().toLowerCase().indexOf(value.toLowerCase()) >= 0
            })
          : ordData
        return {
          data: arr.length > 0 ? jsonClone(arr) : jsonClone(ordData),
          isHas: arr.length > 0,
        }
      }
      // 匹配數據
      const dataL = jsonClone(ordData)
      // 匹配結果
      let filterRes: Array<any> = []
      if (value) {
        // 字符串包含 ‘，’，进行分割
        const isHasComma = value.indexOf(',') >= 0
        if (isHasComma) inputMultiple.value = ''
        let inputVal = value.split(',').filter((res: any) => res)
        // 輸入去重
        inputVal = Array.from(new Set(inputVal))
        // 和 tagList 取并集
        const tagListLabel = tagList.value.map(res => res.label)
        inputVal = [...new Set([...tagListLabel, ...inputVal])]
        // 匹配到的
        let hasList: Array<any> = []
        // 沒匹配到的
        const addList: Array<any> = []
        // 挨个匹配
        inputVal.forEach((res: any) => {
          const filterResult = filter(res, dataL, label)
          const item: IOption = {}
          item[label] = res
          if (!filterResult.isHas) {
            item[keyId] = getUuid()
            // 有逗号 更新tagList
            if (isHasComma) {
              item.isAutoAdd = true
              selectMap.set(item[keyId], item)
              updateValue()
              addItemList.value.push(item)
            }
            item.isAutoAdd = true
            addList.push(item)
            dataL.push(item)
          } else {
            if (isHasComma) {
              let isHas = false
              dataList.value.forEach((dataRes: any) => {
                if (res === dataRes[label]) {
                  isHas = true
                  if (!selectMap.has(dataRes[keyId])) {
                    selectMap.set(dataRes[keyId], dataRes)
                  }
                }
              })
              // 匹配函数匹配到，但是列表中没有
              // 比如 列表有 ‘ab’。输入‘b’，这里增加
              if (!isHas) {
                item.isAutoAdd = true
                item[keyId] = getUuid()
                selectMap.set(item[keyId], item)
                addList.push(item)
                dataL.push(item)
              }
              updateValue()
            }
            // 对象去重 合并
            hasList = arrDupRemov([...filterResult.data, ...hasList], keyId)
          }
        })
        filterRes = hasList.concat(addList)
        // 排序調用排序
        if (props.sortFunc) {
          filterRes.sort(props.sortFunc as (a: any, b: any) => number)
        }
        /** search 事件
         * @event search
         * @param {Array} filterRes - 过滤结果
         */
        ctx.emit('search', filterRes)
        // 更新下拉列表 - 選中狀態匹配
        dataList.value = isHasComma ? dataL : filterRes
      } else {
        // 爲空則使用原始數據 - 選中狀態匹配
        dataList.value = jsonClone(ordData)
      }

      tagList.value.forEach((tag: any) => {
        setSelectState(true, tag[keyId])
      })
    }
    /**
     * 输入事件
     * @param {Event} event - 事件对象
     */
    const inputChange = (event: Event): void | Function => {
      // 更新值
      const $eventDom = event.target as HTMLInputElement
      inputMultiple.value = $eventDom.value
      // 输入时改变宽度
      txtWidth.value = textWidth($eventDom.value)
      updatePopover()
      /** 选中 change 事件
       * @event change
       * @param {Object} value - 点击对象数据
       */
      ctx.emit('change', $eventDom)
      const curInstPopover = internalInstance.refs.beSelectPopover as IInputSelectFunc
      // 开启远程搜索时
      if (props.remote && isFunction(props.remoteFunc) && props.remoteFunc) {
        const handleRemote = function () {
          // 为空，关闭下拉 直接返回
          if (!$eventDom.value) {
            curInstPopover.close()
            return
          }
          // 手动触发下拉显示
          curInstPopover.changeDisplay(true)
          loading.value = true
          // 执行回调拿数据
          props.remoteFunc &&
            props.remoteFunc((query: Array<any>) => {
              loading.value = false
              // 处理数据并进行筛选
              handleList(query)
              matchSuggestions($eventDom.value, listCache)
            })
        }
        return debounce(handleRemote, 300).call(this)
      }
      // 匹配輸入建議
      matchSuggestions($eventDom.value, listCache.concat(addItemList.value))
    }
    /**************************************** 多選相關方法 ************************************/
    // tag 列表
    const tagList = ref<Array<any>>([])
    // 多選時，維護的内部輸入
    const inputMultiple = ref<string>('')
    // 输入框宽度
    const txtWidth = ref<number>(0)
    // 列表显示label
    const label = props.labelValue || 'label'
    // 列表显示keyid
    const keyId = props.keyValue || 'id'
    let selectMap = new Map()
    /**
     * 下拉搜索选择事件方法
     * @param {Object } value - 选中后值
     * @param {Number} index - 点击索引
     */
    const handleSelect = (value: any, index: number): void => {
      // 大于最大数量直接返回
      if (tagList.value.length >= Number(props.max) && props.max) {
        return
      }
      const itemLabel = value[keyId]
      if (selectMap.has(itemLabel)) {
        if (value.isAutoAdd) {
          addItemList.value = addItemList.value.filter(val => val[keyId] !== value[keyId])
        }
        selectMap.delete(itemLabel)
        value.isSelect = false
        /** 取消选中 Deselect 事件
         * @event Deselect
         * @param {Object} value - 点击对象数据
         * @param {Number} index - 点击的对应列表索引
         */
        ctx.emit('Deselect', value, index)
      } else {
        if (value.isAutoAdd) {
          addItemList.value.push(value)
        }
        selectMap.set(itemLabel, value)
        value.isSelect = true
        /** 选中 select 事件
         * @event select
         * @param {Object} value - 点击对象数据
         * @param {Number} index - 点击的对应列表索引
         */
        ctx.emit('select', value, index)
      }
      /** 选中 change 事件
       * @event change
       * @param {Object} value - 点击对象数据
       */
      ctx.emit('change', value)
      inputMultiple.value = ''
      //if(value.isAutoAdd){
      dataList.value = listCache.concat(addItemList.value)
      // }
      updateValue()
      tagList.value.forEach((tag: any) => {
        setSelectState(tag.isSelect, tag[keyId])
      })
      updatePopover()
    }
    /**
     * 更新數據方法
     */
    const updateValue = (): void => {
      const res = jsonClone(mapToArr(selectMap))
      tagList.value = res
      ctx.emit('update:modelValue', res)
    }
    /**
     * 清除方法
     */
    const handleClear = (): void => {
      selectMap = new Map()
      tagList.value = []
      // 多選時，維護的内部輸入
      inputMultiple.value = ''
      // 输入框宽度
      txtWidth.value = 0
      /** 输入 clear 事件
       * @event clear
       */
      ctx.emit('clear')
      updateValue()
      changeIcon(props.selectIcon)
      dataList.value = listCache
    }
    /**
     * 初始化taglist
     */
    const initTagList = () => {
      tagList.value = props.modelValue as Array<any>
      tagList.value.forEach((tag: any) => {
        tag.isSelect = true
        // 更新 selectMap
        selectMap.set(tag[keyId], tag)
        // 更新 dataList選中状态
        setSelectState(true, tag[keyId])
      })
    }
    /**
     * 遍历dataList 设置选中状态
     * @param {boolean} state - 状态值
     * @param {Object} match - 匹配对象
     */
    const setSelectState = (state: boolean, match: any): void => {
      dataList.value.forEach((select: any) => {
        if (select[keyId] === match) {
          select.isSelect = state
        }
      })
    }
    /**
     * 根据输入文字计算宽度
     * @param text
     */
    const textWidth = (text: string) => {
      const sensor = document.createElement('a')
      sensor.innerHTML = text
      const body = document.getElementsByTagName('body')[0]
      body.appendChild(sensor)
      const width = sensor.offsetWidth
      body.removeChild(sensor)
      return width
    }
    /**
     * 清除tag
     * @param {Object } closeVal - 选中后值
     * @public
     */
    const closeTag = (closeVal: any): void => {
      const value = closeVal.isNum ? tagList.value.pop() : closeVal
      selectMap.delete(value[keyId])
      setSelectState(false, value[keyId])
      if (value.isAutoAdd) {
        addItemList.value = addItemList.value.filter(val => val[keyId] !== value[keyId])
        dataList.value = listCache.concat(addItemList.value)
      }
      updateValue()
      updatePopover()
      /** closeTag 事件
       * @event closeTag
       * @param {Object} value - 关闭的tag数据对象
       */
      ctx.emit('closeTag', value)
    }
    onMounted(() => {
      handleList(props.list)
      addScrollEvt()
      initTagList()
    })
    /**
     * 渲染tag
     */
    const renderTags = (): Array<VNode> | void => {
      if (!tagList.value || tagList.value?.length === 0) {
        return
      }
      let renderTag = jsonClone(tagList.value)
      // maxTag 实现
      if (props.maxTag && tagList.value.length > Number(props.maxTag)) {
        renderTag = renderTag.slice(0, Number(props.maxTag))
        const numTag: IOption = {}
        numTag[keyId] = getUuid()
        numTag[label] = `+${tagList.value.length - Number(props.maxTag)}`
        numTag.isNum = true
        renderTag.push(numTag)
      }
      const list: Array<VNode> = []
      renderTag.forEach((val, index) => {
        // 選項列表
        list.push(
          <div class="be-select-tag">
            {/*tag 自定义插槽*/}
            {internalInstance.slots.tag ? (
              internalInstance.slots.tag({ data: val, index })
            ) : (
              <be-tag
                key={val.label + 'tag'}
                isClose={true}
                type="info"
                size="mini"
                customClass="ellipsis"
                onClose={() => closeTag(val)}>
                {val[label]}
              </be-tag>
            )}
          </div>
        )
      })
      return list
    }

    /**
     * 選項列表渲染
     */
    const renderOption = (): Array<VNode> => {
      const keyValue = props?.keyValue || 'id'
      const optionList: Array<VNode> = []
      dataList.value.forEach((val, index) => {
        // 選項列表
        optionList.push(
          <div
            class={`
                        ellipsis
                        ${val.type === 'group' && index !== 0 ? 'be-select-option__line' : ''}
                         ${val.isSelect ? 'be-select-option__choice' : ''}
                        ${val.type === 'group' ? 'be-select-option__group' : 'be-select-option'}
                        ${val.disabled ? 'be-select-option__disabled' : ''}`}
            key={val[keyValue]}
            onClick={() => {
              if (val.disabled || val.type === 'group') return
              handleSelect(val, index)
            }}>
            {/*有插槽就渲染插槽*/}
            {internalInstance.slots.default
              ? internalInstance.slots.default({
                  data: val,
                  index,
                })
              : val[props.labelValue]}
            {val.isSelect ? <be-icon icon="select" custom-class={`be-select-hook`}></be-icon> : ''}
          </div>
        )
      })
      return optionList
    }
    return () => {
      return (
        <div id={`be_select-${uid}`} class="be-select">
          <be-popover
            onUpdate={selectOpenChange}
            trigger={trigger.value}
            placement="bottom"
            ref="beSelectPopover"
            trigger-elm={`be_select-${uid}`}
            custom-class="be-select-popover">
            {{
              default: (
                <div style={selectStyle} class="be-select-option-body">
                  <div
                    class={`
                                    be-select-option-container 
                                    scroll-diy 
                                    ${loading.value ? 'be-select-loading ' : ''}`}
                    id={`be_select_option_container_${uid}`}>
                    {/*渲染loading 或者列表 */}
                    {loading.value ? (
                      <be-icon icon="loading" spin width="25" height="25" fill="#606266"></be-icon>
                    ) : (
                      renderOption()
                    )}
                  </div>
                  {/*动态扩展*/}
                  {renderExtendElm()}
                </div>
              ),
              trigger: (
                <div
                  class={`be-select-body ${focusClass.value} ${props.customClass}`}
                  id={`be-select-body${uid}`}
                  style={{
                    cursor: cursor,
                  }}
                  tabindex={`0`}
                  onMouseenter={$event => handleMouseEnter($event)}
                  onMouseleave={$event => handleMouseLeave($event)}
                  onFocus={$event => handleFocus($event)}
                  onBlur={$event => handleBlur($event)}>
                  {renderTags()}
                  <input
                    readonly={readonlyInput.value}
                    tabindex={`-1`}
                    onFocus={computedPosition}
                    value={inputMultiple.value}
                    disabled={props.disabled}
                    onInput={$event => inputChange($event)}
                    style={{
                      cursor: cursor,
                      width: txtWidth.value + 'px',
                    }}
                    class={`be-select-input be-select-input__${props.size}`}
                  />
                  <be-icon
                    icon={iconType.value}
                    onClick={($event: Event) => {
                      if (iconType.value === 'error') {
                        handleClear()
                        $event.stopPropagation()
                      }
                    }}
                    class={`be-select-icon`}></be-icon>
                </div>
              ),
            }}
          </be-popover>
        </div>
      )
    }
  },
})
