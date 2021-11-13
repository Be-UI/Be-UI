/*
* @be-notification.vue
* @deprecated 公共的通知组件
* @author czh
* @update (czh 2021/6/7)
*/

import {computed,defineComponent, reactive, ref,h,getCurrentInstance} from 'vue'
import BeIcon from '../../svg-icon/src/be-icon.vue'
import '../../../assets/style/be-notification.scss';
import {INotfiy} from './be-notification-type'
export default defineComponent({
    name: "BeNotification",
    props:{
      option:{
          type: Object,
          default: {
              isShow:false,
              style: {},
              close:false,
              placementSelf:'',
              titles:'',//
              customClass:'',//
              msgType:'warning',//
              offsetTop:0,//
              offsetBottom:0,//
              placement:'topRight',//
              bodyRender:null,//
              iconPreRender:null,//
              closeRender:null,//
              description:'',//
              duration:4500,//
              key:'',//
              timer:0,//
              //关闭回调方法
              onClose: null,
              //点击回调方法
              onClick:null
          }
      }
    },
    setup(props,ctx){
        const internalInstance  = getCurrentInstance() as INotfiy
        let option = props.option

        /************************************** 根據方向 進行位置偏移設置******************************/
        const offsetTopStyle = computed(() => option.offsetTop)
        if (option.placementSelf === 'topLeft' || option.placementSelf === 'topRight') {
            option.style = {top:offsetTopStyle.value + 'px'}
        }

        const offsetBottomStyle = computed(() => option.offsetBottom)
        if (option.placementSelf === 'bottomLeft' || option.placementSelf === 'bottomRight') {
            option.style = {bottom:offsetBottomStyle.value + 'px'}
        }

        const placementStyle = computed(() => option.placement)
        option.placementSelf = placementStyle.value
        if (option.placementSelf === 'bottomLeft' || option.placementSelf === 'bottomRight') {
            option.style = {bottom:option.offsetBottom + 'px'}
        }
        if (option.placementSelf === 'topLeft' || option.placementSelf === 'topRight') {
            option.style = {top:option.offsetTop + 'px'}
        }
        /************************************** 處理 點擊 關閉事件******************************/
        let selfEvent = reactive( {
            onClose: props.option.onClose,
            onClick: props.option.onClick
        })
        /**
         * 關閉方法
         * @param event
         */
        const close = (event:Event | null):void=>{
            event && event.stopPropagation()
            // 關閉回調
            selfEvent.onClose && selfEvent.onClose(event)
            // 刪除緩存的組件實例，調整位置.关闭销毁
            props.option.closeNotify(internalInstance,false,true)
        }
        /**
         * 點擊方法
         * @param event
         */
        const onClick = (event:Event | null):void=>{
            selfEvent.onClick && selfEvent.onClick(event)
        }
        /************************************** 自動關閉定時器 方法******************************/
        /**
         * 關閉定時器清除方法
         */
        const clearTimer = ()=>{
            clearTimeout(option.timer);
            option.timer = 0
        }
        /**
         * 開啓定時關閉方法
         */
        const startTimer = ()=>{
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
        const setAnimate = ()=>{
            let classStr = `be-notification be-notification__${option.msgType} be-notification__${option.placement} ${option.customClass}`
            containerClass.value = classStr
            if (option.placement === 'bottomRight' || option.placement === 'topRight') {
                containerClass.value = classStr + ' be-notification-animation-right-in be-notification-bottom'
            }
            if (option.placement === 'bottomLeft' || option.placement === 'topLeft') {
                containerClass.value = classStr + ' be-notification-animation-left-in be-notification-top'
            }
        }
        setAnimate()
        /************************************** 組件主dom渲染方法 ******************************/
        let uid = internalInstance.uid
        /**
         * 渲染組件主體dom方法
         * @param h
         */
        const renderBody = function (h:any) {
            const evt = {
                onClick:(event:Event) => close(event)
            }
            return (
                h(<div class={`be-notification-container be-notification-container__${option.placement}`}>
                    <div class="be-notification-title">
                        <div class="be-notification-head"
                             id={`be_notification_head${uid}`}>
                            <div>
                                {option.iconPreRender ? option.iconPreRender() :
                                    <BeIcon icon={`${option.msgType}`} customClass={`icon-${option.msgType}`}></BeIcon>}

                                <span class={`text-${option.msgType}`}>{option.titles}</span>
                            </div>
                            {/**@slot 弹窗头部按钮**/}
                            <div>
                                {option.closeRender ? option.closeRender() :
                                    option.close ? <BeIcon icon="delete" {...evt}></BeIcon> :''}
                            </div>
                        </div>
                    </div>
                    {/**@slot 弹窗主体**/}
                    <div class='be-notification-body'>
                        {option.bodyRender ? option.bodyRender() :
                            <p class="be-notification-description">
                                {option.description}
                            </p>
                        }
                    </div>
                </div>)
            )
        }
     return ()=>{
         // 清楚定時器
         clearTimer()
         // 開啓定時器
         startTimer()
         return (
             <div
                 style={option.style}
                 onClick={(event)=>{onClick(event)}}
                 class={containerClass.value} id={`be_notification${uid}`}>
                 <transition name="be-fade-in-linear">
                     {option.isShow ? renderBody.call(this,h) : ''}
                 </transition>
             </div>
         )
     }
    }
})
