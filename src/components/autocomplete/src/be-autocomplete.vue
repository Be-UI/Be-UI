/*
* @be-autocomplete.vue
* @deprecated
* @author czh
* @update (czh 2021/10/13)
  点击触发、输入触发、自定义模板 √、远程加载
*/
<template>
<be-popover trigger="manual" placement="bottom"  ref="beInputPopover" :trigger-elm="`be_input_select_inner_${uid}`">
    <template #trigger>
        <be-input
            :id="`be_input_select_inner_${uid}`"
            v-bind="attrs"
            @change="handleChange"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @clear="handleClear"
            ref="beInputInner"
            @prevIconClick="handleIconClickPrev"
            @nextIconClick="handleIconClickNext"
            v-model="valInner">
            <template #prev>
                <slot name="prev"></slot>
            </template>
            <template #next>
                <slot name="next"></slot>
            </template>
        </be-input>
    </template>
    <transition name="dialog-fade">
        <be-input-select
            @select="handleSelect"
            :selectStyle="selectStyle"
            :select-list="selectList">
            <template v-slot:cus-temp="slotProps">
                <slot name="cus-temp" :item="slotProps.item"></slot>
            </template>
        </be-input-select>
    </transition>
</be-popover>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, onMounted, reactive, ref, useAttrs} from "vue";
import BePopover from "../../popover/src/be-popover.vue";
import BeInput from "../../input/src/be-input.vue";
import BeInputSelect from "../src/be-input-select.vue";
import {IInputInst, IInputSelectInst} from "../../input/src/be-input-type";
export default defineComponent({
    name: "BeAutocomplete",
    components: {BeInputSelect, BeInput, BePopover},
    emits: [
        'update:modelValue',
        'input',
        'change',
        'focus',
        'blur',
        'clear',
        'prevIconClick',
        'nextIconClick',

        'select',
    ],
    props: {
        /**
         * 绑定值 （完成）
         */
        modelValue: {
            type: [String, Number],
            default: '',
        },
    },
    setup(props,ctx){
        const attrs = useAttrs()
        const internalInstance = getCurrentInstance() as IInputInst
        const valInner = ref<string>('')

        /**
         * change 事件处理方法
         * @param { String | Number } value - 更新后值
         */
        const handleChange = (value :string | number): void => {
            ctx.emit('change', valInner.value)
        }
        /**
         * input 事件处理方法，实现双向绑定
         * @param {String | Number} val - 更新后值
         */
        const handleInput = (val: string | number): void => {
            ctx.emit('update:modelValue', valInner.value)
            ctx.emit('input', valInner.value)
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
            ctx.emit('blur', valInner.value)
        }
        let eventDom:HTMLElement | null = null
        /**
         * focus 事件处理方法
         * @param {String | Number} value - 更新后值
         * @param {Event} event - 事件对象
         */
        const handleFocus = (value: string | number, event: Event): void => {
            const $eventDom:HTMLElement |null = (event.target as HTMLInputElement).parentElement
            eventDom = $eventDom
            computedPositon($eventDom)
            ctx.emit('focus', valInner.value)
        }
        /**
         * 输入框内容清除方法
         * @public
         */
        const handleClear = (): void => {
            ctx.emit('clear')
        }
        /**
         * 输入框后icon点击方法
         */
        const handleIconClickPrev = (): void => {
            ctx.emit('prevIconClick')
        }
        /**
         * 输入框后icon点击方法
         */
        const handleIconClickNext = (): void => {
            ctx.emit('nextIconClick')
        }
        /**************************************** 输入建议下拉框方法 *******************************************/
        let selectStyle = reactive({width:'0px'})
        /**
         * 计算输入建议下拉框位置
         * @param {Element} $eventDom - 输入建议下拉框dom
         */
        const computedPositon = ($eventDom:HTMLElement | null):void => {
            if(!$eventDom)return
            selectStyle.width = Number(window.getComputedStyle($eventDom).width.split('px')[0]) + 'px'
        }
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
         * @param {Object } value - 选中后值
         * @param {Number} index - 点击索引
         */
        const handleSelect = (value: any, index: number):void=>{
            /** 输入建议选中 select 事件
             * @event select
             * @param {Object} value - 点击对象数据
             * @param {Number} index - 点击的对应列表索引
             */
            valInner.value = value.label
            handleChange(valInner.value)
            ctx.emit('select', value, index)
            const curInst = internalInstance.refs.beInputPopover as IInputSelectInst
            curInst.close()

        }
        /**
         * 关闭输入建议下拉框，方法由指令v-click-outside调用
         */
        /*const closeDisplay = ():void =>{
            this.isShowSelect = false
        }*/
        onMounted(()=>{
            const $eventDom:HTMLElement | null = eventDom
            // 设置显示位置,宽度
            computedPositon($eventDom)
        })
        const selectList = reactive([
            {keyName:'wqdag;jadfjglzfjgzfxq',label:'qwdasaa'},
            {keyName:'wqdag;jadfjglzfjgzfxdwq',label:'qwdasaa'},
            {keyName:'wqdag;jadfjglzfjgzfxas',label:'qwdasaa'},
            {keyName:'wqdag;jadfjglzfjgzfsx',label:'qwdasaa'},
        ])
        return{
            selectList,
            handleSelect,
            selectStyle,

            uid: internalInstance.uid,
            attrs,
            valInner,
            handleChange,
            handleInput,
            handleBlur,
            handleFocus,
            handleIconClickPrev,
            handleIconClickNext,
            handleClear
        }
    },
    data() {
        return {}
    },
    mounted() {
    },
    methods: {},
})
</script>

<style lang='scss'>


</style>