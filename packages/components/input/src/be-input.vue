<script lang="ts">
/**
   * 带输入建议远程搜索的输入框
   */
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
import { BeIcon } from '@be-ui/components/icon'
import { isObject } from '@be-ui/utils'
import compTextareaHeight from '../src/computeAreaHeight'
import type { PropType } from 'vue'
import type { AutosizeProp, IInputInst } from './be-input-type'

export default defineComponent({
  name: 'BeInput',
  components: { BeIcon },
  // 原生属性 readonly autocomplete name max min step autofocus form
  props: {
    /**
       * id
       */
    id: String,
    /**
       * 绑定值 （完成）
       */
    modelValue: {
      type: [String, Number],
      default: '',
    },
    /**
       * 自定义样式 （完成）
       */
    customClass: {
      type: String,
      default: '',
    },
    /**
       * 最大长度限制 （完成）
       */
    maxlength: {
      type: Number,
      default: null,
    },
    /**
       * 输入框占位文本（完成）
       */
    placeholder: String,
    /**
       * 是否禁用（完成）
       */
    disabled: Boolean,
    /**
       * 是否可以清除（完成）
       */
    clearable: {
      type: Boolean,
      default: false,
    },
    /**
       * 输入框类型（完成）
       */
    type: {
      type: String,
      default: 'text',
    },
    /**
       * 是否显示密码按鈕（完成）
       */
    showPassword: {
      type: Boolean,
      default: false,
    },
    /**
       * 输入框尺寸，只在 type!="textarea" 时有效 'mini' | 'medium' | 'large'（完成）
       */
    size: {
      type: String,
      default: 'medium',
    },
    /**
       * 前置icon类型（完成）
       */
    prevIcon: {
      type: String,
      default: '',
    },
    /**
       * 后置icon图标类型（完成）
       */
    nextIcon: {
      type: String,
      default: '',
    },
    /**
       * 输入框关联的label文字
       */
    label: {
      type: String,
    },
    /**
       * 输入框的tabindex // 不写
       */
    tabindex: {
      type: [Number, String],
    },
    /**
       * input元素或textarea元素的style ok
       */
    inputStyle: {
      type: Object,
    },
    /**
       * 输入框行数，只对 type="textarea" 有效
       */
    rows: {
      type: Number,
      default: 3,
    },
    /**
       * 文本域自动调整 // 不写
       */
    autosize: {
      type: [Boolean, Object] as PropType<AutosizeProp>,
      default: false as AutosizeProp,
    },
    /**
       * 内部引用标识
       * private
       */
    isInner: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'prevIconClick',
    'nextIconClick',
    'update:modelValue',
    'input',
    'change',
    'clear',
    'focus',
    'blur',
    'keydown',
    'mouseleave',
    'mouseenter',
  ],
  setup(props, ctx) {
    const attrs = useAttrs()
    const internalInstance = getCurrentInstance() as IInputInst
    const inputType = ref<string>(props.type)
    const isPassWord = ref<boolean>(props.type === 'password')
    /**
       * 密码显示按钮方法
       */
    const handlePassword = (): void => {
      isPassWord.value = !isPassWord.value
      if (!isPassWord.value)
        inputType.value = 'text'
      else
        inputType.value = props.type
    }

    /**
       * change 事件处理方法
       * @param { InputEvent } event - 更新后值
       */
    const handleChange = (event: Event): void => {
      const target = event.target as HTMLInputElement
      ctx.emit('change', target.value)
    }
    /**
       * input 事件处理方法，实现双向绑定
       * @param {String | Number} val - 更新后值
       */
    const handleInput = (val: string | number): void => {
      ctx.emit('update:modelValue', val)
      ctx.emit('input', val)
    }
    const isFocusClass = ref<string>('')
    /**
       * blur 事件处理方法
       * @param {String | Number} value - 更新后值
       * @param {Event} event - 事件对象
       */
    const handleBlur = (value: string | number, event: Event): void => {
      isFocusClass.value = ''
      /** 输入 blur 事件
         * @event blur
         * @param {String | Number} value - 输入框值
         */
      ctx.emit('blur', value, event)
    }
    /**
       * focus 事件处理方法
       * @param {String | Number} value - 更新后值
       * @param {Event} event - 事件对象
       */
    const handleFocus = (value: string | number, event: Event): void => {
      isFocusClass.value = 'be-input__focus'
      ctx.emit('focus', value, event)
    }
    /**
       * 处理按键
       */
    const handleKeydown = (e: Event) => {
      ctx.emit('keydown', e)
    }
    /**
       * 输入框内容清除方法
       * @public
       */
    const handleClear = (): void => {
      handleInput('')
      ctx.emit('clear')
    }
    /**
       * 输入框前后icon点击方法
       * @param {String} type - 类别
       */
    const handleIcon = (type: string): void => {
      if (type === 'prev')
        ctx.emit('prevIconClick')
      else
        ctx.emit('nextIconClick')
    }
    const showClearIcon = ref<boolean>(false)
    const handleEnter = (type?: string): void => {
      if (type !== 'noInputElm')
        ctx.emit('mouseenter')

      if (props.clearable && type === 'noInputElm')
        showClearIcon.value = true
    }
    const handleLeave = (type?: string): void => {
      if (type !== 'noInputElm')
        ctx.emit('mouseleave')

      if (props.clearable && type === 'noInputElm')
        showClearIcon.value = false
    }
    /** ************************************** 文本域相关方法 *******************************************/
    let curInstAreaRefs: any = null
    const areaStyle = ref({})
    const resizeTextarea = () => {
      const { autosize } = props
      if (inputType.value !== 'textarea')
        return

      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : undefined
        const maxRows = isObject(autosize) ? autosize.maxRows : undefined
        areaStyle.value = {
          ...compTextareaHeight(curInstAreaRefs, minRows, maxRows),
        }
      } else {
        areaStyle.value = {
          minHeight: compTextareaHeight(curInstAreaRefs, props.rows).minHeight,
        }
      }
    }
    const computedTextareaStyle = computed(() => ({
      ...props.inputStyle,
      ...areaStyle.value,
    }))
    watch(
      () => props.modelValue,
      () => {
        nextTick(resizeTextarea)
        // 表单校验
        /* if (props.validateEvent) {
                    elFormItem.formItemMitt?.emit('el.form.change', [val])
                } */
      },
    )

    /** ************************************** 暴露对外的公共方法 *******************************************/
    const beInputInner = ref<any>(null)
    let curInstInputRefs: any = null
    nextTick(() => {
      curInstInputRefs
          = internalInstance?.refs.beInputInner
          && reactive(internalInstance.refs.beInputInner as IInputInst)
      curInstAreaRefs
          = internalInstance.refs.beInputAreaInner
          && reactive(internalInstance.refs.beInputAreaInner as IInputInst)
      beInputInner.value = inputType.value === 'textarea' ? curInstAreaRefs : curInstInputRefs
    })
    const inputOrTextarea = computed(() => {
      return beInputInner.value
    })
    /**
       * 手动聚焦方法
       * @public
       */
    const focus = (): void => {
      nextTick(() => {
        inputOrTextarea.value.focus()
      })
    }
    /**
       * 手动失焦方法
       * @public
       */
    const blur = (): void => {
      inputOrTextarea.value.blur()
    }
    /**
       * 手动选择文字方法
       * @public
       */
    const select = (): void => {
      inputOrTextarea.value.select()
    }
    onMounted(() => {
      nextTick(resizeTextarea)
    })
    return {
      isFocusClass,
      uid: internalInstance.uid,
      attrs,
      beInputInner,
      inputOrTextarea,
      inputType,
      isPassWord,
      computedTextareaStyle,
      focus,
      select,
      handleKeydown,
      blur,
      showClearIcon,
      handleChange,
      handlePassword,
      handleInput,
      handleIcon,
      handleClear,
      handleFocus,
      handleBlur,
      handleEnter,
      handleLeave,
    }
  },
})
</script>

<template>
  <div
    :id="`be_input_${uid}`"
    :class="`
        be-input
        be-input__${size}
        ${isFocusClass}
        ${disabled ? 'be-input__disabled ' : ''}
        ${inputType === 'textarea' ? 'be-input__textarea' : ''}
        ${customClass}`"
  >
    <!-- @slot 前置插槽 -->
    <slot name="prev" />
    <div
      v-if="inputType !== 'textarea'"
      class="be-input--body"
      @mouseenter="handleEnter('noInputElm')"
      @mouseleave="handleLeave('noInputElm')"
    >
      <!--  <div class="be-input" v-click-outside="closeDisplay" :class="customClass">
                <div class="be-input--body" :class="expandStyle"> -->
      <!-- 前置图标 -->
      <BeIcon
        v-if="prevIcon"
        :icon="prevIcon"
        class="be-input--prev-icon"
        @click="handleIcon('prev')"
      />
      <input
        :id="id"
        ref="beInputInner"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="modelValue"
        :maxlength="maxlength"
        :tab-index="tabindex"
        :aria-label="label"
        :type="inputType"
        :style="computedTextareaStyle"
        v-bind="attrs"
        :class="`be-input__inner ${disabled ? 'be-input__disabled' : ''}`"
        @focus="handleFocus($event.target.value, $event)"
        @blur="handleBlur($event.target.value, $event)"
        @change="handleChange"
        @keydown="handleKeydown"
        @mouseenter="handleEnter"
        @mouseleave="handleLeave"
        @input="handleInput($event.target.value)"
      >
      <!--            @blur="handleBlur($event.target.value)"
                        @focus="handleFocus($event.target.value,$event)" -->
      <!-- 后置图标 -->
      <BeIcon
        v-if="nextIcon"
        :icon="nextIcon"
        class="be-input--next-icon"
        @click="handleIcon('next')"
      />
      <!-- 清除按钮 v-show="showClearIcon -->
      <div
        v-if="!isInner && showClearIcon"
        class="be-input--body__close"
      >
        <BeIcon
          icon="deleteIc"
          class="be-input--icon be-input__close"
          @click="handleClear"
        />
      </div>
      <!-- 密碼按鈕 -->
      <div
        v-show="showPassword"
        class="be-input--body__close"
      >
        <BeIcon
          :icon="`${isPassWord ? 'noEye' : 'eye'}`"
          class="be-input--icon be-input__password"
          @click="handlePassword"
        />
      </div>
    </div>
    <!-- @slot 后置插槽 -->
    <slot name="next" />
    <div
      v-if="inputType === 'textarea'"
      class="be-input--body"
    >
      <textarea
        ref="beInputAreaInner"
        class="be-input__textarea__inner"
        v-bind="attrs"
        :tab-index="tabindex"
        :aria-label="label"
        :value="modelValue"
        :style="computedTextareaStyle"
        :disabled="disabled"
        :placeholder="placeholder"
        @focus="handleFocus($event.target.value, $event)"
        @blur="handleBlur($event.target.value, $event)"
        @change="handleChange"
        @keydown="handleKeydown"
        @input="handleInput($event.target.value)"
      />
    </div>
  </div>
</template>
