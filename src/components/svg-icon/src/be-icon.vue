<template>
  <div class='be-icon-container' :class="spinClass">
    <svg class="be-icon"
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
    // 设置旋转
    spinClass() {
      return this.spin ? 'be-icon-spin ' + this.customClass: '' + this.customClass
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.be-icon-container {
  display: inline-block;
  .be-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    overflow: hidden;
  }

  .be-external-icon {
    background-color: black;
    mask-size: cover !important;
    display: inline-block;
  }

  .be-icon-spin {
    display: inline-block;
    -webkit-animation: spin 1s infinite linear;
    animation: spin 1s infinite linear;
  }
}

</style>