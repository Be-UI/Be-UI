<template>
  <div class='be-icon-container' :class="spinClass" v-on="$attrs" >
    <svg class="be-icon"
         :width="width"
         :height="height"
         aria-hidden="true">
      <use :xlink:href="`#${iconName}`" :fill="color"/>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent ,computed} from "vue";
/*
* 旋转
* */
export default defineComponent({
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
  setup(props, context) {
    const iconName = computed(() => `${props.icon}`)
    const spinClass = computed(() => props.spin ? 'be-icon-spin ' + props.customClass: '' + props.customClass)
    return {
      props,
      iconName,
      spinClass
    }
  }
})
</script>

<style lang="scss">
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

}

.be-icon-spin {
  display: inline-block;
  -webkit-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
}
</style>