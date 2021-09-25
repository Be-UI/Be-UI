<template>
  <be-tooltip :content="content" :placement="placement">
     <span
         @click="expandTriggerFunc"
         :style="styleStr"
         v-html="state.textInner">
    </span>
  </be-tooltip>
</template>

<script lang="ts">

import {
  defineComponent,
  defineAsyncComponent,
  reactive,
  watchEffect,
  ref
} from "vue";

export default defineComponent({
  name: "BeEllipsis",
  components: {
    'be-tooltip': defineAsyncComponent(() => import("../../tooltip")),
  },
  props: {
    /**
     * 提示显示内容
     */
    'content': {
      type: String,
      default: ''
    },
    /**
     * 显示内容
     */
    'text': {
      type: String,
      default: ''
    },
    /**
     * 点击展开
     */
    'expandTrigger': {
      type: Boolean,
      default: false
    },
    /**
     * 多行省略
     */
    'lineClamp': {
      type: Number,
      default: 3
    },
    /**
     * 缩略字符数
     */
    'elpNum': {
      type: Number,
      default: 5
    },
    /**
     * 缩略位置
     */
    'placement': {
      type: String,
      default: 'left'
    },
  },
  setup(props, context) {
    // 定义state
    const state = reactive({
      isExpand: false,
      textCache: '',
      textInner: ''
    })
    /**
     * 监听文字变化，根据方向处理文字
     */
    const handleText = (): void => {
      if (props.placement === 'left') {
        state.textInner = props.text.slice(0, props.text.length - props.elpNum) + '...'
      }
      if (props.placement === 'center') {
        let elpNumCenter = props.elpNum / 2
        let lenCenter = props.text.length / 2
        let subStr1 = props.text.substr(0, lenCenter - elpNumCenter);
        let subStr2 = props.text.substr(lenCenter + elpNumCenter, props.text.length);
        let subStr = subStr1 + "..." + subStr2;
        state.textInner = subStr;
      }
      if (props.placement === 'right') {
        state.textInner = '...' + props.text.slice(0, props.text.length - props.elpNum)
      }
    }
    watchEffect(() => {
      state.textCache = props.text;
      handleText()
    })
    /**
     * 展开方法
     */
    const styleStr = ref(`-webkit-line-clamp:${props.lineClamp};display:-webkit-inline-box;-webkit-box-orient:vertical;overflow:hidden;`)
    const expandTriggerFunc = (): void => {
      if (!props.expandTrigger) return
      state.isExpand = !state.isExpand
      styleStr.value = state.isExpand ? '' : `-webkit-line-clamp:${props.lineClamp};display:-webkit-inline-box;-webkit-box-orient:vertical;overflow:hidden;`
      state.isExpand && (state.textInner = state.textCache)
      !state.isExpand && handleText()
    }
    return {
      state,
      handleText,
      styleStr,
      expandTriggerFunc,
    };
  },
})
</script>
