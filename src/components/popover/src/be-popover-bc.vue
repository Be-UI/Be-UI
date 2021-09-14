<template>
<!--  <div v-click-outside="{handler:close,isDisabled:outsideDisabled}">-->
 <teleport to="body">
    <div :id="`be_popover_trigger${uid}`" aria-describedby="tooltip">
      <slot name="trigger"></slot>
    </div>
    <div class="be-popover"
         :class="customClass"
         role="tooltip"
         :id="`be_popover_${uid}`"
         :key="`be_popover_${uid}`"
         v-if="show"
         :style="stylePopover">
      <div class="be-popover-body" :id="`be_popover_body${uid}`">
        <slot></slot>
      </div>
<!--      <div class="be-popover-arrow"
           :id="`be_popover_arrow${this._.uid}`"
           v-if="raw" :class="`be-popover-arrow&#45;&#45;${place}`">
      </div>-->
    </div>
  </teleport>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  ref,
  nextTick,
  getCurrentInstance, reactive
} from "vue";
import { createPopper } from '@popperjs/core'
import {IPopover,TPopoverStyle} from './be-popover-type'
export default defineComponent({
  name: "BePopover",
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
      type: Number,
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
  },
  setup(props,ctx){
    const internalInstance  = getCurrentInstance() as IPopover

    let triggerDom:Element | any = null
    let show = ref(false)
    let outsideDisabled:boolean = false
    let popperJS:any = null
    let place:string = ''
    let stylePopover:TPopoverStyle = reactive({
      left: '0px',
      top: '0px',
    })
    /**
     * click-outside 指令使用的关闭方法
     */
    const close = ():void =>{
      setTimeout(() => {
        if (popperJS && popperJS.destroy) {
          popperJS.destroy();
        }
        show.value = false
        /** 提交触发 显示跟新 事件
         * @event update
         * @param {Boolean} 当前显示状态
         */
        ctx.emit('update', show.value)
      }, props.duration)
    }
    /**
     * 显示控制方法
     * @param {Boolean} isShow - 显示变量
     */
    const changeDisplay = (isShow:boolean):void =>{
      let delay = 100
      if (isShow) {
        delay = props.delay
      } else {
        delay = props.duration
      }
      setTimeout(() => {
        show.value = isShow
        nextTick(() => {
          if (show.value) {
            computePosition(props.placement)
          }
        })
      }, delay)
    }
    /**
     * 计算显示位置
     * @param {String} placement - 位置
     */
    const computePosition = (placement:string):void=> {
      if (props.x && props.y) {
        stylePopover.left = props.x + 'px'
        stylePopover.top = props.y + 'px'
        return
      }
      // 使用popover.js 对popover进行定位
      if (popperJS && popperJS.destroy) {
        popperJS.destroy();
      }
      let popover:HTMLElement = document.getElementById(`be_popover_${internalInstance.uid}`) as HTMLElement
      popperJS = createPopper(triggerDom, popover, {
        placement: placement as string,
        /*modifiers: [
         /*
            name: 'offset',
            options: {
              offset: [10, 20],
            },
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top', 'right'],
            },
          },
          ],*/
      });
      popperJS.update().then((res:any)=>{
        /*_this.place = res.placement
        _this.$emit('update', _this.show)*/
      })

    }
    /**
     * 遍历dom树，找到合适的trigger元素
     * @param root
     * @return {*}
     */
    const matchDom = (root:any):any => {
      for (let i = 0; i < root.childNodes.length; i++) {
        let node = root.childNodes[i];
        if ((node.nodeType !== 3) && (node.nodeType !== 8) && (node.nodeName !== 'SCRIPT')) {
          let triggerWidth = Number(window.getComputedStyle(node).width.split('px')[0])
          let triggerHeight = node.getBoundingClientRect().height
          if(triggerWidth !== 0 || triggerHeight !== 0){
            return node
            break
          }else{
            return matchDom(node)
          }
        }
      }
    }
    /**
     * 设置箭头
     */
    const setArrow = ():void => {
      let popover = document.getElementById(`be_popover_${internalInstance.uid}`)
      if (popover) {
        place = popover.getAttribute('x-placement') as string
      }
    }
    onMounted(() => {
      // 根据触发类型 设置是否禁用 click-outside
      if (props.trigger === 'hover' || props.trigger === 'manual') {
        outsideDisabled = true
      }
      // 禁用就不绑定触发事件了
      if (props.disabled) {
        return
      }
      if (props.width) {
        stylePopover.width = props.width + 'px'
      }
      // 给触发插槽绑定事件
      if (ctx.slots.trigger) {
        triggerDom = matchDom(document.getElementById(`be_popover_trigger${internalInstance.uid}`))
        // 根据触发类型 设置不同的事件监听
        if (triggerDom && props.trigger === 'click') {
          triggerDom.addEventListener('click', () => changeDisplay(true), false)
        }
        if (triggerDom && props.trigger === 'hover') {
          triggerDom.addEventListener('mouseenter', () => changeDisplay(true), false)
          triggerDom.addEventListener('mouseleave', () => changeDisplay(false), false)
        }
        if (triggerDom && props.trigger === 'manual') {
          triggerDom.addEventListener('click', () => changeDisplay(!show.value), false)
        }

        /*window.onresize = () => {
           this.setArrow()
        }
        window.onscroll = () => {
           this.setArrow()
        }*/
      } else {
        console.error('Please set the trigger element')
      }
    })
    onBeforeUnmount(() => {
      // 取消事件监听
      if (triggerDom) {
        triggerDom.removeEventListener('click', () => changeDisplay(true), false)
        triggerDom.removeEventListener('mouseenter', () => changeDisplay(true), false)
        triggerDom.removeEventListener('mouseleave', () => changeDisplay(false), false)
      }
    })
    return {
      uid:internalInstance.uid,
      stylePopover,
      show,
      customClass:props.customClass
    }
  }
})
</script>

<style lang="scss">
@import "../../../assets/style/be-popover";
</style>