/*
* @be-notification.vue
* @deprecated 公共的通知组件
* @author czh
* @update (czh 2021/6/7)
*/

<script type="text/jsx">
const renderBody = function (h) {
    return (
        <div class={`be-notification-container be-notification-container__${this.option.placement}`}>
            <div class="be-notification-title">
                <div class="be-notification-head"
                     id={`be_notification_head${this._uid}`}>
                    <div>
                        {this.option.iconPreRender ? this.option.iconPreRender() :
                            <i class={`el-icon-${this.option.msgType} icon-${this.option.msgType}`}></i>}
                        <span class={`text-${this.option.msgType}`}>{this.option.titles}</span>
                    </div>
                    {/**@slot 弹窗头部按钮**/}
                    <div>
                        {this.option.closeRender ? this.option.closeRender() :
                            <i class="el-icon-close" onClick={(event) => this.close(event)}></i>}
                    </div>
                </div>
            </div>
            {/**@slot 弹窗主体**/}
            <div class='be-notification-body'>
                {this.option.bodyRender ? this.option.bodyRender() :
                    <p class="be-notification-description">
                        {this.option.description}
                    </p>
                }
            </div>
        </div>
    )
}
export default {
    name: "BeNotification",
    data() {
        return {
            option:{
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
                timer:null,//
            },
            containerClass:''
        }
    },
    computed: {
        offsetTopStyle() {
            return this.option.offsetTop
        },
        offsetBottomStyle() {
            return this.option.offsetBottom
        },
        placementStyle() {
            return this.option.placement
        },
    },
    watch: {
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
                    this.option.style = {bottom:this.option.offsetBottom}
                }
                if (this.option.placementSelf === 'topLeft' || this.option.placementSelf === 'topRight') {
                    this.option.style = {top:this.option.offsetTop}
                }
            },
            deep: true,
            immediate: true
        },
    },
    methods: {
        /**
         * 关闭方法，销毁组件
         * @param {Event} event - 事件对象
         */
        close(event) {
            event && event.stopPropagation()
            /** close事件
             * @event close
             */
            this.$selfEvent.onClose && this.$selfEvent.onClose(event)
            if (this.$el && this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el);
            }
            this.$closeNotify(this,true)
            // 销毁组件
            this.$destroy()
        },
        /**
         * 确认按钮方法
         * @param {Event} event - 事件对象
         */
        onClick(event) {
            this.$selfEvent.onClick && this.$selfEvent.onClick(event)
        },
        /**
         * 銷毀定時器
         */
        clearTimer() {
            clearTimeout(this.timer);
            this.timer = null
        },
        /**
         * 定時器 關閉銷毀組件
         */
        startTimer() {
            if (this.option.duration > 0) {
                this.timer = setTimeout(() => {
                    this.close();
                }, this.option.duration);
            }
        },
        /**
         * 设置动画
         */
        setAnimate(){
            let classStr = `be-notification be-notification__${this.option.msgType} be-notification__${this.option.placement} ${this.option.customClass}`
            let Animate = ` be-notification__Animate_enter_${this.option.placement}`
            this.containerClass = classStr + Animate
            /*setTimeout(()=>{
              if (this.option.placement === 'bottomRight' || this.option.placement === 'topRight') {
                this.containerClass = `be-notification be-notification__${this.option.msgType} be-notification__${this.option.placement} ${this.option.customClass} be-notification-fade-enter-right`
              }
              if (this.option.placement === 'bottomLeft' || this.option.placement === 'topLeft') {
                this.containerClass = `be-notification be-notification__${this.option.msgType} be-notification__${this.option.placement} ${this.option.customClass} be-notification-fade-enter-left`
              }
            },100)*/
        }
    },
    created(){
        this.setAnimate()
    },
    mounted() {
        this.startTimer()
    },
    render(h) {
        this.clearTimer()
        this.startTimer()
        return (
            <div
                style={this.option.style}
                onClick={(event)=>{this.onClick(event)}}
                class={this.containerClass} id={`be_notification${this._uid}`}>
                <transition name="be-fade-in-linear">
                    {this.option.isShow ? renderBody.call(this, h) : ''}
                </transition>
            </div>
        )
    }
}
</script>

<style   lang="scss">
@import './be-notification.scss';
/*.be-notification__Animate_enter_bottomRight,
.be-notification__Animate_enter_topRight{
    right: 0;
    opacity: 0;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
}
.be-notification__Animate_enter_bottomLeft,
.be-notification__Animate_enter_topLeft{
    left: 0;
    opacity: 0;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
}*/




</style>