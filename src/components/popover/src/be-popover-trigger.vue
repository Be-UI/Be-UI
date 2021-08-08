<template>
  <div v-click-outside="{handler:close,isDisabled:outsideDisabled}">
    <div :id="`be_popover_trigger${this._uid}`">
      <slot name="trigger"></slot>
    </div>
    <div class="be-popover"
         :class="customClass"
         :id="`be_popover_${this._uid}`"
         :key="`be_popover_${this._uid}`"
         v-if="show"
         :style="style">
      <div class="be-popover-body" :id="`be_popover_body${this._uid}`">
        <slot></slot>
      </div>
      <div class="be-popover-arrow"  v-if="raw"  :class="`be-popover-arrow--${place}`"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import bePopoverContent from './be-popover'
export default {
  name: "BePopover",
  data() {
    return {
      triggerDom: null,
      show: false,
      outsideDisabled: false,
      place:'',
      style: {
        left: '0px',
        top: '0px',
      },
      bePopoverContentInst:null
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
      default: false
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
      const _this = this
      let delay = 100
      if (show) {
        delay = this.delay
      } else {
        delay = this.duration
      }
      setTimeout(() => {
      _this.style.left = _this.triggerDom.getBoundingClientRect().left + 'px'
      _this.style.top = _this.triggerDom.getBoundingClientRect().top + 'px'
      /*  if(this.placement === 'left'){
          _this.style.left = _this.style.left + Number(window.getComputedStyle(_this.triggerDom).width.split('px')[0])
        }*/
        _this.bePopoverContentInst.show = show
        _this.show = show
        _this.$nextTick(() => {
         this.show && this.computePosition(this.placement)
        })
        /** 提交触发 显示跟新 事件
         * @event update
         * @param {Boolean} 当前显示状态
         */
        _this.$emit('update', this.show)
      }, delay)
    },
    /**
     * 计算显示位置
     */
    computePosition(placement) {
      if (this.x && this.y) {
        this.style.left = this.x + 'px'
        this.style.top = this.y + 'px'
        return
      }
      let place = placement
      let popover = document.getElementById(`be_popover_${this._uid}`)
      // 触发元素宽高
      let triggerWidth = Number(window.getComputedStyle(this.triggerDom).width.split('px')[0])
      let triggerHeight = this.triggerDom.getBoundingClientRect().height
      // popover元素宽高
      let popoverHeight = popover.getBoundingClientRect().height
      let popoverWidth = popover.getBoundingClientRect().width
      // 触发元素位置
      let triggerLeft = this.triggerDom.getBoundingClientRect().left
      let triggerTop = this.triggerDom.getBoundingClientRect().top
      // 垂直方向方向
      // 左边放不下 放到右边
      if (triggerLeft - popoverWidth < 0 && this.placement === 'left') {
        place = 'right'
      }
      // 右边放不下 放左边
      if (triggerLeft + popoverWidth + triggerWidth >= document.body.clientWidth && this.placement === 'right') {
        place = 'left'
      }
      // 上边放不下 放下边
      if (triggerTop - popoverHeight <= 0 && this.placement === 'top') {
        place = 'bottom'
      }
      if (triggerTop + popoverHeight + triggerHeight >= document.body.clientHeight && this.placement === 'bottom') {
        place = 'top'
      }
      if (place === 'top') {
        this.style.left = (this.x || triggerLeft - popoverWidth / 2 + triggerWidth / 2) + 'px'
        this.style.top = (this.y || triggerTop - popoverHeight - 5) + 'px'
      }
      if (place === 'bottom') {
       // 只有大于时，才计算偏移，反之 说明内容很多，发生了换行
        //if(document.body.clientWidth > popoverWidth){
          this.style.left = (this.x || triggerLeft - popoverWidth / 2 + triggerWidth / 2) + 'px'
       // }
        this.style.top = (this.y || triggerTop + triggerHeight + 5) + 'px'
      }
      if (place === 'left') {
        this.style.left = (this.x || triggerLeft - popoverWidth - 5) + 'px'
        this.style.top = (this.y || triggerTop - (popoverHeight / 2 - triggerHeight / 2)) - 2 + 'px'
      }
      if (place === 'right') {
         this.style.left = (this.x || triggerLeft + triggerWidth + 5) + 'px'
         this.style.top = (this.y || triggerTop - (popoverHeight / 2 - triggerHeight / 2)) - 2 + 'px'
        //this.style.top = (this.y || triggerTop) - 2 + 'px'
      }
      if (place === 'top' || place === 'bottom') {
        this.style.left = Number(this.style.left.split('px')[0])  > 0 ? this.style.left : triggerLeft + 'px'
      }
      if (triggerLeft - popoverWidth < 0 && this.placement === 'right') {
        this.style.left = triggerLeft + triggerWidth + 5 + 'px'
        this.style.top  = triggerTop  + 'px'
      }
      this.place = place
    },

    matchDom(root){
      for (let i = 0;i < root.childNodes.length;i++) {
        let node = root.childNodes[i];
        let triggerWidth = Number(window.getComputedStyle(node).width.split('px')[0])
        let triggerHeight = node.getBoundingClientRect().height
        if(triggerWidth !== 0 || triggerHeight !== 0 && (node.nodeType !== 3) && (node.nodeType !== 8)&& (node.nodeName !== 'SCRIPT')){
          return node;break
        }else{
          return this.matchDom(node)
        }
      }
    },
    createContent(){
      const bePopoverContentCostr = Vue.extend(bePopoverContent)
      let datas = {...this.$data,...this.$props}
      this.bePopoverContentInst  = new bePopoverContentCostr({
        data:{...datas},
      }).$mount()
      // 挂载元素
      const bodyElement = document.querySelector('body')
      if (bodyElement.append) {
        bodyElement.append(this.bePopoverContentInst.$el)
      } else {
        bodyElement.appendChild(this.bePopoverContentInst.$el)
      }
    }
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
    this.createContent()
    if(this.width){
      this.style.width = this.width + 'px'
    }
      // 给触发插槽绑定事件
      if (this.$slots.trigger) {
        this.triggerDom = this.matchDom(document.getElementById(`be_popover_trigger${this._uid}`))
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
        window.onresize = () => {
          this.computePosition(this.placement)

        }
        window.onscroll = () => {
          // 设置显示位置,宽度
          this.computePosition(this.placement)
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