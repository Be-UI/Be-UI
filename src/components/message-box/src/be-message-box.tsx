import {
    computed,
    watch,
    defineComponent,
    ref,
    getCurrentInstance,
    onMounted,
    defineAsyncComponent
} from 'vue'
import '../../../assets/style/be-message-box.scss';
import '../../../assets/style/be-button.scss';
import {IMsg} from "./be-message-box-type";
import {dragDirective} from "../../../utils/direactives/custom-direactives/drag-directives";

export default defineComponent({
    name: "BeMessageBox",
    directives: {drag: dragDirective},
    components: {
        'be-icon': defineAsyncComponent(() => import("../../svg-icon")),
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
        },
        /**
         * 关闭事件
         */
        'onConfirm': {
            type: Function,
            default: null,
        },
        /**
         * 确认事件
         */
        'onClose': {
            type: Function,
            default: null,
        }
    },
    setup(props, ctx) {
        const internalInstance = getCurrentInstance() as IMsg
        const _uid = internalInstance.uid
        let show = ref(false)
        show.value = props.isShow
        /************************************** 事件方法相关 ******************************/
        /**
         * 关闭方法，销毁组件
         */
        const close = (): void => {
            show.value = false
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
            close()
        }
        /************************************** 监听设置遮罩 ******************************/
        const dialogModels = ref('')
        /**
         * 监听设置遮罩
         */
        const openModal = computed(() => props.isOpenModal)
        watch(openModal, (val) => {
            if (val) {
                dialogModels.value = 'be-modal'
            } else {
                dialogModels.value = ''
            }
        });
        /************************************** 样式设置相关 ******************************/
        const containerClass = ref('')
        const containerstyle = computed(() => containerClass.value)
        /**
         * 设置动画、样式类
         */
        const setAnimate = (): void => {
            let containerCls = `be-message-box-container`
            let animateClass = ' be-fadeOut'
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
        return () => {
            if (show.value) {
                return (
                    <div
                        class={`be-message-box be-message-box__${props.msgType} ${dialogModels.value} ${props.customClass}`}>
                        <div class={containerstyle.value}
                             v-drag={{isDrag: props.isDrag}}
                             id={`be_message_box_container${_uid}`}>
                            <div class="be-message-box-title">
                                <div class="be-message-box-head"
                                     id={`be_message_box_head${_uid}`}>
                                    <div>
                                        {props.iconPreRender ? props.iconPreRender() :
                                            <be-icon icon={`${props.msgType}`}
                                                     class={`icon-${props.msgType}`}></be-icon>}
                                        <span class={`text-${props.msgType}`}>{props.titles}</span>
                                    </div>
                                    {/**@slot 弹窗头部按钮**/}
                                    <div>
                                        {props.iconNextRender ?
                                            <div onClick={() => close()}>{props.iconNextRender()}</div> :
                                            <be-icon icon="delete" onClick={() => close()}></be-icon>}
                                    </div>
                                </div>
                            </div>
                            {/**@slot 弹窗主体**/}
                            <div class='be-message-box-body'>
                                {props.bodyRender ? props.bodyRender() : ''}
                            </div>
                            {/**@slot 弹窗底部**/}
                            <div class={`be-message-box-footer be-message-box-footer__${props.footerType}`}>
                                {props.footerRender ?
                                    <div onClick={() => confirmFunc()}>{props.footerRender()}</div> :
                                    <button class={`be-button be-button__mini be-button__${props.msgType}`}
                                            onClick={() => confirmFunc()}>
                                        知道了
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
})
