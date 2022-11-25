<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { isBool, isNumber, isString } from '@be-ui/utils'
import { BeIcon } from '@be-ui/components/icon'
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
    /**
     * 切换状态方法
     */
    let changeData = {}
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
    let isUpdateModel = false
    const switchState = (): void => {
      changeClass()
      // 切换状态
      const modelValue = setInnerState()
      emitChangeEvt()
      ctx.emit('update:modelValue', modelValue)
      isUpdateModel = true
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
      },
    )
    /**
     * 点击方法
     * @param {Event} $event - 事件对象
     */
    const handleClick = async($event?: Event) => {
      if (props.disabled || props.isLoading)
        return
      await switchState()
      ctx.emit('click', $event)
    }
    /**
     * 初始化方法
     */
    const init = (): void => {
      if (
        props.unCheckedValue !== undefined
          && props.unCheckedValue !== ''
          && (isBool(props.unCheckedValue)
              || isString(props.unCheckedValue)
              || isNumber(props.unCheckedValue))
          && props.modelValue === props.unCheckedValue
      ) {
        innerState.value = false
        ctx.emit('update:modelValue', props.unCheckedValue)
        return
      }
      if (
        props.checkedValue !== undefined
          && props.checkedValue !== ''
          && (isBool(props.checkedValue)
              || isString(props.checkedValue)
              || isNumber(props.checkedValue))
          && props.modelValue === props.checkedValue
      ) {
        innerState.value = true
        ctx.emit('update:modelValue', props.checkedValue)
        return
      }
      ctx.emit('update:modelValue', setInnerState())
    }
    init()
    return {
      innerState,
      handleClick,
      switching,
    }
  },
})
</script>

<template>
  <div
    :class="`
      be-switch
      be-switch__${size}
      ${disabled || isLoading ? 'be-switch__disabled' : ''}
      ${innerState ? 'be-switch__checked' : 'be-switch__unChecked'}
      ${switching}
      ${customClass} `"
    tab-index="0"
    @click="handleClick"
  >
    <div
      v-if="!innerState"
      :class="`be-switch__${size}_slot__unChecked`"
    >
      <slot
        name="unCheckedRender"
        :state="innerState"
      />
    </div>

    <div class="be-switch--circle">
      <BeIcon
        v-if="isLoading"
        spin
        icon="loading"
        custom-class="be-switch--circle--icon"
      />
    </div>
    <div
      v-if="innerState"
      :class="`be-switch__${size}_slot__checked`"
    >
      <slot
        name="checkedRender"
        :state="innerState"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
