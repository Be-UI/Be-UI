/*
* @be-autocomplete.vue
* @deprecated
* @author czh
* @update (czh 2021/10/13)
*/
<template>
<be-popover trigger="manual" placement="bottom">
    <template #trigger>
        <be-input
            v-bind="attrs"
            @change="handleChange"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @clear="handleClear"
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
        <div>qwdqwd</div>
    </transition>
</be-popover>
</template>

<script lang="ts">

import {defineComponent, ref, useAttrs} from "vue";
import BePopover from "../../popover/src/be-popover.vue";
import BeInput from "../../input/src/be-input.vue";
export default defineComponent({
    name: "BeAutocomplete",
    components: {BeInput, BePopover},
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
        /**
         * focus 事件处理方法
         * @param {String | Number} value - 更新后值
         * @param {Event} event - 事件对象
         */
        const handleFocus = (value: string | number, event: Event): void => {
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
        return{
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