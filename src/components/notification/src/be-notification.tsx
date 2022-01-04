/*
* @be-notification.vue
* @deprecated 公共的通知组件
* @author czh
* @update (czh 2021/6/7)
*/

import {computed, defineComponent, reactive, ref, h, getCurrentInstance} from 'vue'
import BeIcon from '../../svg-icon/src/be-icon.vue'
import {INotfiy} from './be-notification-type'

export default defineComponent({
    name: "BeNotification",
    props: {
        option: {
            type: Object,
            default: {
                isShow: false,// private
                style: {},// private
                close: false,// √
                placementSelf: '',// private
                titles: '',// √
                customClass: '',// √
                msgType: 'info',// √
                offsetTop: 0,// √
                offsetBottom: 0,// √
                placement: 'topRight',//√
                bodyRender: null,//√
                iconPreRender: null,// √
                closeRender: null,// √
                description: '',//√
                duration: 4500,// √
                loading: false,// √
                key: '',//√
                timer: 0,// private
                //关闭回调方法
                onClose: null,// √
                //点击回调方法
                onClick: null// √
            }
        },
        compType: {
            type: String,
            default: 'notification'
        }
    },
    setup(props, ctx) {
        const internalInstance = getCurrentInstance() as INotfiy
        let option = props.option
        const isLoading = ref<boolean>(props.option?.loading)
        /************************************** 根據方向 進行位置偏移設置******************************/
        const offsetTopStyle = computed(() => option.offsetTop)
        if (option.placementSelf === 'topLeft' || option.placementSelf === 'topRight' || option.placementSelf === 'topCenter') {
            option.style = {top: offsetTopStyle.value + 'px'}
        }

        const offsetBottomStyle = computed(() => option.offsetBottom)
        if (option.placementSelf === 'bottomLeft' || option.placementSelf === 'bottomRight') {
            option.style = {bottom: offsetBottomStyle.value + 'px'}
        }

        const placementStyle = computed(() => option.placement)
        option.placementSelf = placementStyle.value
        if (option.placementSelf === 'bottomLeft' || option.placementSelf === 'bottomRight') {
            option.style = {bottom: option.offsetBottom + 'px'}
        }
        if (option.placementSelf === 'topLeft' || option.placementSelf === 'topRight' || option.placementSelf === 'topCenter') {
            option.style = {top: option.offsetTop + 'px'}
        }
        /************************************** 處理 點擊 關閉事件******************************/
        let selfEvent = reactive({
            onClose: props.option.onClose,
            onClick: props.option.onClick
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
            clearTimeout(option.timer);
            option.timer = 0
        }
        /**
         * 開啓定時關閉方法
         */
        const startTimer = () => {
            if (option.duration > 0) {
                option.timer = setTimeout(() => {
                    close(null);
                }, option.duration);//sad
            }
        }
        /************************************** 動畫類設置方法******************************/
        let containerClass = ref('')
        /**
         * 動畫類設置方法
         */
        const setAnimate = () => {
            let classStr = `be-${props.compType} be-${props.compType}__${option.msgType} be-${props.compType}__${option.placement} ${option.customClass}`
            containerClass.value = classStr
            if (option.placement === 'bottomRight' || option.placement === 'topRight' && !option.isUpdate) {
                containerClass.value = classStr + ` be-${props.compType}-animation-right-in be-${props.compType}-bottom`
            }
            if (option.placement === 'bottomLeft' || option.placement === 'topLeft' && !option.isUpdate) {
                containerClass.value = classStr + ` be-${props.compType}-animation-left-in be-${props.compType}-top`
            }
            if (option.placement === 'topCenter' && !option.isUpdate) {
                containerClass.value = classStr + ` be-${props.compType}-animation-top-center-in be-${props.compType}-top`
            }
        }
        setAnimate()
        /************************************** 組件主dom渲染方法 ******************************/
        let uid = internalInstance.uid
        /**
         * 渲染組件主體dom方法
         * @param h
         */
        const renderBody = function (h: any) {
            const evt = {
                onClick: (event: Event) => close(event)
            }
            return (
                h(<div class={`be-${props.compType}-container be-${props.compType}-container__${option.placement}`}>
                    <div class={`be-${props.compType}-title`}>
                        <div class={`be-${props.compType}-head`}
                             id={`be_${props.compType}_head${uid}`}>
                            <div>
                                {isLoading.value ?
                                    <BeIcon icon='loading' spin customClass={`icon-${option.msgType}`}></BeIcon> :
                                    option.iconPreRender ? option.iconPreRender :
                                        <BeIcon icon={`${option.msgType}`}
                                                customClass={`icon-${option.msgType}`}></BeIcon>}
                                <span class={`txt-${option.msgType}`}>{option.titles}</span>
                            </div>
                            {/**@slot 弹窗头部按钮**/}
                            <div id={`be_${props.compType}_close_icon${uid}`}>
                                {option.closeRender ? option.closeRender :
                                    option.close ? <BeIcon icon="deleteIc" {...evt} ></BeIcon> : ''}
                            </div>
                        </div>
                    </div>
                    {/**@slot 弹窗主体**/}
                    {props.compType === 'notification' ?
                        <div class={`be-${props.compType}-body`}>
                            {option.bodyRender ? option.bodyRender() :
                                <p class={`be-${props.compType}-description`}>
                                    {option.description}
                                </p>
                            }
                        </div> : ''}
                </div>)
            )
        }
        return () => {
            // 清楚定時器
            clearTimer()
            // 開啓定時器
            startTimer()
            return (
                <div
                    style={option.style}
                    onClick={(event) => {
                        onClick(event)
                    }}
                    class={containerClass.value} id={`be_${props.compType}${uid}`}>
                    {option.isShow ? renderBody.call(this, h) : ''}
                </div>
            )
        }
    }
})
