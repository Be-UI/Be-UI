<template>
  <div v-click-outside="{handler:close,isDisabled:outsideDisabled}">
    <slot name="trigger"></slot>
    <div class='be-popover'
         :id="`be_popover_${this._uid}`"
         v-if="show"
         :style="style">
      <div class='be-popover-header' v-if="$slots.header">
        <slot name="header"></slot>
      </div>
      <slot></slot>
      <div class='be-popover-footer' v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "be-popover",
  data() {
    return {
      triggerDom: null,
      show: false,
      outsideDisabled: false,
      style:{
        left:0,
        top:0,
      },

    }
  },
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
  methods: {
    /**
     * click-outside 指令使用的关闭方法
     */
    close() {
      setTimeout(() => {
        this.show = false
        /** 提交触发 显示跟新 事件
         * @event update
         * @param {Boolean} 当前显示状态
         */
        this.$emit('update', this.show)
      }, this.duration)
    },
    /**
     * 显示控制方法
     * @param {Boolean} show - 显示变量
     */
    changeDisplay(show) {
      let delay = 100
      if (show) {
        delay = this.delay
      } else {
        delay = this.duration
      }
      setTimeout(() => {
        this.show = show
        this.$nextTick(()=>{
          this.show && this.computePosition()
        })
        /** 提交触发 显示跟新 事件
         * @event update
         * @param {Boolean} 当前显示状态
         */
        this.$emit('update', this.show)
      }, delay)
    },
    /**
     * 计算显示位置
     */
    computePosition(){
       if(this.x && this.y){
         this.style.left = this.x
         this.style.top = this.y
         return
       }
       let popover = document.getElementById(`be_popover_${this._uid}`)
       let triggerWidth = Number(window.getComputedStyle(this.triggerDom).width.split('px')[0])
       let triggerHeight = this.triggerDom.getBoundingClientRect().height
       let popoverHeight = popover.getBoundingClientRect().height
       let popoverWidth = popover.getBoundingClientRect().width
       let triggerLeft = this.triggerDom.getBoundingClientRect().left
       let triggerTop = this.triggerDom.getBoundingClientRect().top
       console.log(triggerWidth)
       if(this.placement === 'top'){
         this.style.left = this.x || triggerLeft - popoverWidth/2 + triggerWidth/2 + 'px'
         this.style.top = this.y || triggerTop - popoverHeight - 10 + 'px'//- popoverHeight - 10 + 'px'
       }
      if(this.placement === 'bottom'){

       }
       if(this.placement === 'left'){

       }
      if(this.placement === 'right'){

      }
    },
  },
  created() {
    // 根据触发类型 设置是否禁用 click-outside
    if (this.trigger === 'hover' || this.trigger === 'manual') {
      this.outsideDisabled = true
    }
  },
  mounted() {
    // 禁用就不绑定触发事件了
    if (this.disabled) {
      return
    }
    // 给触发插槽绑定事件
    if (this.$slots.trigger) {
      this.triggerDom = this.$slots.trigger[0].elm
      // 根据触发类型 设置不同的事件监听
      if (this.triggerDom && this.trigger === 'click') {
        this.triggerDom.addEventListener('click', () => this.changeDisplay(true), false)
      }
      if (this.triggerDom && this.trigger === 'hover') {
        this.triggerDom.addEventListener('mouseenter', () => this.changeDisplay(true), false)
        this.triggerDom.addEventListener('mouseleave', () => this.changeDisplay(false), false)
      }
      if (this.triggerDom && this.trigger === 'manual') {
        this.triggerDom.addEventListener('click', () => this.changeDisplay(!this.show), false)
      }
    } else {
      console.error('Please set the trigger element')
    }
  },
  beforeDestroy() {
    // 取消事件监听
    if (this.triggerDom) {
      this.triggerDom.removeEventListener('click', () => this.changeDisplay(true), false)
      this.triggerDom.removeEventListener('mouseenter', () => this.changeDisplay(true), false)
      this.triggerDom.removeEventListener('mouseleave', () => this.changeDisplay(false), false)
    }
  }
}
</script>

<style lang="scss">
@import "../../../assets/style/be-popover";
</style>