<script lang="ts">
import {defineComponent, ref, computed, shallowRef, onMounted, onBeforeUnmount} from 'vue'
import { BeIcon } from '@be-ui/components/icon'
import {easeInOutCubic, throttle} from '@be-ui/utils'
export default defineComponent({
  name: 'BeBackTop',
  components: { BeIcon },
  props: {
    right:{
      type: Number,
      default: 40
    },
    bottom:{
      type: Number,
      default: 40
    },
    showHeight:{
      type: Number,
      default: 200
    },
    target:{
      type: String,
      default: ''
    }
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

    const scrollToTop = () =>{
      if (!targetEl.value) return
      const beginTime = Date.now()
      const beginValue = targetEl.value.scrollTop
      const frameFunc = () => {
        if (!targetEl.value) return
        const progress = (Date.now() - beginTime) / 500
        if (progress < 1) {
          targetEl.value.scrollTop = beginValue * (1 - easeInOutCubic(progress))
          requestAnimationFrame(frameFunc)
        } else {
          targetEl.value.scrollTop = 0
        }
      }
      requestAnimationFrame(frameFunc)
    }

    const handleClick = (event: MouseEvent) =>{
      scrollToTop()
      ctx.emit('click', event)
    }

    const setContainer = () =>{
      container.value = document
      targetEl.value = document.documentElement

      if (props.target) {
        targetEl.value = document.querySelector<HTMLElement>(props.target) ?? undefined
        if (!targetEl.value) {
          console.error(`${props.target} does not exist`)
        }
        container.value = targetEl.value
      }
    }

    const handleScroll = () => {
      if (targetEl.value) show.value = targetEl.value.scrollTop >= props.showHeight
    }
    const handleScrollThrottled = throttle(handleScroll, 300)

    onMounted(() => {
      setContainer()
      container.value.addEventListener('scroll', handleScrollThrottled)
    })

    onBeforeUnmount(()=>{
      container.value.removeEventListener('scroll', handleScrollThrottled)
    })
    return {
      show,
      handleClick,
      backTopStyle
    }
  },
})
</script>

<template>
  <transition :name="`be-fade-in`">
    <div
        v-if="show"
        :style="backTopStyle"
        class="be-back-top"
        @click.stop="handleClick">
      <slot>
        <be-icon icon="add"></be-icon>
      </slot>
    </div>
  </transition>
</template>
<style lang="scss">
.be-back-top{
  background-color: white;
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #79bbff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 0 0 4px rgb(24 144 255 / 20%);
  cursor: pointer;
  z-index: 5;
}
</style>
