<template>
  <be-popover
      :placement="placement"
      :raw="raw"
      :customClass="customClass"
      :disabled="disabled"
      :delay="delay"
      :duration="duration"
      :x="x"
      :y="y"
      :width="width"
      :trigger = "trigger">
      <slot slot="trigger"></slot>
    <span>{{content}}</span>
  </be-popover>
</template>
<script>
export default {
  name: "BeTooltip",
  props: {
    /**
     * 显示方向
     */
    'placement': {
      type: String,
      default: 'top'
    },
    /**
     * 显示箭头
     */
    'raw': {
      type: Boolean,
      default: true
    },
    /**
     * 自定义样式覆盖
     */
    'customClass': {
      type: String,
      default: ''
    },
    /**
     * 手动定位 x
     */
    'x': {
      type: Number,
    },
    /**
     * 手动定位 y
     */
    'y': {
      type: Number,
    },
    /**
     * 宽度
     */
    'width': {
      type: String | Number,
    },
    /**
     * 是否禁用
     */
    'disabled': {
      type: Boolean,
      default: false
    },
    /**
     * 延时显示
     */
    'delay': {
      type: Number,
      default: 100
    },
    /**
     * 延时关闭
     */
    'duration': {
      type: Number,
      default: 100
    },
    /**
     * 触发方式
     */
    'trigger': {
      type: String,
      default: 'hover'
    },
    /**
     * 触发方式
     */
    'content': {
      type: String,
      default: ''
    },
  },
}
</script>

<style scoped>

</style>