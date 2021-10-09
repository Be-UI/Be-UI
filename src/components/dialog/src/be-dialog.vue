/*
* be-dialog.vue
* @deprecated 可拖拽弹窗
* @author czh
* @create (czh 2021/5/8)
* @update (czh 2021/5/8)  v-drag="{isDrag:isDrag}"
*/
<template>
    <div class="be-dialog" :class="dialogModels" v-show="isShow">
      <transition name="be-zoom-in-top">
      <div class="be-dialog-container"
           v-show="isShow"
           :id="`be_dialog_container$this._uid`"
           :class="customClassStyle"
          >
        <div class="be-dialog-title">
          <div class="be-dialog-contanter-head" :id="`be_head$this._uid`">
            <span>{{ titles }}</span>
            <!-- @slot 弹窗头部按钮 -->
            <slot name="headerIcon">
              <be-icon icon='delete' @click="close" custom-class="be-dialog-close"></be-icon>
            </slot>
          </div>
        </div>
        <div class="be-dialog-body">
          <!-- @slot 弹窗主体-->
          <div class="be-dialog-body__inner">
            <slot name="body">

            </slot>
          </div>
        </div>
        <div :class="`be-dialog-footer be-dialog-footer__${layout}`">
          <!-- @slot 弹窗底部-->
          <slot name="footer">
            <button>确定</button>
          </slot>
        </div>
      </div>
      </transition>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    defineAsyncComponent,
    reactive,
    watchEffect,
    ref
} from "vue";
/**
 * 可拖拽、放大、缩小弹窗
 */
export default defineComponent({
  name: "BeDialog",
  data() {
    return {
      animate: '',
      offsetData: {},
      dialogModels: ''
    }
  },
  props: {
    /**
     * 是否拖拽
     */
    'isDrag': {
      type: Boolean,
      default: true
    },
    /**
     * 标题
     */
    'titles': {
      type: String,
      default: ''
    },
    /**
     * 是否只是查看
     */
    'isShow': {
      type: Boolean,
      default: false
    },
    /**
     * 自定义样式类
     */
    'customClass': {
      type: String,
      default: ''
    },
    /**
     * 是否开启遮罩层
     */
    'isOpenModal': {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启esc退出
     */
    'escExit': {
      type: Boolean,
      default: false
    },
    /**
     * 是否开启esc退出
     */
    'layout': {
      type: String,
      default: 'center'
    }
  },
  methods: {
    /**
     * 获取 v-drag 移动后的位置数据
     * @param {Object} coordinateData - 移动路径数据
     */
    getCoordinate(coordinateData) {
      this.offsetData = coordinateData
    },
    /**
     * 关闭组件
     */
    close() {

      if (this.$listeners.close) {
        /** 弹窗关闭事件
         * @event close
         */
        this.$emit('close')
      } else {
        this.$emit('update:isShow', false)
      }
    },

    /**
     * 键盘esc 退出的监听
     */
    listenerEscExitFunc() {
      if (this.escExit) {
        document.onkeydown = (e) => {
          if (e && e.keyCode === 27) {
            /** esc按键弹窗关闭事件
             * @event escCb
             */
            this.$emit('escCb')
          }
        }
      }
    },
    /**
     * 键盘esc退出的监听取消
     */
    removeEscExitFunc() {
      document.onkeydown = null
    }
  },
  computed: {
    customClassStyle() {
      return this.customClass
    }
  },
  mounted() {
    if (this.isOpenModal) {
      this.dialogModels = 'be-dialog-modal'
    }
    this.listenerEscExitFunc()
  },
  beforeDestroy() {
    this.removeEscExitFunc()
  }
})
</script>

<style lang="scss">
@import "../../../assets/style/be-dialog";
</style>