/*
* be-dialog.vue
* @deprecated 可拖拽弹窗
* @author czh
* @create (czh 2021/5/8)
* @update (czh 2021/5/8)
*/
<template>
  <div :class="dialogModels" v-if="isShow"></div>
  <transition name="dialog-fade">
  <div class="be-dialog" v-if="isShow">
      <div class="be-dialog-container"
           :id="`be_dialog_container$this._uid`"
           v-drag="{isDrag:isDrag}"
           :class="customClassStyle">
        <div class="be-dialog-title">
          <div class="be-dialog-contanter-head" :id="`be_head$this._uid`">
            <span>{{ titles }}</span>
            <!-- @slot 弹窗头部按钮 -->
            <div class="be-dialog-close">
              <slot name="headerIcon">
                <be-icon icon='delete' @click="close"></be-icon>
              </slot>
            </div>
          </div>
        </div>
        <div class="be-dialog-body">
          <!-- @slot 弹窗主体-->
          <div class="be-dialog-body__inner">
            <slot name="body"></slot>
          </div>
        </div>
        <div :class="`be-dialog-footer be-dialog-footer__${layout}`">
          <!-- @slot 弹窗底部-->
          <slot name="footer">
            <be-button type="primary"
                       bordered
                       round="3"
                       @click="confirm"
                       customClass="be-dialog-footer-btn">确定
            </be-button>
          </slot>
        </div>
      </div>
  </div>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  ref, computed, onMounted, onUnmounted
} from "vue";
import {dragDirective} from '../../../utils/direactives/custom-direactives/drag-directives';

/**
 * 可拖拽、放大、缩小弹窗
 */
export default defineComponent({
  name: "BeDialog",
  directives: {drag: dragDirective},
  props: {
    /**
     * 是否拖拽 （完成）
     */
    'isDrag': {
      type: Boolean,
      default: true
    },
    /**
     * 标题 （完成）
     */
    'titles': {
      type: String,
      default: ''
    },
    /**
     * 弹窗显示（完成）
     */
    'isShow': {
      type: Boolean,
      default: false
    },
    /**
     * 自定义样式类（完成）
     */
    'customClass': {
      type: String,
      default: ''
    },
    /**
     * 是否开启遮罩层（完成）
     */
    'isOpenModal': {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启esc退出 （完成）
     */
    'escExit': {
      type: Boolean,
      default: false
    },
    /**
     * 底部布局 （完成）
     */
    'layout': {
      type: String,
      default: 'center'
    }
  },
  setup(props, ctx) {
    const customClassStyle = computed(() => props.customClass)
    /**
     * 关闭组件
     */
    const confirm = (): void => {
      if (ctx.attrs.onConfirm) {
        /** 弹窗确认事件
         * @event close
         */
        ctx.emit('confirm')
      } else {
        close()
      }
    }
    /**
     * 关闭组件
     */
    const close = (): void => {
      if (ctx.attrs.onClose) {
        /** 弹窗关闭事件
         * @event close
         */
        ctx.emit('close')
      } else {
        ctx.emit('update:isShow', false)
      }
    }
    /**
     * 键盘esc 退出的监听
     */
    const listenerEscExitFunc = (): void => {
      if (props.escExit) {
        document.onkeydown = (e) => {
          if (e && e.key === 'Esc') {
            /** esc按键弹窗关闭事件
             * @event escCb
             */
            ctx.emit('escCb')
            close()
          }
        }
      }
    }
    /**
     * 键盘esc退出的监听取消
     */
    const removeEscExitFunc = (): void => {
      document.onkeydown = null
    }
    const dialogModels = ref('')
    // 开启遮罩与键盘监听
    onMounted(() => {
      if (props.isOpenModal) {
        dialogModels.value = 'be-dialog-modal'
      }
      listenerEscExitFunc()
    })
    onUnmounted(() => {
      removeEscExitFunc()
    })
    return {
      dialogModels,
      customClassStyle,
      close,
      confirm,
    }
  }
})
</script>

<style lang="scss">
@import "../../../assets/style/be-dialog";
</style>