/*
* be-input.vue
* @deprecated 带输入建议远程搜索的输入框
* @author czh
* @create (czh 2021/5/31)
* @update (czh 2021/6/2)
*/
<template>
    <div
        :id="`be_input_${uid}`"
        :class="`
        be-input
        be-input__${size}
        ${disabled ? 'be-input__disabled ' :''}
        ${customClass}`">
        <!-- @slot 前置插槽-->
         <slot name="prev"></slot>
        <div class="be-input-body">
            <!--  <div class="be-input" v-click-outside="closeDisplay" :class="customClass">
                <div class="be-input-body" :class="expandStyle">-->
            <!--前置图标-->
            <be-icon @click="handleIcon('prev')" :icon="prevIcon" class="be-input-prevIcon"
                     v-if="prevIcon"></be-icon>
            <input
                :ref="beInputInner"
                :disabled="disabled"
                :placeholder="placeholder"
                :value="modelValue"
                :maxlength="maxlength"
                :type="inputType"
                :id="id"
                v-bind="attrs"
                @focus="handleFocus($event.target.value,$event)"
                @blur="handleBlur($event.target.value)"
                @change='handleChange'
                @keydown="handleKeydown"
                @input="handleInput($event.target.value)"
                :class="`be-input__inner ${disabled ? 'be-input__disabled' :''}`"/>
            <!--            @blur="handleBlur($event.target.value)"
                        @focus="handleFocus($event.target.value,$event)"-->
            <!--后置图标-->
            <be-icon @click="handleIcon('next')" :icon="nextIcon" class="be-input-nextIcon"
                     v-if="nextIcon"></be-icon>
            <!--清除按钮-->
            <be-icon @click="handleClear" icon="delete" class="be-input-icon be-input-close"
                     v-show="clearable"></be-icon>
            <!--密碼按鈕-->
            <be-icon @click="handlePassword" :icon="`${isPassWord ? 'no-eye' :'eye'}`"
                     class="be-input-icon be-input-password" v-show="showPassword"></be-icon>
        </div>
        <!-- @slot 后置插槽-->
        <slot name="next"></slot>
    </div>

</template>

<script lang="ts">
/**
 * 带输入建议远程搜索的输入框
 */
// import BeInputSelect from "./be-input-select";
import {computed, defineComponent, getCurrentInstance, nextTick, ref, useAttrs} from "vue";
import BeIcon from "../../svg-icon/src/be-icon.vue";
import {IInputInst} from "./be-input-type";


export default defineComponent({
    name: "BeInput",
    components: {BeIcon},
    emits: [
        'prevIconClick',
        'nextIconClick',
        'update:modelValue',
        'input',
        'change',
        'clear',
        'focus',
        'blur',
        'keydown',

        'mouseleave',
        'mouseenter',
    ],
    // 原生属性 readonly autocomplete name max min step autofocus form
    props: {
        /**
         * id
         */
        id:String,
        /**
         * 绑定值 （完成）
         */
        modelValue: {
            type: [String, Number],
            default: '',
        },
        /**
         * 自定义样式 （完成）
         */
        customClass: {
            type: String,
            default: ''
        },
        /**
         * 最大长度限制 （完成）
         */
        maxlength: {
            type: Number,
            default: null
        },
        /**
         * 输入框占位文本（完成）
         */
        placeholder: String,
        /**
         * 是否禁用（完成）
         */
        disabled: Boolean,
        /**
         * 是否可以清除（完成）
         */
        clearable: {
            type: Boolean,
            default: false
        },
        /**
         * 输入框类型（完成）
         */
        type: {
            type: String,
            default: 'text'
        },
        /**
         * 是否显示密码按鈕（完成）
         */
        showPassword: {
            type: Boolean,
            default: false
        },
        /**
         * 输入框尺寸，只在 type!="textarea" 时有效 medium / small / mini （完成）
         */
        size: String,
        /**
         * 前置icon类型（完成）
         */
        prevIcon: {
            type: String,
            default: ''
        },
        /**
         * 后置icon图标类型（完成）
         */
        nextIcon: {
            type: String,
            default: ''
        },


        /**
         * 输入框行数，只对 type="textarea" 有效
         */
        rows: {
            type: Number,
            default: 2
        },
        /**
         * input元素或textarea元素的style
         */
        inputStyle: {
            type: Object
        },

    },


    setup(props, ctx) {
        const attrs = useAttrs()
        const internalInstance = getCurrentInstance() as IInputInst
        const inputType = ref<string>(props.type)
        const isPassWord = ref<boolean>(props.type === 'password' ? true : false)
        const handlePassword = (): void => {
            isPassWord.value = !isPassWord.value
            if (!isPassWord.value) {
                inputType.value = 'text'
            } else {
                inputType.value = props.type
            }
        }


        /**
         * change 事件处理方法
         * @param { InputEvent } event - 更新后值
         */
        const handleChange = (event: Event): void => {
            const target = event.target as HTMLInputElement
            ctx.emit('change', target.value)
        }
        /**
         * input 事件处理方法，实现双向绑定
         * @param {String | Number} val - 更新后值
         */
        const handleInput = (val: string | number): void => {
             ctx.emit('update:modelValue', val)
             ctx.emit('input', val)
        }

        /**
         * blur 事件处理方法
         * @param {String | Number} value - 更新后值
         */
        const handleBlur = (value: string | number): void => {
            /** 输入 blur 事件
             * @event blur
             * @param {String | Number} value - 输入框值
             */
            ctx.emit('blur', value)
        }
        /**
         * focus 事件处理方法
         * @param {String | Number} value - 更新后值
         * @param {Event} event - 事件对象
         */
        const handleFocus = (value: string | number, event: Event): void => {
            ctx.emit('focus', value,event)
        }
        /**
         * 处理按键
         */
        const handleKeydown = (e:Event) => {
            ctx.emit('keydown', e)
        }
        /**
         * 输入框内容清除方法
         * @public
         */
        const handleClear = (): void => {
            handleInput('')
            ctx.emit('clear')
        }
        /**
         * 输入框前后icon点击方法
         * @param {String} type - 类别
         */
        const handleIcon = (type: string): void => {
            if (type === 'prev') {
                ctx.emit('prevIconClick')
            } else {
                ctx.emit('nextIconClick')
            }
        }
        /**************************************** 暴露对外的公共方法 *******************************************/
        const beInputInner = ref<any>(null)
        const inputOrTextarea = computed(() => {
            return beInputInner.value
        })
        /**
         * 手动聚焦方法
         * @public
         */
        const focus = (): void => {
            nextTick(() => {
               inputOrTextarea.value.focus()
            })
        }
        /**
         * 手动失焦方法
         * @public
         */
        const blur = (): void => {
          inputOrTextarea.value.blur()

        }
        /**
         * 手动选择文字方法
         * @public
         */
        const select = (): void => {
            inputOrTextarea.value.select()
        }
        return {
            uid: internalInstance.uid,
            attrs,
            beInputInner,
            inputOrTextarea,
            inputType,
            isPassWord,
            focus,
            select,
            handleKeydown,
            blur,
            handleChange,
            handlePassword,
            handleInput,
            handleIcon,
            handleClear,
            handleFocus,
            handleBlur
        }
    }
})
</script>

<style lang='scss'>
@import '../../../assets/style/be-input';

</style>
