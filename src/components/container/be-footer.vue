/*
* @be-footer.vue
* @deprecated 通用底部页脚布局组件
* @author czh
* @update (czh 2021/5/18)
*/
<template>
    <footer class="be-footer" :class = 'contextmenuCls' :style="{ height }">
        <slot></slot>
    </footer>
</template>

<script>
    export default {
        name: "BeFooter",
        data() {
            return {
                isScroll: true,
            }
        },
        props: {
            'isFixed':{
                type:Boolean,
                default:false
            },
            /**
             * 自定义主题
             */
            'theme': {
                type: String,
                default: 'violet'
            },
            /**
             * 高度
             */
            'height': {
                type: String,
                default: '60px'
            },
            /**
             * 自定义样式类
             */
            'customClass': {
                type: String,
                default: ''
            },
        },
        computed: {
            //主题内容class 设置
            contextmenuCls() {
                return [
                    this.customClass,
                    this.isFixed ? 'be-footer--fiexd' : '',
                    `be-footer--${this.theme}`,
                ]
            },
        },
        methods: {
            init() {
                this.$nextTick(() => {
                    this.isScroll = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .be-footer {
        width: 100%;
        font-size: 12px;
        margin:  auto;
        @include flex(center, center);
        z-index: 999;
        // min-width: 1280px;
        box-shadow: 0 0 8px rgba(0, 0, 0, .16);
        .text{
            text-align: center;
            @include text(12px, inherit, 22px, 400);
        }
    }
    .be-footer--fiexd {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .be-footer--violet {
        background-color: $mainColor2;
        color: $textColor6;
    }
    .be-footer--white {
        background-color: $mainColor7;
        color: $textColor5;
        box-shadow:0px -2px 6px rgba(0,0,0,0.16);
    }
</style>
