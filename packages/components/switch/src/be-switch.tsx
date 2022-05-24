import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { isBool, isNumber, isString } from '@be-ui/utils/common'
import {BeIcon} from '@be-ui/components'
import { ISwitchInst } from './be-switch-type'

export default defineComponent({
  name: 'BeSwitch',
  components: { BeIcon },
  props: {
    /**
     * 绑定值 （完成）
     */
    modelValue: {
      type: [Boolean, String, Number],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'default',
    },
    customClass: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    checkedValue: {
      type: [String, Boolean, Number],
      default: true,
    },
    unCheckedValue: {
      type: [String, Boolean, Number],
      default: false,
    },
  },
  emits: ['update:modelValue', 'change', 'click'],
  setup(props, ctx) {
    const innerState = ref<boolean>(false)
    const switching = ref<string>('')
    // 當前實例
    const internalInstance = getCurrentInstance() as ISwitchInst
    /**
     * 切换状态方法
     */
    let changeData = {}
    let isUpdateModel = false
    const switchState = (): void => {
      changeClass()
      // 切换状态
      const modelValue = setInnerState()
      emitChangeEvt()
      ctx.emit('update:modelValue', modelValue)
      isUpdateModel = true
    }
    const setInnerState = (): string | number | boolean => {
      if (innerState.value) {
        innerState.value = false
        changeData = {
          newVal: props.unCheckedValue ? props.unCheckedValue : false,
          oldVal: props.checkedValue ? props.checkedValue : true,
        }
        return props.unCheckedValue ? props.unCheckedValue : false
      }
      innerState.value = true
      changeData = {
        newVal: props.checkedValue ? props.checkedValue : true,
        oldVal: props.unCheckedValue ? props.unCheckedValue : false,
      }
      return props.checkedValue ? props.checkedValue : true
    }
    watch(
      () => props.modelValue,
      () => {
        if (isUpdateModel) {
          isUpdateModel = false
          return
        }
        setInnerState()
        emitChangeEvt()
      }
    )
    const emitChangeEvt = (): void => {
      ctx.emit('change', changeData)
    }
    /**
     * 设置动画样式类
     */
    const changeClass = (): void => {
      switching.value = 'be-switching'
      setTimeout(() => {
        switching.value = ''
      }, 500)
    }
    /**
     * 点击方法
     * @param {Event} $event - 事件对象
     */
    const handleClick = async ($event?: Event) => {
      if (props.disabled || props.isLoading) return
      await switchState()
      ctx.emit('click', $event)
    }
    /**
     * 初始化方法
     */
    const init = (): void => {
      if (
        props.unCheckedValue !== undefined &&
        props.unCheckedValue !== '' &&
        (isBool(props.unCheckedValue) ||
          isString(props.unCheckedValue) ||
          isNumber(props.unCheckedValue)) &&
        props.modelValue === props.unCheckedValue
      ) {
        innerState.value = false
      }
      if (
        props.checkedValue !== undefined &&
        props.checkedValue !== '' &&
        (isBool(props.checkedValue) ||
          isString(props.checkedValue) ||
          isNumber(props.checkedValue)) &&
        props.modelValue === props.checkedValue
      ) {
        innerState.value = true
      }
    }
    onMounted(() => {
      init()
    })
    return () => {
      const unCheckedRender = internalInstance?.slots.unCheckedRender ? (
        <div class={`be-switch__${props.size}_slot__unChecked`}>
          {' '}
          {internalInstance?.slots.unCheckedRender(innerState.value)}
        </div>
      ) : (
        ''
      )
      const checkedRender = internalInstance?.slots.checkedRender ? (
        <div class={`be-switch__${props.size}_slot__checked`}>
          {internalInstance?.slots.checkedRender(innerState.value)}
        </div>
      ) : (
        ''
      )
      return (
        <div
          class={`
                        be-switch
                        be-switch__${props.size}
                        ${props.disabled || props.isLoading ? 'be-switch__disabled' : ''}
                        ${innerState.value ? 'be-switch__checked' : 'be-switch__unChecked'}
                        ${switching.value}
                        ${props.customClass}
                    `}
          tabindex="0"
          onClick={$event => handleClick($event)}>
          {innerState.value ? unCheckedRender : ''}
          <div class="be-switch--circle">
            {props.isLoading ? (
              <be-icon spin icon="loading" customClass="be-switch--circle--icon"></be-icon>
            ) : (
              ''
            )}
          </div>
          {!innerState.value ? checkedRender : ''}
        </div>
      )
    }
  },
})
