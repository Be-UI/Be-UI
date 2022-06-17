/* * be-dialog.vue * @deprecated 可拖拽弹窗 * @author czh * @create (czh 2021/5/8) * @update (czh
2021/5/8) */
<template>
  <div
    v-if="isShow"
    :class="dialogModels"
  />
  <transition name="dialog-fade">
    <div
      v-if="isShow"
      class="be-dialog"
    >
      <div
        :id="`be_dialog_container${uid}`"
        v-drag="{ isDrag: isDrag }"
        class="be-dialog--container"
        :class="customClassStyle"
      >
        <div class="be-dialog--title">
          <div
            :id="`be_head${uid}`"
            class="be-dialog--container__head"
          >
            <span>{{ titles }}</span>
            <!-- @slot 弹窗头部按钮 -->
            <div class="be-dialog--icon__close">
              <slot name="headerIcon">
                <be-icon
                  icon="deleteIc"
                  custom-class="be-dialog--icon__close-btn"
                  @click="handleClose('btn')"
                />
              </slot>
            </div>
          </div>
        </div>
        <div class="be-dialog--body">
          <!-- @slot 弹窗主体-->
          <div class="be-dialog--body__inner">
            <slot />
          </div>
        </div>
        <div
          v-if="showFooter"
          :class="`be-dialog--footer be-dialog--footer__${layout}`"
        >
          <!-- @slot 弹窗底部-->
          <slot name="footer">
            <be-button
              type="primary"
              bordered
              round="3"
              custom-class="be-dialog--footer__btn"
              @click="handleConfirm"
            >
              确定
            </be-button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    nextTick,
    onMounted,
    onUnmounted,
    ref,
    watch,
  } from 'vue'
  import { dragDirective } from '@be-ui/utils/direactives/drag-directives'
  import {BeButton,BeIcon} from '@be-ui/components'


  /**
   * 可拖拽、放大、缩小弹窗
   */
  export default defineComponent({
    name: 'BeDialog',
    components: { BeIcon, BeButton },
    directives: { drag: dragDirective },
    props: {
      /**
       * 是否拖拽 （完成）
       */
      isDrag: {
        type: Boolean,
        default: false,
      },
      /**
       * 是否显示底部 （完成）
       */
      showFooter: {
        type: Boolean,
        default: true,
      },
      /**
       * 标题 （完成）
       */
      titles: {
        type: String,
        default: '',
      },
      /**
       * 弹窗显示（完成）
       */
      isShow: {
        type: Boolean,
        default: false,
      },
      /**
       * 自定义样式类（完成）
       */
      customClass: {
        type: String,
        default: '',
      },
      /**
       * 是否开启遮罩层（完成）
       */
      isOpenModal: {
        type: Boolean,
        default: true,
      },
      /**
       * 是否开启esc退出 （完成）
       */
      escExit: {
        type: Boolean,
        default: false,
      },
      /**
       * 底部布局 （完成）
       */
      layout: {
        type: String,
        default: 'center',
      },
    },
    emits: [
      'confirm', // 插槽下无效
      'close', // 插槽下无效
      'update:isShow',
      'escEvt',
    ],
    setup(props, ctx) {
      const customClassStyle = computed(() => props.customClass)
      const internalInstance = getCurrentInstance()
      /**
       * 关闭组件
       */
      const handleConfirm = (): void => {
        /** 弹窗确认事件
         * @event confirm
         */
        ctx.emit('confirm')
        handleClose()
      }
      /**
       * 关闭组件
       * @param {string} type 类型
       */
      const handleClose = (type?: string): void => {
        if (type === 'btn' || type === 'keyboard') {
          /** 弹窗关闭事件
           * @event close
           */
          ctx.emit('close')
        }
        ctx.emit('update:isShow', false)
      }
      const show = computed(() => props.isShow)
      watch(show, nVal => {
        if (nVal) {
          nextTick(() => {
            listenerEscExitFunc()
          })
        } else {
          removeEscExitFunc()
        }
      })
      /**
       * 键盘esc 退出的监听
       */
      const listenerEscExitFunc = (): void => {
        if (props.escExit) {
          document.body.onkeydown = e => {
            if (e && e.key === 'Escape') {
              /** esc按键弹窗关闭事件
               * @event escEvt
               */
              ctx.emit('escEvt')
              handleClose('keyboard')
            }
          }
        }
      }
      /**
       * 键盘esc退出的监听取消
       */
      const removeEscExitFunc = (): void => {
        document.body.onkeydown = null
      }
      const dialogModels = ref('')
      // 开启遮罩与键盘监听
      onMounted(() => {
        if (props.isOpenModal) {
          dialogModels.value = 'be-dialog--modal be-modal'
        }
        if (props.isShow) {
          listenerEscExitFunc()
        }
      })
      onUnmounted(() => {
        removeEscExitFunc()
      })
      return {
        dialogModels,
        customClassStyle,
        handleClose,
        handleConfirm,
        uid: internalInstance?.uid,
      }
    },
  })
</script>
