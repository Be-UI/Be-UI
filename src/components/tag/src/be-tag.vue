<template>
  <div
    :style="styleOption"
    :class="`
  be-tag
  be-tag__${disabled ? 'disabled' : ''}
  be-tag__${type}
  be-tag__${size}
  ${customClass}
  `">
    <span :style="{ color: styleOption?.color }" :class="{ 'be—tag--close': isClose }">
      <slot></slot>
    </span>
    <be-icon
      v-if="isClose"
      icon="deleteIc"
      class="be-tag_close"
      :style="{ fill: styleOption?.color }"
      @click="$event => handleClose($event)"></be-icon>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import BeIcon from '../../svg-icon/src/be-icon.vue'

  export default defineComponent({
    name: 'BeTag',
    components: { BeIcon },
    props: {
      /**
       * 尺寸
       * @values 'mini' | 'medium' | 'large'
       */
      size: {
        type: String,
        default: 'medium',
      },
      /**
       * 类型
       * @values 'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'
       */
      type: {
        type: String,
        default: 'default',
      },
      /**
       * 禁用
       */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * 圆角
       */
      round: {
        type: [Number, String],
        default: 0,
      },
      /**
       * 可关闭
       */
      isClose: {
        type: Boolean,
        default: false,
      },
      /**
       * 配置，背景色，边框色，文字色
       */
      option: {
        type: Object,
        default: () => {
          return {}
        },
      },
      /**
       * 自定义主题样式类 (完成)
       */
      customClass: {
        type: String,
        default: '',
      },
    },
    emits: ['close'],
    setup(props, ctx) {
      /**
       * 关闭回调
       * @param {Event} event - 事件对象
       */
      const handleClose = (event: Event) => {
        event.stopPropagation()
        if (props.disabled) {
          return
        }
        ctx.emit('close', event)
      }
      let styleOption = reactive({})
      styleOption = {
        borderRadius: `${props.round}px`,
        backgroundColor: props.option?.backgroundColor || '',
        border: props.option?.border || '',
        color: props.option?.color || '',
      }
      return {
        handleClose,
        styleOption,
      }
    },
  })
</script>

<style lang="scss">
  @import '../../../assets/style/be-tag.scss';
</style>
