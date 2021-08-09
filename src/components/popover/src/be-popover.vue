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
      <div class="be-popover-arrow"
           :id="`be_popover_arrow${this._uid}`"
           v-if="raw" :class="`be-popover-arrow--${place}`"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

const PopperJS = require('../../../utils/popper');
export default {
  name: "BePopover",
  data() {
    return {
      triggerDom: null,
      show: false,
      outsideDisabled: false,
      popperJS: null,
      place: '',
      style: {
        left: '0px',
        top: '0px',
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
        if (this.popperJS && this.popperJS.destroy) {
          this.popperJS.destroy();
        }
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
        _this.show = show
        _this.$nextTick(() => {
          if (_this.show) {
            _this.computePosition(_this.placement)
          }
        })
      }, delay)
    },
    /**
     * 计算显示位置
     */
    computePosition(placement) {
      const _this = this
      if (this.x && this.y) {
        this.style.left = this.x + 'px'
        this.style.top = this.y + 'px'
        return
      }
      // 使用popover.js 对popover进行定位
      if (_this.popperJS && this.popperJS.destroy) {
        _this.popperJS.destroy();
      }
      let popover = document.getElementById(`be_popover_${_this._uid}`)
      _this.popperJS = new PopperJS(_this.triggerDom, popover, {
        placement: placement
      });
      this.popperJS.onCreate(cbData => {
        this.place = popover.getAttribute('x-placement')
        /** 提交触发 显示跟新 事件
         * @event update
         * @param {Boolean} 当前显示状态
         */
        _this.$emit('update', _this.show)
      })
    },
    /**
     * 遍历dom树，找到合适的trigger元素
     * @param root
     * @return {*}
     */
    matchDom(root) {
      for (let i = 0; i < root.childNodes.length; i++) {
        let node = root.childNodes[i];
        let triggerWidth = Number(window.getComputedStyle(node).width.split('px')[0])
        let triggerHeight = node.getBoundingClientRect().height
        if (triggerWidth !== 0 || triggerHeight !== 0 && (node.nodeType !== 3) && (node.nodeType !== 8) && (node.nodeName !== 'SCRIPT')) {
          return node;
          break
        } else {
          return this.matchDom(node)
        }
      }
    },
    /**
     * 设置箭头
     */
    setArrow() {
      let popover = document.getElementById(`be_popover_${this._uid}`)
      if (popover) {
        this.place = popover.getAttribute('x-placement')
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
    if (this.width) {
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
        this.setArrow()
      }
      window.onscroll = () => {
        this.setArrow()
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