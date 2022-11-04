import type { VNode } from 'vue'
import { defineComponent, onMounted, watch } from 'vue'
import BeInputSelect from '@be-ui/components/autocomplete'

import { BeIcon } from '@be-ui/components/icon'
import { BePopover } from '@be-ui/components/popover'
import { debounce, getUuid, isFunction, isString, jsonClone } from '@be-ui/utils'
import type { IInputSelectFunc } from '../../autocomplete/src/be-autocomplete-type'
import composition from './be-select-composition'

export default defineComponent({
  name: 'BeSelect',
  components: { BeInputSelect, BePopover, BeIcon },
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
     * @values 'small' | 'medium' | 'large'
     */
    size: {
      type: String,
      default: 'medium',
    },
    /**
     * 數據list //不写
     */
    list: {
      type: Array,
      default: () => [],
    },
    /**
     * 绑定值 （完成）
     */
    modelValue: {
      type: String,
    },
    /**
     * 下拉label //不写
     */
    labelValue: {
      type: String,
      default: 'label',
    },
    /**
     * 下拉key //不写
     */
    keyValue: {
      type: String,
    },
    /**
     * placeholder //不写
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
  ],
  setup(props, ctx) {
    const {
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
      addItem,
      handleInput,
      addItemToList,
      computedPosition,
      addScrollEvt,
      handleMouseLeave,
      handleMouseEnter,
      selectOpenChange,
      handleBlur,
      handleFocus,
      focusClass,
      changeIcon,
    } = composition(props, ctx)

    let { listCache } = composition(props, ctx)
    watch(list, (nVal, oVal) => {
      if (nVal !== oVal)
        handleList(props.list)
    })

    /**
     * 處理列表數據
     * @param {Array} list - 数据列表
     */
    const handleList = (list: Array<any>): void => {
      // 分组数据处理逻辑
      if (props.group) {
        const arr: Array<any> = []
        list.forEach((res: { children?: Array<any>; isSelect: boolean }) => {
          res.isSelect = false
          const group = { ...res }
          delete group.children
          arr.push(group)

          if (res.children && res.children?.length > 0) {
            res.children.forEach((childRes: any) => {
              arr.push(childRes)
            })
          }
        })
        dataList.value = arr
      }
      else {
        // 沒有指定key，則生成
        if (!props.keyValue) {
          list.forEach((val) => {
            val.isSelect = false
            val.id = getUuid()
          })
        }
        if (props.keyValue) {
          list.forEach((val: any) => {
            val.isSelect = false
            if (!val[props.keyValue || 'id'])
              val[props.keyValue || 'id'] = getUuid()
          })
        }
        dataList.value = list
      }
      listCache = jsonClone(dataList.value)
    }
    /**
     * 下拉搜索选择事件方法
     * @param {Object } value - 选中后值
     * @param {Number} index - 点击索引
     */
    const handleSelect = (value: any, index: number): void => {
      resetSelect()
      updateValue(value)
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
      if (isString(value))
        ctx.emit('update:modelValue', value)
      else
        ctx.emit('update:modelValue', value[props.labelValue])
    }
    /** ************************************** 各種事件方法 ************************************/
    /**
     * 重置选中状态
     */
    const resetSelect = (): void => {
      dataList.value.map(val => (val.isSelect = false))
    }
    /**
     * 清除方法
     */
    const handleClear = (): void => {
      updateValue('')
      ctx.emit('clear')
      changeIcon(props.selectIcon)
      dataList.value = listCache
      resetSelect()
    }
    /** ************************************** 擴展渲染選項方法 ************************************/
    /**
     * 擴展渲染
     * 不支持分組
     */
    const renderExtendElm = (): VNode | void => {
      if (props.extend && !props.group) {
        return (
          <div
            class={' be-select--option__extend'}>
            <be-input value={addItem.value} onInput={handleInput}></be-input>
            <be-icon icon="add" onClick={addItemToList}></be-icon>
          </div>
        )
      }
    }
    /** ************************************** 輸入匹配建議相關方法 ************************************/
    /**
     * 匹配输入建议
     * @param {string} value - 輸入值
     * @param {Array} ordData - 原始數據集
     */
    const matchSuggestions = (value: string, ordData: Array<any>): void => {
      const filter = (value: string, ordData: Array<any>, labelValue: string) => {
        const arr = value
          ? ordData.filter((val: any) => {
            return val[labelValue].toString().toLowerCase().includes(value.toLowerCase())
          })
          : ordData
        return arr.length > 0 ? arr : ordData
      }
      // dataList.value
      // 匹配過濾
      const filterRes = props.searchFunc
        ? props.searchFunc(value, ordData, props.labelValue)
        : filter(value, ordData, props.labelValue)
      // 排序調用排序
      if (props.sortFunc)
        filterRes.sort(props.sortFunc)

      ctx.emit('search', filterRes)
      dataList.value = filterRes
    }
    /**
     * 输入事件
     * @param {Event} event - 事件对象
     */
    const inputChange = (event: Event): void | Function => {
      // 更新值
      const $eventDom = event.target as HTMLInputElement
      updateValue($eventDom.value)
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
          props.remoteFunc
            && props.remoteFunc((query: Array<any>) => {
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
      addScrollEvt()
    })
    const renderOption = (): Array<JSX.Element> => {
      const keyValue = props?.keyValue || 'id'
      const optionList: Array<JSX.Element> = []

      const handleClick = (val, index) => {
        if (val.disabled || val.type === 'group')
          return
        handleSelect(val, index)
      }
      dataList.value.forEach((val, index) => {
        if (props.modelValue === val[props.labelValue])
          val.isSelect = true

        // 選項列表
        optionList.push(
            <div
              class={` ellipsis
                     ${val.type === 'group' && index !== 0 ? 'be-select--option__line' : ''}
                     ${val.isSelect ? 'be-select--option__choice' : ''}
                     ${val.type === 'group' ? 'be-select--option__group' : 'be-select--option'}
                     ${val.disabled ? 'be-select--option__disabled' : ''}`}
              key={val[keyValue]}
              onClick={() => handleClick(val, index)}>
              {/* 有插槽就渲染插槽 */}
              {internalInstance.slots.default
                ? internalInstance.slots.default(val, index)
                : val[props.labelValue]}
            </div>,
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
            custom-class="be-select--popover">
            {{
              default: (
                <div style={selectStyle} class="be-select--option--body">
                  <div class={`
                            be-select--option--container 
                            scroll-diy 
                            ${loading.value ? 'be-select--loading ' : ''}`}
                    id={`be_select_option_container_${uid}`}>
                    {/* 渲染loading 或者列表*/}
                    {loading.value
                      ? (
                      <be-icon icon="loading" spin width="25" height="25" fill="#606266"></be-icon>
                        )
                      : (
                        renderOption()
                        )}
                  </div>
                  {/* 动态扩展 */}
                  {renderExtendElm()}
                </div>
              ),
              trigger: (
                <div
                  class={`be-select--body ${focusClass.value} ${props.customClass} ${
                    props.disabled ? 'be-select--input__disabled' : ''
                  }`}
                  id={`be-select--body${uid}`}
                  style={{
                    cursor,
                  }}
                  tab-index={'0'}
                  onMouseenter={$event => handleMouseEnter($event)}
                  onMouseleave={$event => handleMouseLeave($event)}
                  onFocus={$event => handleFocus($event)}
                  onBlur={$event => handleBlur($event)}>
                  <input
                    readonly={readonlyInput.value}
                    tab-index={'-1'}
                    onFocus={computedPosition}
                    value={props.modelValue}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    onInput={$event => inputChange($event)}
                    style={{
                      cursor,
                    }}
                    class={`be-select--input be-select--input__${props.size}`}
                  />
                  <be-icon
                    icon={iconType.value}
                    onClick={($event: Event) => {
                      if (iconType.value === 'error') {
                        handleClear()
                        $event.stopPropagation()
                      }
                    }}
                    class={'be-select--icon'}></be-icon>
                </div>
              ),
            }}
          </be-popover>
        </div>
      )
    }
  },
})
