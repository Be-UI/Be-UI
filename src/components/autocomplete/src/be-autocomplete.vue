/* * @be-autocomplete.vue * @deprecated * @author czh * @update (czh 2021/10/13) */
<template>
  <be-popover
    ref="beInputPopover"
    :trigger="focusTrigger ? 'click' : 'none'"
    placement="bottom"
    :trigger-elm="`be_input_select_inner_${uid}`"
    custom-class="be-input-select-popover">
    <template #trigger>
      <be-input
        :id="`be_input_select_inner_${uid}`"
        v-bind="attrs"
        ref="beInputInner"
        v-model="valInner"
        @change="handleChange"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @clear="handleClear"
        @prev-icon-click="handleIconClickPrev"
        @next-icon-click="handleIconClickNext">
        <template #prev>
          <slot name="prev"></slot>
        </template>
        <template #next>
          <slot name="next"></slot>
        </template>
      </be-input>
    </template>
    <transition name="dialog-fade">
      <be-input-select
        :loading="loading"
        :key-value="keyValue"
        :label-value="labelValue"
        :select-style="selectStyle"
        :select-list="selectList"
        @select="handleSelect">
        <template #cus-temp="slotProps">
          <slot name="cus-temp" :item="slotProps.item"></slot>
        </template>
      </be-input-select>
    </transition>
  </be-popover>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    nextTick,
    onMounted,
    reactive,
    ref,
    useAttrs,
    watch,
  } from 'vue'
  import BePopover from '../../popover/src/be-popover.vue'
  import BeInput from '../../input/src/be-input.vue'
  import BeInputSelect from '../src/be-input-select.vue'
  import { IInputSelectInst, IInputSelectFunc } from './be-autocomplete-type'
  import { isString, jsonClone } from '../../../utils/common'
  import { isObject } from '@vue/shared'
  export default defineComponent({
    name: 'BeAutocomplete',
    components: { BeInputSelect, BeInput, BePopover },
    props: {
      /**
       * 绑定值 （完成）
       */
      modelValue: {
        type: [String, Number, Object],
        default: '',
      },
      /**
       * 是否focus触发
       */
      focusTrigger: {
        type: Boolean,
        default: true,
      },
      /**
       * 輸入建議列表
       */
      suggestionList: {
        type: Array,
        default: (): Array<any> => [],
      },
      /**
       * label
       */
      labelValue: {
        type: String,
        default: 'label',
      },
      /**
       * label
       */
      keyValue: {
        type: String,
        default: 'id',
      },
      /**
       * 远程加载下拉列表数据
       */
      fetchSuggestions: {
        type: Function,
      },
    },
    emits: [
      'update:modelValue',
      'input',
      'change',
      'focus',
      'blur',
      'clear',
      'prevIconClick',
      'nextIconClick',
      'select',
    ],
    setup(props, ctx) {
      const attrs = useAttrs()
      const internalInstance = getCurrentInstance() as IInputSelectInst
      const valInner = ref<string>('')
      /**************************************** 事件处理方法 *******************************************/
      /**
       * change 事件处理方法
       */
      const handleChange = (): void => {
        ctx.emit('change', valInner.value)
      }
      /**
       * input 事件处理方法，实现双向绑定
       */
      const handleInput = (): void => {
        let suggestionList = props.suggestionList.length > 0 ? props.suggestionList : listDataCache
        // 點擊觸發時
        if (props.focusTrigger) {
          matchSuggestions(valInner.value, suggestionList)
        } else {
          // 輸入觸發，傳遞了方法就遠程獲取
          if (props.fetchSuggestions) {
            getSuggestions((list: Array<any>): void => {
              matchSuggestions(valInner.value, list)
              showPopover()
            })
          } else {
            // 否則直接匹配
            matchSuggestions(valInner.value, suggestionList)
            showPopover()
          }
        }
        ctx.emit('update:modelValue', valInner.value)
        ctx.emit('input', valInner.value)
      }
      /**
       * blur 事件处理方法
       */
      const handleBlur = (): void => {
        /** 输入 blur 事件
         * @event blur
         * @param {String | Number} value - 输入框值
         */
        ctx.emit('blur', valInner.value)
      }
      // 事件目标元素
      let eventDom: HTMLElement | null = null
      /**
       * focus 事件处理方法
       * @param {String | Number} value - 更新后值
       * @param {Event} event - 事件对象
       */
      const handleFocus = (value: string | number, event: Event): void => {
        // 获取事件目标元素，计算宽度，用于下拉样式设置
        const $eventDom: HTMLElement | null = (event.target as HTMLInputElement).parentElement
        eventDom = $eventDom
        computedPosition($eventDom)
        ctx.emit('focus', valInner.value)
        // 焦點獲取數據
        if (props.fetchSuggestions && props.focusTrigger) {
          getSuggestions()
        }
      }
      /**
       * 输入框内容清除方法
       * @public
       */
      const handleClear = (): void => {
        ctx.emit('clear')
      }
      /**
       * 输入框后icon点击方法
       */
      const handleIconClickPrev = (): void => {
        ctx.emit('prevIconClick')
      }
      /**
       * 输入框后icon点击方法
       */
      const handleIconClickNext = (): void => {
        ctx.emit('nextIconClick')
      }
      /**************************************** 输入建议下拉框方法 *******************************************/
      // 输入建议下拉样式
      let selectStyle = reactive({ width: '0px' })
      // 輸入建議數據 数组要用ref
      let selectList = ref<Array<any>>(props.suggestionList)
      /**
       * 计算输入建议下拉框位置
       * @param {Element} $eventDom - 输入建议下拉框dom
       */
      const computedPosition = ($eventDom: HTMLElement | null): void => {
        if (!$eventDom) return
        selectStyle.width = Number(window.getComputedStyle($eventDom).width.split('px')[0]) + 'px'
      }
      /**
       * 匹配输入建议
       * @param {string} value - 輸入值
       * @param {Array} ordData - 原始數據集
       */
      const matchSuggestions = (value: string, ordData: Array<any>): void => {
        nextTick(() => {
          selectList.value = value
            ? ordData.filter((val: any) => {
                return (
                  val[props.labelValue].toString().toLowerCase().indexOf(value.toLowerCase()) >= 0
                )
              })
            : ordData
        })
      }
      /**
       * 顯示輸入建議下拉
       */
      const showPopover = (): void => {
        const curInstPopover = internalInstance.refs.beInputPopover as IInputSelectFunc
        curInstPopover.changeDisplay(true)
      }
      // 输入建议數據緩存
      let listDataCache: Array<any> = []
      // 输入建议下拉显示控制
      const loading = ref<boolean>(false)
      /**
       * 获取输入建议
       */
      const getSuggestions = (cb: Function = () => {}): void => {
        nextTick(() => {
          // 沒有缓存就請求數據
          if (props.fetchSuggestions) {
            loading.value = true
            props.fetchSuggestions((listData: Array<any>) => {
              // 设置输入建议数据
              selectList.value = jsonClone(listData)
              listDataCache = jsonClone(listData)
              if (cb) cb(listDataCache)
              loading.value = false
            })
          }
        })
      }
      /**
       * 下拉搜索选择事件方法
       * @param {Object } value - 选中后值
       * @param {Number} index - 点击索引
       */
      const handleSelect = (value: any, index: number): void => {
        /** 输入建议选中 select 事件
         * @event select
         * @param {Object} value - 点击对象数据
         * @param {Number} index - 点击的对应列表索引
         */
        valInner.value = value[props.labelValue]
        ctx.emit('update:modelValue', value)
        handleChange()
        ctx.emit('select', value, index)
        // 关闭下拉，清除缓存
        const curInstPopover = internalInstance.refs.beInputPopover as IInputSelectFunc
        curInstPopover.close()
        listDataCache = []
      }
      const modelValComp = computed(() => {
        return props.modelValue
      })
      watch(modelValComp, nVal => {
        if (isString(nVal)) {
          valInner.value = nVal
        }
        if (isObject(nVal)) {
          valInner.value = Object(nVal[props.labelValue])
        }
      })
      const initInnerVal = (nVal: any): void => {
        if (isString(nVal)) {
          valInner.value = nVal
        }
        if (isObject(nVal)) {
          valInner.value = Object(nVal[props.labelValue])
        }
      }
      onMounted(() => {
        initInnerVal(props.modelValue)
        const $eventDom: HTMLElement | null = eventDom
        // 设置显示位置,宽度
        computedPosition($eventDom)
      })
      return {
        loading,
        selectList,
        handleSelect,
        selectStyle,
        uid: internalInstance.uid,
        attrs,
        valInner,
        handleChange,
        handleInput,
        handleBlur,
        handleFocus,
        handleIconClickPrev,
        handleIconClickNext,
        handleClear,
      }
    },
  })
</script>
