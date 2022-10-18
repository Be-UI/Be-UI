/*
 * @be-notification.vue
 * @deprecated 公共的通知组件
 * @author czh
 * @update (czh 2021/6/7)
 */

import { computed, defineComponent, reactive, ref, h, getCurrentInstance,PropType } from 'vue'
import {BeIcon} from '@be-ui/components'
import {INotfiy, INotifyOption} from './be-notification-type'
import {getUuid} from "packages/utils/utils";

export default defineComponent({
  name: 'BeNotification',
  components: { BeIcon },
  props: {
    option: {
      type: Object as PropType<INotifyOption>,
      default: () => {
        return {
          isShow: false, // private
          style: {}, // private
          close: false, // √
          placementSelf: '', // private
          titles: '', // √
          customClass: '', // √
          msgType: 'info', // √
          offsetTop: 0, // √
          offsetBottom: 0, // √
          placement: 'topRight', //√
          bodyRender: null, //√
          iconPreRender: null, // √
          closeRender: null, // √
          description: '', //√
          duration: 4500, // √
          loading: false, // √
          key: '', //√
          //关闭回调方法
          onClose: null, // √
          //点击回调方法
          onClick: null, // √
        }
      },
    },
    compType: {
      type: String,
      default: 'notification',
    },
  },
  setup(props) {
    const internalInstance = getCurrentInstance() as INotfiy
    const option = ref(props.option)
    let timer = 0
    const isLoading = ref<boolean>(props.option?.loading)
    /************************************** 根據方向 進行位置偏移設置******************************/
    const offsetTopStyle = computed(() => option.value.offsetTop)
    if (
      option.value.placementSelf === 'topLeft' ||
      option.value.placementSelf === 'topRight' ||
      option.value.placementSelf === 'topCenter'
    ) {
      option.value.style = { top: offsetTopStyle.value + 'px' }
    }

    const offsetBottomStyle = computed(() => option.value.offsetBottom)
    if (
      option.value.placementSelf === 'bottomLeft' ||
      option.value.placementSelf === 'bottomRight'
    ) {
      option.value.style = { bottom: offsetBottomStyle.value + 'px' }
    }

   const placementStyle = computed(() => option.value.placement)
    option.value.placementSelf = placementStyle.value
    if (
      option.value.placementSelf === 'bottomLeft' ||
      option.value.placementSelf === 'bottomRight'
    ) {
      option.value.style = { bottom: option.value.offsetBottom + 'px' }
    }
    if (
      option.value.placementSelf === 'topLeft' ||
      option.value.placementSelf === 'topRight' ||
      option.value.placementSelf === 'topCenter'
    ) {
      option.value.style = { top: option.value.offsetTop + 'px' }
    }
    /************************************** 處理 點擊 關閉事件******************************/
    const selfEvent = reactive({
      onClose: props.option.onClose,
      onClick: props.option.onClick,
    })
    /**
     * 關閉方法
     * @param event
     */
    const close = (event: Event | null): void => {
      event && event.stopPropagation()
      // 刪除緩存的組件實例，調整位置.关闭销毁
      props.option.closeNotify(internalInstance, false, true)
    }
    /**
     * 點擊關閉方法
     * @param event
     */
   const handleClickClose = (event: Event | null): void => {
      clearTimer()
      close(event)
    }
    /**
     * 點擊方法
     * @param event
     */
    const onClick = (event: Event | null): void => {
      selfEvent.onClick && selfEvent.onClick(event)
    }
    /************************************** 自動關閉定時器 方法******************************/
    /**
     * 關閉定時器清除方法
     */
      const clearTimer = () => {
      clearTimeout(timer)
      timer = 0
    }
    /**
     * 開啓定時關閉方法
     */
    const startTimer = () => {
      if (option.value.duration > 0) {
        timer = window.setTimeout(() => {
          close(null)
        }, option.value.duration) //sad
      }
    }
    /************************************** 動畫類設置方法******************************/
    const containerClass = ref('')
    /**
     * 動畫類設置方法
     */
    const setAnimate = () => {
      const classStr = `be-${props.compType} be-${props.compType}__${option.value.msgType} be-${
        props.compType
      }__${option.value.placement} 
      ${option.value.customClass ? option.value.customClass : ''}`
      containerClass.value = classStr
      if (
        option.value.placement === 'bottomRight' ||
        (option.value.placement === 'topRight' && !option.value.isUpdate)
      ) {
        containerClass.value =
          classStr + ` be-${props.compType}-animation-right-in be-${props.compType}__bottom`
      }
      if (
        option.value.placement === 'bottomLeft' ||
        (option.value.placement === 'topLeft' && !option.value.isUpdate)
      ) {
        containerClass.value =
          classStr + ` be-${props.compType}-animation-left-in be-${props.compType}__top`
      }
      if (option.value.placement === 'topCenter' && !option.value.isUpdate) {
        containerClass.value =
          classStr + ` be-${props.compType}-animation-top-center-in be-${props.compType}__top`
      }
    }
    setAnimate()
    /************************************** 組件主dom渲染方法 ******************************/
    const uid = internalInstance?.uid || getUuid()
    /**
     * 渲染組件主體dom方法
     * @param h
     */
    const renderBody = function (h: any) {
      const evt = {
        onClick: (event: Event) => handleClickClose(event),
      }
      return h(
        <div
          class={`be-${props.compType}--container be-${props.compType}--container__${option.value.placement}`}>
          <div class={`be-${props.compType}--title`}>
            <div class={`be-${props.compType}--head`} id={`be_${props.compType}_head${uid}`}>
              <div>
                {isLoading.value ? (
                  <BeIcon
                    icon="loading"
                    spin
                    customClass={`icon__${option.value.msgType}`}></BeIcon>
                ) : option.value.iconPreRender ? (
                  option.value.iconPreRender
                ) : (
                  <BeIcon
                    icon={`${option.value.msgType}`}
                    customClass={`icon__${option.value.msgType}`}></BeIcon>
                )}
                <span class={`txt__${option.value.msgType}`}>{option.value.titles}</span>
              </div>
              {/**@slot 弹窗头部按钮**/}
              <div id={`be_${props.compType}_close_icon${uid}`}>
                {option.value.closeRender ? (
                  option.value.closeRender
                ) : option.value.close ? (
                  <BeIcon icon="deleteIc" {...evt}></BeIcon>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          {/**@slot 弹窗主体**/}
          {props.compType === 'notification' ? (
            <div class={`be-${props.compType}--body`}>
              {option.value.bodyRender ? (
                option.value.bodyRender()
              ) : (
                <p class={`be-${props.compType}--description`}>{option.value.description}</p>
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      )
    }
    return () => {
      // 清楚定時器
      clearTimer()
      // 開啓定時器
      startTimer()
      return (
        <div
          key={`be_${props.compType}${uid}`}
          style={option.value.style}
          onClick={event => {
            onClick(event)
          }}
          class={containerClass.value}
          id={`be_${props.compType}${uid}`}>
          {option.value.isShow ? renderBody.call(this, h) : ''}
        </div>
      )
    }
  },
})
