<template>
  <div
    v-if="show"
    :class="`be-message-box be-message-box__${msgType} ${dialogModels} ${customClass}`"
  >
    <div
      :id="`be_message_box_container${_uid}`"
      v-drag="{ isDrag: isDrag }"
      :class="containerstyle.value"
    >
      <div class="be-message-box--title">
        <div
          :id="`be_message_box_head${_uid}`"
          class="be-message-box--head"
        >
          <div v-if="iconPreRender">
            {{ iconPreRender() }}
            <span :class="`text-${msgType}`">{{ titles }}</span>
          </div>
          <div v-if="!iconPreRender">
            <be-icon
              :icon="`${msgType}`"
              :class="`icon-${msgType}`"
            />
            <span :class="`text-${msgType}`">{{ titles }}</span>
          </div>

          <div class="be-message-box--head-close">
            <div
              v-if="iconNextRender"
              @click="close"
            >
              {{ iconNextRender() }}
            </div>
            <be-icon
              v-if="!iconNextRender"
              icon="deleteIc"
              @click="close"
            />
          </div>
        </div>
      </div>

      <div class="be-message-box--body">
        {{ bodyRender ? bodyRender() : '' }}
      </div>

      <div :class="`be-message-box--footer be-message-box--footer__${footerType}`">
        <div
          v-if="footerRender"
          @click="confirmFunc()"
        >
          {{ footerRender() }}
        </div>
        <div v-if="!footerRender">
          <button
            :class="`be-button be-button__mini be-button__${msgType} ${msgType==='info' ? 'border' : ''}`"
            @click="confirmFunc()"
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, watch, defineComponent, ref, getCurrentInstance, onMounted} from 'vue'
import {IMsg} from './be-message-box-type'
import {dragDirective} from '@be-ui/utils/direactives/drag-directives'
import {BeIcon} from '@be-ui/components'

export default defineComponent({
  name: 'BeMessageBox',
  directives: {drag: dragDirective},
  components: {
    BeIcon,
  },
  props: {
    /**
     * 标题(完成)
     */
    titles: {
      type: String,
      default: '',
    },
    /**
     * 是否显示(完成)
     */
    isShow: {
      type: Boolean,
      default: false,
    },
    /**
     * 自定义样式类
     */
    customClass: {
      type: String,
      default: '',
    },
    /**
     * 是否开启遮罩层 (完成)
     */
    isOpenModal: {
      type: Boolean,
      default: true,
    },
    /**
     * 情感类型 (完成)
     * @values warning、info、success、error
     */
    msgType: {
      type: String,
      default: 'info',
    },
    /**
     * 底部类型 (完成)
     * @values right、center
     */
    footerType: {
      type: String,
      default: 'center',
    },
    /**
     * 底部渲染
     */
    footerRender: {
      type: Function,
      default: null,
    },
    /**
     * 主体渲染
     */
    bodyRender: {
      type: Function,
      default: null,
    },
    /**
     * 标题前置图标渲染
     */
    iconPreRender: {
      type: Function,
      default: null,
    },
    /**
     * 标题后置置图标渲染
     */
    iconNextRender: {
      type: Function,
      default: null,
    },

    /**
     * 是否拖拽(完成)
     */
    isDrag: {
      type: Boolean,
      default: false,
    },

    /**
     * 关闭事件
     */
    onConfirm: {
      type: Function,
      default: null,
    },
    /**
     * 确认事件
     */
    onClose: {
      type: Function,
      default: null,
    },
  },
  setup(props) {
    const internalInstance = getCurrentInstance() as IMsg
    const _uid = internalInstance?.uid
    const show = ref(props.isShow)

    /************************************** 事件方法相关 ******************************/
    /**
     * 关闭方法，销毁组件
     */
    const close = (): void => {
      /** close事件
       * @event close
       */
      props.onClose && props.onClose()
    }
    /**
     * 确认按钮方法
     */
    const confirmFunc = (): void => {
      // this.$selfEvent.confirm && this.$selfEvent.confirm()
      props.onConfirm && props.onConfirm()
      show.value = false
    }
    /************************************** 监听设置遮罩 ******************************/
    const dialogModels = ref('')
    /**
     * 监听设置遮罩
     */
    const openModal = computed(() => props.isOpenModal)
    watch(openModal, val => {
      if (val) {
        dialogModels.value = 'be-modal'
      } else {
        dialogModels.value = ''
      }
    })
    /************************************** 样式设置相关 ******************************/
    const containerClass = ref('')
    const containerstyle = computed(() => containerClass.value)
    /**
     * 设置动画、样式类
     */
    const setAnimate = (): void => {
      const containerCls = `be-message-box--container`
      const animateClass = ' be-fadeOut'
      containerClass.value = containerCls + animateClass
      setTimeout(() => {
        containerClass.value = containerCls + ' be-fadeIn'
      }, 100)
    }

    onMounted((): void => {
      if (props.isOpenModal) {
        dialogModels.value = 'be-modal'
      }
      setAnimate()
    })
    return {
      show,
      _uid,
      dialogModels,
      confirmFunc,
      close,
      containerstyle,
    }
  }
})
</script>

<style scoped>

</style>