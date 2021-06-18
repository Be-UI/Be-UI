<template>
  <div :class="spinClass">
    <svg :class="svgClass"
         :width="width"
         :height="height"
         aria-hidden="true"
         v-on="$listeners">
      <use :xlink:href="iconName" :fill="color"/>
    </svg>
  </div>
</template>

<script>
/*
* 旋转
* */
export default {
  name: 'BeIcon',
  props: {
    /**
     * 自定义宽
     */
    width: {
      type: [Number, String],
      default: 18
    },
    /**
     * 自定义高
     */
    height: {
      type: [Number, String],
      default: 18
    },
    /**
     * 定义颜色
     */
    color: {
      type: String,
      default: ''
    },
    /**
     * icon 名称
     */
    icon: {
      type: String,
    },
    /**
     * 自定义样式类
     */
    customClass: {
      type: String,
      default: ''
    },
    /**
     * 是否旋转
     */
    spin: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 设置对应图标
    iconName() {
      return `#${this.icon}`
    },
    // 设置对应自定义样式
    svgClass() {
      if (this.customClass) {
        return 'svg-icon ' + this.customClass
      } else {
        return 'svg-icon'
      }
    },
    // 设置旋转
    spinClass() {
      return this.spin ? 'be-icon-spin' :''
    },
    svgClass() {
      if (this.customClass) {
        return 'svg-icon ' + (this.spin ? 'be-icon-spin' :'') + this.customClass
      } else {
        return 'svg-icon ' + (this.spin ? 'be-icon-spin' :'')
      }
    }
  }
}
</script>

<style scoped>
@keyframes spin{
  100% {
    transform: rotate(360deg);
  }
}
.be-icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  overflow: hidden;
}

.be-external-icon {
  background-color: black;
  mask-size: cover!important;
  display: inline-block;
}
.be-icon-spin{
  display: inline-block;
  -webkit-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
}
</style>