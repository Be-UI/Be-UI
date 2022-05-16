<template>
  <be-popover
    :placement="placement"
    :raw="raw"
    :custom-class="customClass"
    :disabled="disabled"
    :delay="delay"
    :duration="duration"
    :x="x"
    :y="y"
    :width="width"
    :trigger="trigger"
  >
    <template #trigger>
      <slot />
    </template>
    <span>{{ content }}</span>
  </be-popover>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import popover from '../../popover/src/be-popover.vue'

  export default defineComponent({
    name: 'BeTooltip',
    components: {
      'be-popover': popover,
    },
    props: {
      /**
       * 显示方向
       */
      placement: {
        type: String,
        default: 'top',
      },
      /**
       * 显示箭头
       */
      raw: {
        type: Boolean,
        default: true,
      },
      /**
       * 自定义样式覆盖
       */
      customClass: {
        type: String,
        default: '',
      },
      /**
       * 手动定位 x
       */
      x: {
        type: Number,
      },
      /**
       * 手动定位 y
       */
      y: {
        type: Number,
      },
      /**
       * 宽度
       */
      width: {
        type: String,
      },
      /**
       * 是否禁用
       */
      disabled: {
        type: Boolean,
        default: false,
      },
      /**
       * 延时显示
       */
      delay: {
        type: Number,
        default: 100,
      },
      /**
       * 延时关闭
       */
      duration: {
        type: Number,
        default: 100,
      },
      /**
       * 触发方式
       */
      trigger: {
        type: String,
        default: 'hover',
      },
      /**
       * 渲染内容
       */
      content: {
        type: String,
        default: '',
      },
    },
  })
</script>
