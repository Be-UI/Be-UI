/*
* be-input-select.vue
* @deprecated 远程搜索的下拉框
* @author czh
* @create (czh 2021/5/31)
* @update (czh 2021/6/2)
*/
<template>
    <transition name="be-zoom-in-top">
        <div class="be-input-select" v-if="isShow" :style="selectStyle"  :id="`be_input_select${this._uid}`">
            <ul v-show="!loading" :style="selectStyle"
                :id="`be_input_select_ul${this._uid}`" :key="`be_input_select_ul${this._uid}`">
                <!-- <li class="be-input-select__line" v-show="selectList.data.length > 0"></li>-->
                <li class="be-input-select__inner"
                    v-for="(item, index) in selectList.data"
                    :key="item[selectList.keyName]"
                    @click="handleSelect(item,index)">
                    {{item[selectList.label]}}
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
                bodyElement.removeChild(selectElement);
            })
        },
        mounted() {
            this.appendEleToBody()
        },
    }
</script>

<style lang='scss'>
    .be-input-select {
        &::-webkit-scrollbar {
            margin: 5px;
            width: 8px;
            height: 8px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #c1c1c1;
            border-radius: 5px;
        }

        background-color: white;
        border-radius: 0 0 3px 3px;
        border: 1px solid $mainColor3;
        border-top: 0;
        position: absolute;
        max-height: 300px;
        overflow-y: auto;
        overflow-x: hidden;
        margin: 0;
        z-index: 2077;
        ul {
            padding: 0;
        }

        .be-input-select__line {
            height: 1px;
            background-color: #dcdfe6;
            width: 90%;
            margin: 0 auto;
            list-style: none;
        }

        .be-input-select__inner {
            height: 30px;
            line-height: 30px;
            list-style: none;
            margin: 10px 0;
            padding-left: 10px;
            box-sizing: border-box;
            cursor: pointer;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 14px;
            &:hover {
                background-color: #dcdfe6;
            }
        }
    }

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