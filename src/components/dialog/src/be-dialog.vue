/*
* be-dialog.vue
* @deprecated 可拖拽弹窗
* @author czh
* @create (czh 2021/5/8)
* @update (czh 2021/5/8)
*/
<template>
    <div class="be-dialog" :class="dialogModels" v-show="isShow">
      <transition name="be-zoom-in-top">
      <div class="be-dialog-container"
           v-show="isShow"
           :id="`be_dialog_container$this._uid`"
           v-drag="{isDrag:isDrag}"
           :class="customClassStyle">
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
            <be-button type="primary" bordered>确定</be-button>
          </slot>
        </div>
      </div>
      </transition>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    ref, computed, onMounted, onUnmounted
} from "vue";
import {dragDirective } from '../../../utils/direactives/custom-direactives/drag-directives';
/**
 * 可拖拽、放大、缩小弹窗
 */
export default defineComponent({
  name: "BeDialog",
  directives: { drag:dragDirective },
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
  setup(props,ctx){
      const customClassStyle = computed(()=> props.customClass)

      const offsetData = reactive({})
      /**
       * 获取 v-drag 移动后的位置数据
       * @param {Object} coordinateData - 移动路径数据
       */
      const getCoordinate = (coordinateData):void =>{
          offsetData = coordinateData
      }
      /**
       * 关闭组件
       */
      const close = ():void =>{
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
      const listenerEscExitFunc = ():void =>{
          if (props.escExit) {
              document.onkeydown = (e) => {
                  if (e && e.keyCode === 27) {
                      /** esc按键弹窗关闭事件
                       * @event escCb
                       */
                      ctx.emit('escCb')
                  }
              }
          }
      }
      /**
       * 键盘esc退出的监听取消
       */
      const removeEscExitFunc = ():void =>{
          document.onkeydown = null
      }
      const dialogModels = ref('')
      // 开启遮罩与键盘监听
      onMounted(()=>{
          if (props.isOpenModal) {
              dialogModels.value = 'be-dialog-modal'
          }
          listenerEscExitFunc()
      })
      onUnmounted(()=>{
          removeEscExitFunc()
      })
      return {
          dialogModels,
          customClassStyle,
          close,
      }
  }
})
</script>

<style lang="scss">
@import "../../../assets/style/be-dialog";
</style>