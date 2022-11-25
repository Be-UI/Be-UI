<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { BeIcon } from '@be-ui/components/icon'
import BTween from 'b-tween'
export default defineComponent({
  name: 'BeBackTop',
  components: { BeIcon },
  props: {
    right: {
      type: Number,
      default: 40,
    },
    bottom: {
      type: Number,
      default: 40,
    },
    showHeight: {
      type: Number,
      default: 200,
    },
    target: { // 触发滚动的对象
      type: String,
      default: '',
    },
    easing: {
      type: String,
      default: 'quartOut',
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  emits: ['click'],
  setup(props, ctx) {
    const show = ref(false)
    const targetEl = shallowRef<HTMLElement>()
    const container = shallowRef<Document | HTMLElement>()
    const backTopStyle = computed(() => ({
      right: `${props.right}px`,
      bottom: `${props.bottom}px`,
    }))

    const scrollToTop = () => {
      if (!targetEl.value) return
      const { scrollTop } = targetEl.value
      const tween = new BTween({
        from: { scrollTop },
        to: { scrollTop: 0 },
        easing: props.easing,
        duration: props.duration,
        onUpdate: (keys: any) => {
          if (targetEl.value)
            targetEl.value.scrollTop = keys.scrollTop
        },
      })
      tween.start()
    }

    const handleClick = (event: MouseEvent) => {
      // 返回顶部
      scrollToTop()
      ctx.emit('click', event)
    }

    const setContainer = () => {
      // 容器
      container.value = document
      // 目标对象
      targetEl.value = document.documentElement

      if (props.target) {
        targetEl.value = document.querySelector<HTMLElement>(props.target) ?? undefined
        if (!targetEl.value)
          console.error(`${props.target} does not exist`)

        container.value = targetEl.value
      }
    }

    // 滚动事件，超过滚动距离就显示组件
    const handleScroll = () => {
      if (targetEl.value) {
        const { showHeight } = props
        const { scrollTop } = targetEl.value
        show.value = scrollTop >= showHeight
      }
    }
    handleScroll()

    onMounted(() => {
      setContainer()
      container.value && container.value.addEventListener('scroll', handleScroll)
    })

    onBeforeUnmount(() => {
      container.value && container.value.removeEventListener('scroll', handleScroll)
    })
    return {
      show,
      handleClick,
      backTopStyle,
    }
  },
})
</script>

<template>
  <transition name="be-fade-in-linear">
    <div
      v-if="show"
      :style="backTopStyle"
      class="be-back-top"
      @click.stop="handleClick"
    >
      <slot>
        <BeIcon icon="up" />
      </slot>
    </div>
  </transition>
</template>

<style lang="scss">
/*.be-back-top{
  background-color: white;
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  cursor: pointer;
  z-index: 5;
}
.be-back-top:hover{
  color: #000000;
  .be-icon--container{
    use{
      fill: #ec4899;
    }
  }
}*/
</style>
