/*
* @be-message-box.vue
* @deprecated
* @author czh
* @update (czh 2021/6/7)
*/

<script type="text/jsx">
const renderBox = function (h) {
    return (
            <div class={this.containerstyle}
                 id={`be_message_box_container${this._uid}`}
                 v-drag={{isDrag: this.isDrag}}>
                <div class="be-message-box-title">
                    <div class="be-message-box-head"
                         id={`be_message_box_head${this._uid}`}>
                        <div>
                            {this.iconPreRender ? this.iconPreRender() :
                                <i class={`el-icon-${this.msgType} icon-${this.msgType}`}></i>}
                            <span class={`text-${this.msgType}`}>{this.titles}</span>
                        </div>
                        {/**@slot 弹窗头部按钮**/}
                        <div>
                            {this.iconNextRender ? this.iconNextRender() :
                                <i class="el-icon-close" onClick={() => this.close()}></i>}
                        </div>
                    </div>
                </div>
                {/**@slot 弹窗主体**/}
                <div class='be-message-box-body'>
                    {this.bodyRender ? this.bodyRender() : ''}
                </div>
                {/**@slot 弹窗底部**/}
                <div class={`be-message-box-footer be-message-box-footer__${this.footerType}`}>
                    {this.footerRender ? this.footerRender() :
                        <button class={`be-button be-button__mini be-button__${this.msgType}`}
                                onClick={() => this.confirmFunc()}>
                            知道了
                        </button>
                    }
                </div>
            </div>
    )
}
export default {
    name: "BeMessageBox",
    data(){
      return {
          containerClass:''
      }
    },
    props: {
        /**
         * 是否拖拽(完成)
         */
        'isDrag': {
            type: Boolean,
            default: false
        },
        /**
         * 标题(完成)
         */
        'titles': {
            type: String,
            default: ''
        },
        /**
         * 是否显示(完成)
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
         * 是否开启遮罩层 (完成)
         */
        'isOpenModal': {
            type: Boolean,
            default: true
        },
        /**
         * 情感类型 (完成)
         * @values warning、info、success、error
         */
        'msgType': {
            type: String,
            default: 'warning'
        },
        /**
         * 底部类型 (完成)
         * @values right、center
         */
        'footerType': {
            type: String,
            default: 'center'
        },

        /**
         * 底部渲染
         */
        'footerRender': {
            type: Function,
            default: null,
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
         * 标题后置置图标渲染
         */
        'iconNextRender': {
            type: Function,
            default: null,
        }
    },
    computed: {
        containerstyle() {
            return this.containerClass
        },
        openModal(){
            return this.isOpenModal
        }
    },
    watch:{
        openModal(nVal){
            if(nVal){
                this.dialogModels = 'be-modal'
            }else{
                this.dialogModels = ''
            }
        }
    },
    methods: {
        /**
         * 关闭方法，销毁组件
         */
        close() {
            /** close事件
             * @event close
             */
            this.$selfEvent.close && this.$selfEvent.close()
            if (this.$el && this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el);
            }
            // 销毁组件
            this.$destroy()
        },
        /**
         * 确认按钮方法
         */
        confirmFunc() {
            this.$selfEvent.confirm && this.$selfEvent.confirm()
            this.close()
        },
        /**
         * 设置动画
         */
        setAnimate(){
            let _this = this
            let containerClass = `be-message-box-container`
            let animateClass = ' be-fadeOut'
            _this.containerClass = containerClass + animateClass
            setTimeout(()=>{
                _this.containerClass = containerClass + ' be-fadeIn'
            },100)

        }
    },

    mounted() {
        if (this.isOpenModal) {
            this.dialogModels = 'be-modal'
        }
        this.setAnimate()
    },
    render(h) {
         if (this.isShow) {
            return (
            <div
                class={`be-message-box be-message-box__${this.msgType} ${this.dialogModels} ${this.customClass}`}>
                {
                    renderBox.call(this,h)
                }
            </div>
            )
        }

    }
}
</script>

<style scoped lang="scss">
@import './be-message-box.scss';

.be-fadeIn{
    opacity: 1;

}

.be-fadeOut {
    opacity: 0;
    -webkit-transform: scaleY(0);
    transform: scaleY(0)
}
</style>