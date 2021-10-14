/*
* be-input.vue
* @deprecated 带输入建议远程搜索的输入框
* @author czh
* @create (czh 2021/5/31)
* @update (czh 2021/6/2)
*/
<template>
    <div
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
                ref="beInputInner"
                :disabled="disabled"
                :placeholder="placeholder"
                :value="modelValue"
                :maxlength="maxlength"
                :type="inputType"
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
            <!--建议输入下拉框-->
            <!--      <be-input-select
                      @select="handleSelect"
                      :select-style="selectStyle"
                      :select-list="selectList"
                      :is-show="isShowSelect">
                  </be-input-select>-->
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
import {computed, defineComponent, nextTick, ref, useAttrs, watch} from "vue";
import BeIcon from "../../svg-icon/src/be-icon.vue";


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
    // components: {BeInputSelect},
    data() {
        return {
            /* // 输入建议显示
             isShowSelect: false,
             // 输入建议数据列表
             selectList: {data: [], label: '', keyName: ''},
             // 输入建议数据列表缓存
             selectListCache: {data: [], label: '', keyName: ''},
             // 输入建议数据列表
             selectStyle: {left: '0px', top: '0px'},
             // 输入建议loading标志
             loading: false,
             // 输入建议展开时，input样式
             expandStyle: '',
             // 输入建议数据列表最大显示长度
             maxStrLen: 0,
             // 事件触发dom
             eventDom: null*/

        }
    },
    // 原生属性 readonly autocomplete name max min step autofocus form
    props: {
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
        /**
         * 输入建议方法
         */
        fetchSuggestions: {
            type: Function,
            default: null
        },

        // autosize 待定
    },


    setup(props, ctx) {
        const attrs = useAttrs()

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
            // 根据输入值处理输入建议
            /* if (val === '') {
                 this.getSuggestions(val)
             } else {
                 let arr = []
                 this.selectList.data = []
                 this.selectListCache.data.forEach(res => {
                     if (res[_this.selectListCache.label].indexOf(val) >= 0) {
                         arr.push(res)
                     }
                 })
                 this.$set(this.selectList, 'data', arr)
             }*/
            ctx.emit('update:modelValue', val)
            ctx.emit('input', val)
        }

        /**
         * blur 事件处理方法
         * @param {String | Number} value - 更新后值
         */
        const handleBlur = (value: string | number): void => {
            //this.expandStyle = ''
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
            //const $eventDom = event.target.parentElement
            //this.eventDom = $eventDom
            // 触发输入建议回调方法，获取下拉列表数据
            /*if (Object.prototype.toString.call(this.fetchSuggestions) === '[object Function]') {
                this.loading = true
                this.getSuggestions(value)
                // 设置显示位置,宽度
                this.computedPositon($eventDom)
                this.isShowSelect = true
            }*/
            /** 输入 focus 事件
             * @event focus
             * @param {String | Number} value - 输入框值
             */
            ctx.emit('focus', value,event)
        }
        /**
         * 处理按键
         */
        const handleKeydown = (e) => {
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
        const beInputInner = ref(null)
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

        /**************************************** 输入建议下拉框方法 *******************************************/
        /**
         * 计算输入建议下拉框位置
         * @param {Element} $eventDom - 输入建议下拉框dom
         */
        /*const computedPositon = ($eventDom:HTMLElement):void => {
            if(!$eventDom)return
            this.selectStyle.width = Number(window.getComputedStyle($eventDom).width.split('px')[0]) + 'px'
            this.selectStyle.top = $eventDom.getBoundingClientRect().top + Number(window.getComputedStyle($eventDom).height.split('px')[0]) + 2 + 'px'
            this.selectStyle.left = $eventDom.getBoundingClientRect().left + 'px'
            this.expandStyle = this.expandStyle + 'be-input-body__expand'
        }*/
        /**
         * 获取输入建议
         * @param {String | Number} value - 更新后值
         */
        /*const getSuggestions = (value:string | number):void =>{
            this.fetchSuggestions(value, (data, label, keyName) => {
                // 设置输入建议数据
                this.selectList = {data, label, keyName}
                this.selectListCache = JSON.parse(JSON.stringify(this.selectList))
                this.loading = false
            })
        }*/
        /**
         * 下拉搜索选择事件方法
         * @param {String | Number} value - 更新后值
         * @param {Number} index - 点击索引
         */
        /*const handleSelect = (value:string | number, index:number):void => {
            /!** 输入建议选中 select 事件
             * @event select
             * @param {Object} value - 点击对象数据
             * @param {Number} index - 点击的对应列表索引
             *!/
            this.$emit('select', value, index)
            this.closeDisplay()
        }*/
        /**
         * 关闭输入建议下拉框，方法由指令v-click-outside调用
         */
        /*const closeDisplay = ():void =>{
            this.isShowSelect = false
        }*/
        return {
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
    },
    methods: {},
    mounted() {
        /* window.onresize = () => {
           const $eventDom = this.eventDom
           // 设置显示位置,宽度
           this.computedPositon($eventDom)
         }*/

    },
    beforeDestroy() {
        /* this.eventDom = null
         window.onresize = null*/
    }
})
</script>

<style lang='scss'>
@import '../../../assets/style/be-input';

</style>
