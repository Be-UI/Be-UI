<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'BeIcon',
  props: {
    /**
       * 自定义宽
       */
    width: {
      type: [Number, String],
      default: 18,
    },
    /**
       * 自定义高
       */
    height: {
      type: [Number, String],
      default: 18,
    },
    /**
       * 定义颜色
       */
    color: {
      type: String,
      default: '',
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
      default: '',
    },
    /**
       * 是否旋转
       */
    spin: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const iconName = computed(() => `${props.icon}`)
    const spinClass = computed(() =>
      props.spin ? `be-icon__spin ${props.customClass}` : `${props.customClass}`,
    )
    return {
      props,
      iconName,
      spinClass,
    }
  },
})
</script>

<template>
  <div class="be-icon" :class="spinClass" v-on="$attrs">
    <svg
      class="be-icon--container"
      :width="width"
      :height="height"
      aria-hidden="true"
    >
      <use :xlink:href="`#${iconName}`" :fill="color" />
    </svg>
  </div>
</template>

