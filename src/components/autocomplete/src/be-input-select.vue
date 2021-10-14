/*
* be-input-select.vue
* @deprecated 远程搜索的下拉框
* @author czh
* @create (czh 2021/5/31)
* @update (czh 2021/6/2)
*/
<template>
    <transition name="be-zoom-in-top">
        <div class="be-input-select" :style="selectStyle"  :id="`be_input_select${this._uid}`">
            <ul v-show="!loading" :style="selectStyle"
                :id="`be_input_select_ul${this._uid}`" :key="`be_input_select_ul${this._uid}`">
                <!-- <li class="be-input-select__line" v-show="selectList.data.length > 0"></li>-->
                <li class="be-input-select__inner"
                    v-for="(item, index) in selectList"
                    :key="item.keyName"
                    @click="handleSelect(item,index)">
                    {{item.label}}
                </li>
            </ul>
            <ul v-show="loading" :key="`be-input-select${this._uid}-loading`">
                <li class="be-input-select__line"></li>
                <li class="be-input-select__inner" style="text-align: center">
                    载入中...
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "BeInputSelect",
        props: {
            /**
             * 数据列表
             */
            selectList: {
                type: Object,
                default: () => {
                }
            },
            /**
             * 输入建议样式
             */
            selectStyle: {
                type: Object,
                default: () => {
                    return {left: '0px', top: '0px'}
                }
            },
            /**
             * 是否显示
             */
            isShow: {
                type: Boolean,
                default: false
            },
            /**
             * 是否显示 loading
             */
            loading: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            /**
             * 下拉搜索选择事件方法
             * @param {String | Number} value - 更新后值
             * @param {Number} index - 点击索引
             */
            handleSelect(value, index) {
                this.$emit('select', value, index)
            },
            /**
             * 将组件渲染到body下
             */
            appendEleToBody(){
                this.$nextTick(() => {
                    const bodyElement = document.querySelector('body')
                    if (bodyElement.append) {
                        bodyElement.append(this.$el)
                    } else {
                        bodyElement.appendChild(this.$el)
                    }
                })
            }
        },
        beforeDestroy() {
            // 组件销毁前手动删除对应下拉框，由于v-clickoutside是异步的，某些v-if场景下 无法清除dom
            this.$nextTick(() => {
                const bodyElement = document.querySelector('body')
                const selectElement = document.getElementById(`be-input-select${this._uid}`)
                if(selectElement){
                    bodyElement.removeChild(selectElement);
                }
            })
        },
        mounted() {
           // this.appendEleToBody()
        },
    }
</script>

<style lang='scss'>
@import '../../../assets/style/be-input';
</style>