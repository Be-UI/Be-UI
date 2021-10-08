import {computed, defineComponent, getCurrentInstance, nextTick, onMounted} from "vue";
import '../../../assets/style/be-button.scss';
import {IButtonInst} from "./be-button";

export default defineComponent({

    name: "BeButton",
    props: {
        /**
         * 按钮大小 （完成）
         * @values 'mini' | 'medium' | 'large'
         */
        size: {
            type: String,
            default: 'medium'
        },
        /**
         * 按钮圆角 （完成）
         */
        round: {
            type: [Number, String],
            default: 2
        },
        /**
         * 定义情感颜色 （完成）
         * @values 'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'
         */
        type: {
            type: String,
            default: 'default'
        },
        /**
         * 开启图标按钮（完成）
         */
        isIcon: {
            type: Boolean,
            default: false
        },
        /**
         * 自定义样式类（完成）
         */
        customClass: {
            type: String,
            default: ''
        },
        /**
         * loading 按钮
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * 禁用 （完成）
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * 边框 （完成）
         */
        bordered: {
            type: Boolean,
            default: false
        },
        /**
         * 透明 （完成）
         */
        ghost: {
            type: Boolean,
            default: false
        },
        /**
         * flex显示 （完成）
         */
        flex: {
            type: Boolean,
            default: false
        },
        /**
         * 虚线 （完成）
         */
        dashed: {
            type: Boolean,
            default: false
        },
        /**
         * 前置图标 （完成）
         */
        preIcon: {
            type: String,
            default: ''
        },
        /**
         * 后置图标 （完成）
         */
        nextIcon: {
            type: String,
            default: ''
        },
    },
    setup(props,ctx){
        const internalInstance = getCurrentInstance() as IButtonInst
        const btnStyle =  computed(()=>{
            return {
                'background': props.ghost ? 'transparent !important' : '',
                'cursor': props.disabled ? "not-allowed" : "pointer",
                'border-style': props.dashed ? "dashed" : "solid",
                'border-radius': `${props.round}px`,
                'display': props.flex ? "flex" : "",
            }
        })
        const borderStyle =  computed(()=>{
            return props.bordered ? "__border" : ""
        })
        const disabledStyle =  computed(()=>{
            return (props.disabled || props.loading) ? "be-button__inner__disabled" : ""
        })
        const preIconStyle =  computed(()=>{
            if(props.loading){ return 'refresh'}
            if(props.preIcon){
                return props.preIcon
            }else{
                return ''
            }
        })
        const nextIconStyle =  computed(()=>{
            if(props.nextIcon){
                if(props.loading){
                    return ''
                }else{
                    return props.nextIcon
                }
            }else{
                return ''
            }
        })
        return {
            uid:internalInstance.uid,
            btnStyle,
            borderStyle,
            disabledStyle,
            preIconStyle,
            nextIconStyle,
            //listeners,

        }
    },
    render(){
        const preIconRender = !this.preIcon ? ''
            :(<be-icon icon={this.preIconStyle} spin = {this.loading} custom-class={`be-button-preIcon be-button-preIcon__${this.type}`}> </be-icon>);

        const nextIconRender = !this.nextIcon ? ''
            :(<be-icon icon={this.nextIconStyle} custom-class={`be-button-nextIcon be-button-nextIcon__${this.type}`}> </be-icon>);

        return (
            <button type = "button"
                    {...this.$attrs}
                    style={this.btnStyle}
                    id={ `be_button_${this.uid}` }
                    class={`
                    be-button 
                    be-button__inner ${this.disabledStyle} 
                    be-button__${this.size} 
                    be-button__${this.type}${this.borderStyle} 
                    ${this.customClass}`}
                    disabled={this.disabled || this.loading}>
                    <div class="be-button-body" style="margin: 0 auto;display: flex">
                        {preIconRender}
                        <div class='be-button-slot' >{this.$slots.default()}</div>
                        {nextIconRender}
                    </div>
            </button>
        )
    },


})


