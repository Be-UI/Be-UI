<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import { accAdd, accSub, checkNumber } from '@be-ui/utils'
import { BeInput } from '@be-ui/components/input'
import { BeIcon } from '@be-ui/components/icon'
import type { IInputInst } from '../../input/src/be-input-type'
import type { IInputNumInstance, IInputNumLimit } from './be-input-number-type'
export default defineComponent({
  name: 'BeInputNumber',
  components: { BeInput, BeIcon },
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
     * @values 'small' | 'medium' | 'large'
     */
    size: {
      type: String,
      default: 'medium',
    },
    /**
     * 是否禁用（完成）
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否开启键盘快捷行为
     */
    keyboard: {
      type: Boolean,
      default: false,
    },
    /**
     * 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用
     */
    parser: {
      type: Function,
      default: (val: string | number) => val,
    },
    /**
     * 指定输入框展示值的格式
     */
    formatter: {
      type: Function,
      default: (val: string | number) => val,
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
    step: {
      type: Number,
      default: 1,
    },
  },
  emits: ['update:modelValue', 'change', 'blur', 'focus', 'select', 'step', 'pressEnter'],
  setup(props, ctx) {
    // 當前實例
    const internalInstance = getCurrentInstance() as IInputNumInstance
    const uid = internalInstance?.uid

    const tabindex = ref<number>(1)
    /**
     * focus 事件处理方法
     * @param {Event} event - 事件对象
     */
    const handleFocus = (event?: Event): void => {
      ctx.emit('focus', event)
      tabindex.value = -1
    }
    /**
     * Blur 事件处理方法
     * @param {string} val - 事件对象
     */
    const handleBlur = (val?: string | Event): void => {
      ctx.emit('blur', val)
      tabindex.value = 1
    }
    // 内部维护输入框
    const inputInnerVal = ref<string>('')
    /**
     * 输入响应
     * @param {String} value - 输入值
     */
    const handleInput = (value: string): void => {
      let parserRes: string = props.parser ? props.parser(value) : value
      let pointCheck = false
      const splitRes: Array<string> = parserRes.split('.')
      splitRes.forEach((val: string) => {
        if (!val)
          pointCheck = true
      })
      if (!pointCheck && !checkNumber(parserRes))
        parserRes = ''

      inputInnerVal.value = ''
      nextTick(() => {
        if (pointCheck) {
          inputInnerVal.value = props.formatter(parserRes)
        }
        else {
          const val = !parserRes ? '' : (limitValue(parserRes) as IInputNumLimit).val
          inputInnerVal.value = props.formatter(val)
          updateInput(val)
        }
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
    function limitValue(value) {
      const val = Number(value)
      const max = props.max !== '' ? Number(props.max) : null
      const min = props.min !== '' ? Number(props.min) : null
      // max，min 为真，且在区间内 或者 max，min为假
      if (
        (max && min && min <= val && val <= max && max && min)
        || (!max && !min)
        || (min && val >= min && !max)
        || (max && val <= max && !min)
      )
        return { val, type: '' }

      if (min && val < min)
        return { val: min, type: 'limit' }

      if (max && val > max)
        return { val: max, type: 'limit' }
    }
    /**
     * change 事件处理方法
     * @param { String } value - 更新后值
     */
    const handleChange = (value: string | number): void => {
      const val = props.parser(value)
      if (!val)
        inputInnerVal.value = props.formatter(val)

      ctx.emit('change', val)
    }
    /** ************************************** 键盘响应以及增加方法 *******************************************/
    /**
     * 点击减少方法
     */
    const handleReduce = (): void => {
      if (props.disabled)
        return
      const res = accSub([Number(props.modelValue), Number(props.step)])
      updateInput((limitValue(res) as IInputNumLimit).val)
      ctx.emit('step', { value: res, type: 'reduce' })
    }
    /**
     * 点击增加方法
     */
    const handleIncrease = (): void => {
      if (props.disabled)
        return
      const res = accAdd(Number(props.modelValue), Number(props.step))
      updateInput((limitValue(res) as IInputNumLimit).val)
      ctx.emit('step', { value: res, type: 'increase' })
    }
    /**
     * 处理键盘响应事件
     */
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (!props.keyboard)
        return
      if (event.key === 'ArrowUp')
        handleIncrease()

      if (event.key === 'ArrowDown')
        handleReduce()

      if (event.key === 'Enter')
        ctx.emit('pressEnter', props.modelValue)
    }
    /** ************************************** 暴露对外的公共方法 *******************************************/
    const beInputInner = ref<any>(null)
    nextTick(() => {
      beInputInner.value
        = internalInstance?.refs[`beInputInner${uid}`]
        && reactive(internalInstance?.refs[`beInputInner${uid}`] as IInputInst)
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
        ctx.emit('focus')
      })
    }
    /**
     * 手动失焦方法
     * @public
     */
    const blur = (): void => {
      inputInnerInst.value.blur()
      ctx.emit('blur')
    }
    /**
     * 手动选择文字方法
     * @public
     */
    const select = (): void => {
      inputInnerInst.value.select()
      ctx.emit('select')
    }
    /** ************************************** 初始化方法 *******************************************/
    /**
     * 初始化方法
     */
    const init = (): void => {
      if (
        (props.modelValue && checkNumber(props.modelValue.toString()))
        || props.modelValue === 0
      ) {
        inputInnerVal.value = props.formatter(props.modelValue)
      }
      else {
        // console.error('You should pass in numeric or pure numeric string variables, such as 1 or \'12\'')
      }
    }
    const modelVal = computed(() => props.modelValue)
    watch(modelVal, (nVal: string | number) => {
      if (nVal)
        inputInnerVal.value = props.formatter(nVal)
    })
    const showLimit = computed(() => {
      return (limitValue(props.modelValue) as IInputNumLimit).type
    })
    onMounted(() => {
      init()
    })

    return {
      uid,
      inputInnerVal,
      showLimit,
      tabindex,
      blur,
      select,
      focus,
      handleFocus,
      handleBlur,
      handleChange,
      handleInput,
      handleIncrease,
      handleReduce,
      handleKeyDown,
    }
  },
})
</script>

<template>
  <div
    :id="`be_input_number${uid}`"
    :class="`be-input-number ${disabled ? 'be-input-number__disabled ' : ''}`"
    tab-index="0"
    @focus="$event => handleFocus($event)"
    @blur="$event => handleBlur($event)"
    @keydown="$event => handleKeyDown($event)"
  >
    <div class="be-input-number__pre">
      <slot name="pre" />
    </div>
    <div :class="`be-input-number__${size} be-input-number__default`">
      <BeInput
        :ref="`beInputInner${uid}`"
        :tab-index="tabindex"
        :size="size"
        :is-inner="true"
        :on-change="handleChange"
        :disabled="disabled"
        :on-focus="(val: string, $event: InputEvent) => handleFocus($event)"
        :on-blur="(val: string) => handleBlur(val)"
        :custom-class="`be-input-number__inner be-input-number__${showLimit}`"
        :value="inputInnerVal"
        :on-input="handleInput"
      />
      <div
        :class="`
            be-input-number__op
            ${disabled ? 'be-input-number__op__disabled ' : ''}`"
        tab-index="1"
        @blur="handleBlur"
        @focus="handleFocus"
      >
        <BeIcon
          icon="up"
          class="be-input-number__up"
          tab-index="2"
          @click="handleIncrease"
        />
        <BeIcon
          icon="under"
          class="be-input-number__down"
          tab-index="2"
          @click="handleReduce"
        />
      </div>
    </div>
    <div class="be-input-number__next">
      <slot name="next" />
    </div>
  </div>
</template>
