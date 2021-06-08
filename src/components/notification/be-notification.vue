/*
* @be-notification.vue
* @deprecated 公共的通知组件
* @author czh
* @update (czh 2021/6/7)
*/

<script type="text/jsx">
const renderBody = function (h) {
    return (
        <div class={`be-notification-container be-notification-container__${this.placement} ${this.customClass}`}>
            <div class="be-notification-title">
                <div class="be-notification-head"
                     id={`be_notification_head${this._uid}`}>
                    <div>
                        {this.iconPreRender ? this.iconPreRender() :
                            <i class={`el-icon-${this.msgType} icon-${this.msgType}`}></i>}
                        <span class={`text-${this.msgType}`}>{this.titles}</span>
                    </div>
                    {/**@slot 弹窗头部按钮**/}
                    <div>
                        {this.closeRender ? this.closeRender() :
                            <i class="el-icon-close" onClick={(event) => this.close(event)}></i>}
                    </div>
                </div>
            </div>
            {/**@slot 弹窗主体**/}
            <div class='be-notification-body'>
                {this.bodyRender ? this.bodyRender() :
                    <p class="be-notification-description">
                        {this.description}
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
            style: {},
            placementSelf:''
        }
    },
    props: {
        /**
         * 标题
         */
        'titles': {
            type: String,
        },
        /**
         * 是否显示
         */
        'isShow': {
            type: Boolean,
            default: false
        },
        /**
         * offsetTop 消息从顶部弹出时，距离顶部的位置，单位像素
         */
        'offsetTop': {
            type: String,
            default: '24px'
        },
        /**
         * 消息从底部弹出时，距离底部的位置，单位像素
         */
        'offsetBottom': {
            type: String,
            default: '24px'
        },
        /**
         * 自定义样式类
         */
        'customClass': {
            type: String,
        },
        /**
         * 情感类型
         * @values warning、info、success、error
         */
        'msgType': {
            type: String,
            default: 'warning'
        },
        /**
         * 主体渲染
         */
        'bodyRender': {
            type: Function,
            default: null,
        },
        /**
         * 标题前置图标渲染
         */
        'iconPreRender': {
            type: Function,
            default: null,
        },
        /**
         * 关闭按钮渲染
         */
        'closeRender': {
            type: Function,
            default: null,
        },
        /**
         * 弹出位置，可选
         * @values topLeft、topRight、bottomLeft、bottomRight
         */
        'placement': {
            type: String,
            default: 'topRight',
        },
        /**
         * 内容
         */
        'description': {
            type: String,
        }
    },
    computed: {

        offsetTopStyle() {
            return this.offsetTop
        },
        offsetBottomStyle() {
            return this.offsetBottom
        },
        placementStyle() {
            return this.placement
        },
    },
    watch: {
        offsetTopStyle: {
            handler: function (nVal) {
                if (this.placementSelf === 'topLeft' || this.placementSelf === 'topRight') {
                    this.style = {top:nVal}
                }
            },
            deep: true,
            immediate: true
        },
        offsetBottomStyle: {
            handler: function (nVal) {
                if (this.placementSelf === 'bottomLeft' || this.placementSelf === 'bottomRight') {
                    this.style = {bottom:nVal}
                }
            },
            deep: true,
            immediate: true
        },
        placementStyle: {
            handler: function (nVal) {
                this.placementSelf = nVal
                if (this.placementSelf === 'bottomLeft' || this.placementSelf === 'bottomRight') {
                    this.style = {bottom:this.offsetBottom}
                }
                if (this.placementSelf === 'topLeft' || this.placementSelf === 'topRight') {
                    this.style = {top:this.offsetTop}
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
            // 销毁组件
            this.$destroy()
        },
        /**
         * 确认按钮方法
         * @param {Event} event - 事件对象
         */
        onClick(event) {
            this.$selfEvent.onClick && this.$selfEvent.onClick(event)
        }
    },
    mounted() {
    },
    beforeUpdate() {
        /*this.$nextTick(()=>{
          const preHeight = Number(window.getComputedStyle(this.$el.children[0]).height.split('px')[0])
          const preBottom = Number(window.getComputedStyle(this.$el).bottom.split('px')[0])
          if(this.style.bottom && (preBottom < preHeight )){
            this.style.bottom = preBottom + preHeight + 20 + 'px'
              debugger
          }
        })*/
    },
    render(h) {
        return (
            <div
                style={this.style}
                onClick={(event)=>{this.onClick(event)}}
                class={`be-notification be-notification__${this.msgType} be-notification__${this.placement}`}
                id={`be_notification${this._uid}`}>
                <transition name="be-fade-in-linear">
                    {this.isShow ? renderBody.call(this, h) : ''}
                </transition>
            </div>
        )
    }
}
</script>

<style scoped lang="scss">
@import './be-notification.scss';

.be-zoom-in-top-enter-active, .be-zoom-in-top-leave-active {
    opacity: 1;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    -webkit-transition: opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
    transition: opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
    transition: transform .3s cubic-bezier(.23, 1, .32, 1), opacity .3s cubic-bezier(.23, 1, .32, 1);
    transition: transform .3s cubic-bezier(.23, 1, .32, 1), opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
    -webkit-transform-origin: center top;
    transform-origin: center top
}

.be-zoom-in-top-enter, .be-zoom-in-top-leave-active {
    opacity: 0;
    -webkit-transform: scaleY(0);
    transform: scaleY(0)
}
</style>