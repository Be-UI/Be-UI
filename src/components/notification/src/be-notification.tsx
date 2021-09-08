/*
* @be-notification.vue
* @deprecated 公共的通知组件
* @author czh
* @update (czh 2021/6/7)
*/

import {computed, defineComponent, reactive, ref,watch,h,onBeforeUpdate} from 'vue'
import '../../../assets/style/be-notification.scss';
export default defineComponent({
    name: "BeNotification",
    props:{
      option:{
          type: Object,
          default: {
              isShow:false,
              style: {},
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
        let uid = '1234'
        let option = props.option
        let containerClass = ref('')
        let selfEvent = reactive( {
            onClose: ():void=> {},
            onClick: ():void=> {}
        })
        const offsetTopStyle = computed(() => option.offsetTop)
        watch(offsetTopStyle,(offsetTopNval:number) => {
            if (option.placementSelf === 'topLeft' || option.placementSelf === 'topRight') {
                option.style = {top:offsetTopNval + 'px'}
            }
        })
        const offsetBottomStyle = computed(() => option.offsetBottom)
        watch(offsetBottomStyle,(offsetBottomNval:number) => {
            if (option.placementSelf === 'bottomLeft' || option.placementSelf === 'bottomRight') {
                option.style = {bottom:offsetBottomNval + 'px'}
            }
        })
        const placementStyle = computed(() => option.placement)
        watch(placementStyle,(placementNval:string) => {
            option.placementSelf = placementNval
            if (option.placementSelf === 'bottomLeft' || option.placementSelf === 'bottomRight') {
                option.style = {bottom:option.offsetBottom + 'px'}
            }
            if (option.placementSelf === 'topLeft' || option.placementSelf === 'topRight') {
               option.style = {top:option.offsetTop + 'px'}
            }
        })

        const close = (event:Event | null):void=>{
            event && event.stopPropagation()
            /** close事件
             * @event close
             */

            selfEvent.onClose && selfEvent.onClose(event)
            this.$closeNotify(this,false,true)
            if (this.$el && this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el);
            }
            // 销毁组件
            this.$destroy()
        }
        const onClick = (event:Event | null):void=>{
            selfEvent.onClick && selfEvent.onClick(event)
        }
        const clearTimer = ()=>{
            clearTimeout(option.timer);
            option.timer = 0
        }
        const startTimer = ()=>{
            console.log(option.duration)
            if (option.duration > 0) {
                option.timer = setTimeout(() => {
                    close(null);
                }, option.duration);//sad
            }
        }
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
        const renderBody = function (h) {
            return (
                <div class={`be-notification-container be-notification-container__${option.placement}`}>
                    <div class="be-notification-title">
                        <div class="be-notification-head"
                             id={`be_notification_head${uid}`}>
                            <div>
                                {option.iconPreRender ? option.iconPreRender() :
                                    <i class={`el-icon-${option.msgType} icon-${option.msgType}`}></i>}
                                <span class={`text-${option.msgType}`}>{option.titles}</span>
                            </div>
                            {/**@slot 弹窗头部按钮**/}
                            <div>
                                {option.closeRender ? option.closeRender() :
                                    <i class="el-icon-close" onClick={(event) => this.close(event)}></i>}
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
                </div>
            )
        }
        debugger
        setAnimate()
        onBeforeUpdate(()=>{
            debugger
        })


     return ()=>{
         return (
             <div
                 style={option.style}
                 onClick={(event)=>{onClick(event)}}
                 class={containerClass.value} id={`be_notification${uid}`}>
                 <transition name="be-fade-in-linear">
                     {option.isShow ? renderBody.call(this, h) : ''}
                 </transition>
             </div>
         )
     }
    },
   /* render(h) {
        //this.clearTimer()
        //this.startTimer()
        let op = this.option
        debugger
        if(h==='w') op = this.props.option
        return (
            <div
                style={op.style}
                onClick={(event)=>{this.onClick(event)}}
                class={this.containerClass} id={`be_notification${this.uid}`}>
                <transition name="be-fade-in-linear">
                    {/!*{op.isShow ? renderBody.call(this, h) : ''}*!/}
                    { op.isShow ? 'renderBody.call(this, h)' : ''}
                </transition>
            </div>
        )
    },*/
    /*watch: {
        offsetTopStyle: {
            handler: function (nVal) {
                if (this.option.placementSelf === 'topLeft' || this.option.placementSelf === 'topRight') {
                    this.option.style = {top:nVal + 'px'}
                }
            },
            deep: true,
            immediate: true
        },
        offsetBottomStyle: {
            handler: function (nVal) {
                if (this.option.placementSelf === 'bottomLeft' || this.option.placementSelf === 'bottomRight') {
                    this.option.style = {bottom:nVal + 'px'}
                }
            },
            deep: true,
            immediate: true
        },
        placementStyle: {
            handler: function (nVal) {
                this.option.placementSelf = nVal
                if (this.option.placementSelf === 'bottomLeft' || this.option.placementSelf === 'bottomRight') {
                    this.option.style = {bottom:this.option.offsetBottom + 'px'}
                }
                if (this.option.placementSelf === 'topLeft' || this.option.placementSelf === 'topRight') {
                    this.option.style = {top:this.option.offsetTop + 'px'}
                }
            },
            deep: true,
            immediate: true
        },
    },*/
   /* methods: {
        /!**
         * 关闭方法，销毁组件
         * @param {Event} event - 事件对象
         *!/
        close(event) {

        },
        /!**
         * 确认按钮方法
         * @param {Event} event - 事件对象
         *!/
        onClick(event) {
            this.$selfEvent.onClick && this.$selfEvent.onClick(event)
        },
        /!**
         * 銷毀定時器
         *!/
        clearTimer() {
            clearTimeout(this.timer);
            this.timer = null
        },
        /!**
         * 定時器 關閉銷毀組件
         *!/
        startTimer() {
            if (this.option.duration > 0) {
                this.timer = setTimeout(() => {
                    this.close();
                }, this.option.duration);//sad
            }
        },
        /!**
         * 设置动画
         *!/
        setAnimate(){
            let classStr = `be-notification be-notification__${this.option.msgType} be-notification__${this.option.placement} ${this.option.customClass}`
            this.containerClass = classStr
            if (this.option.placement === 'bottomRight' || this.option.placement === 'topRight') {
              this.containerClass = classStr + ' be-notification-animation-right-in be-notification-bottom'
            }
            if (this.option.placement === 'bottomLeft' || this.option.placement === 'topLeft') {
                this.containerClass = classStr + ' be-notification-animation-left-in be-notification-top'
            }
        }
    },
    created(){
        this.setAnimate()
    },
    mounted() {
    },*/

})
