<template>
  <be-loading :show="loading"
              :customRender="customRenderLoading"
              :isBackground='false'
              :round="round">
    <div class="be-button"
         v-on="listeners"
         :class='`be-button__${size} be-button__${type}${borderStyle} ${customClass}`'
         :style="btnStyle">
      <div class="be-button-body" style="margin: 0 auto;display: flex">
        <be-icon :icon="preIconStyle" v-if="preIcon"
                 :custom-class="`be-button-preIcon be-button-preIcon__${type}`">
        </be-icon>
        <button type="button"
                v-if="!isIcon"
                :id="`be_button_${this._uid}`"
                :style="btnStyles"
                :class='`be-button__inner ${disabledStyle}`'
                :disabled="disabled">
          <slot v-if="!loading"></slot>
        </button>
        <be-icon :icon="nextIconStyle" v-if="nextIcon"
                 :custom-class="`be-button-nextIcon be-button-nextIcon__${type}`">
        </be-icon>
      </div>
    </div>
  </be-loading>
</template>

<script>
export default {
  name: "BeButton",
  data(){
    return {
      btnStyles:{}
    }
  },
  props: {
    /**
     * 按钮大小
     * @values 'mini' | 'medium' | 'large'
     */
    size: {
      type: String,
      default: 'medium'
    },
    /**
     * 按钮圆角
     */
    round: {
      type: [Number, String],
      default: 2
    },
    /**
     * 定义情感颜色
     * @values 'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'
     */
    type: {
      type: String,
      default: 'default'
    },
    /**
     * 开启图标按钮
     */
    isIcon: {
      type: Boolean,
      default: false
    },
    /**
     * 自定义样式类
     */
    customClass: {
      type: String,
      default: ''
    },
    /**
     * loading 按钮
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * 禁用
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 边框
     */
    bordered: {
      type: Boolean,
      default: false
    },
    /**
     * 透明
     */
    ghost: {
      type: Boolean,
      default: false
    },
    /**
     * flex显示
     */
    flex: {
      type: Boolean,
      default: false
    },
    /**
     * 虚线
     */
    dashed: {
      type: Boolean,
      default: false
    },
    /**
     * 前置图标
     */
    preIcon: {
      type: String,
      default: ''
    },
    /**
     * 后置图标
     */
    nextIcon: {
      type: String,
      default: ''
    },
  },
  computed: {
    btnStyle() {
      return {
        'background': this.ghost ? 'transparent !important' : '',
        'cursor': this.disabled ? "not-allowed" : "pointer",
        'border-style': this.dashed ? "dashed" : "solid",
        'border-radius': `${this.round}px`,
        'display': this.flex ? "flex" : "",
      }
    },
    borderStyle() {
      return this.bordered ? "__border" : ""
    },
    disabledStyle() {
      return this.disabled ? "be-button__inner__disabled" : ""
    },
    preIconStyle() {
      if(this.preIcon){
        if(this.loading){
          return ''
        }else{
          return this.preIcon
        }
      }else{
        return ''
      }
    },
    nextIconStyle() {
      if(this.nextIcon){
        if(this.loading){
          return ''
        }else{
          return this.nextIcon
        }
      }else{
        return ''
      }
    },
    listeners(){
      return this.disabled ? null : this.$listeners
    }
  },
  methods: {
    customRenderLoading() {
      return <be-icon icon="refresh" spin color="#ffffff" ></be-icon>
    },
  },
  mounted(){

  },
  beforeUpdate() {
      if(this.loading){
        const button = document.getElementById(`be_button_${this._uid}`)
        this.btnStyles = {
          'width':Number(window.getComputedStyle(button).width.split('px')[0]) + 'px'
        }
      }else{
        this.btnStyles = ''
      }
  }

}
</script>

<style lang="scss">
@import 'src/assets/style/be-button';
</style>