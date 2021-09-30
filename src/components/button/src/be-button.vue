<template>
    <div class="be-button"
         :id="`be_button_container_${uid}`"
         :class='`be-button__${size} be-button__${type}${borderStyle} ${customClass}`'
         :style="btnStyle">
      <div class="be-button-body" style="margin: 0 auto;display: flex">
        <be-icon :icon="preIconStyle" v-if="preIcon"
                  :spin="loading"
                 :custom-class="`be-button-preIcon be-button-preIcon__${type}`">
        </be-icon>
        <button type="button"
                v-if="!isIcon"
                :id="`be_button_${uid}`"
                :style="btnStyle"
                :class='`be-button__inner ${disabledStyle}`'
                :disabled="disabled">
          <slot></slot>
        </button>
        <be-icon :icon="nextIconStyle" v-if="nextIcon"
                 :custom-class="`be-button-nextIcon be-button-nextIcon__${type}`">
        </be-icon>
      </div>
    </div>

</template>

<script lang="ts">
import {computed, defineComponent, getCurrentInstance, nextTick, onMounted} from "vue";
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
    setup(props){
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
            return props.disabled ? "be-button__inner__disabled" : ""
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
        const listeners =  computed(()=>{
            return internalInstance.attrs
        })
        onMounted((): void => {
            nextTick(()=>{
                let dom:HTMLElement | null= document.getElementById(`be_button_container_${internalInstance.uid}`)
                dom && dom.removeEventListener('click',listeners.value.onClick)
            })

            debugger
        })
        return {
            uid:internalInstance.uid,
            btnStyle,
            borderStyle,
            disabledStyle,
            preIconStyle,
            nextIconStyle,
            listeners,

        }
    },
    beforeUpdate() {
        /*if(this.loading){
          const button = document.getElementById(`be_button_${this._uid}`)
          this.btnStyle = {
            'width':Number(window.getComputedStyle(button).width.split('px')[0]) + 'px'
          }
        }else{
          this.btnStyle = ''
        }*/
    }

})
</script>

<style lang="scss">
@import 'src/assets/style/be-button';
</style>