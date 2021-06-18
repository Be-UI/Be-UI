/*
* @be-loading.vue
* @deprecated 公共的loading组件
* @author czh
* @update (czh 2021/6/11)
*/
<template>
    <div style="position: relative;height: 100%">
        <slot></slot>
        <transition name="be-fade-in-linear">
            <div class="be-load-container"
                 :id="`be_load_${this._uid}`"
                 :class="`${customClass} ${isFullScreenStyle}`"
                 :style="`
                 background-color: ${bgColor};
                 left: ${leftLoader};
                 top: ${topLoader};
                 width:${loadWidth};
                 height:${laodHeight}`"
                 v-if="isShowLoader">
                <!--loading动画-->
                <BeLoadingAnimate></BeLoadingAnimate>
                <span class="be-loader-text"
                      v-if="text"
                      :style="`color:${colorText};left:${leftTxt};top:${topTxt}`"
                      :class="`be-loader-text__${sizeLoader}`">{{ text }}</span>
            </div>
        </transition>
    </div>

</template>

<script>
/**
 * 公共的loading组件
 */
import BeLoadingAnimate from './be-loading-elm'
export default {
    name: "BeLoading",
    data() {
        return {
            // loading动画left
            left: '',
            // loading动画top
            top: '',
            // loading文字left
            leftTxt: '',
            // loading文字left
            topTxt: '',
            // loading动画遮罩容器left
            leftLoader: '',
            // loading动画遮罩容器left
            topLoader: '',
            // loading动画遮罩容器width
            loadWidth: '',
            // loading动画遮罩容器height
            laodHeight: '',
            // loading延时渲染定时器
            timer: null,
            // loading尺寸
            sizeLoader:'default',
            // loading显示控制
            isShowLoader: false,
        }
    },
    components:{BeLoadingAnimate},
    provide() {
        return {
            $$BeLoading: this,
        }
    },
    props: {
        /**
         * 延时loading
         */
        delay: {
            type: Number,
            default: 0,
        },
        /**
         * loading开启
         */
        show: {
            type: Boolean,
            default: false,
        },
        /**
         * 颜色
         */
        color: {
            type: String,
            default: '#4F60A7FF',
        },
        /**
         * 文字颜色
         */
        colorText: {
            type: String,
            default: 'black',
        },
        /**
         * 自定义主题样式类
         */
        customClass: {
            type: String,
            default: '',
        },
        /**
         * 尺寸
         */
        size: {
            type: String,
            default: 'default',
        },
        /**
         * 自定义文本
         */
        text: {
            type: String,
            default: 'white',
        },
        /**
         * 是否扩展至body下全屏 serX
         */
        isFullScreen: {
            type: Boolean,
            default: false
        },
        /**
         * 是否开启小圆角背景
         */
        isBackground: {
            type: Boolean,
            default: true,
        },
        /**
         * 背景颜色
         */
        bgColor: {
            type: String,
            default: 'rgba(255,255,255,.5)',
        },
        /**
         * 自定义渲染内容
         */
        customRender: {
            type: Function,
            default: () => null,
        }
    },
    computed: {
        // 设置背景颜色
        isBackgroundStyle() {
            return this.isBackground ? 'be-loader__bg' : ''
        },
        // 设置全屏样式
        isFullScreenStyle() {
            return this.isFullScreen ? 'be-load-container__fullScreen' : ''
        },
        showLoader() {
            return this.show
        },
        loaderSize() {
            return this.size
        }
    },
    watch: {
        // 设置延时渲染
        showLoader: {
            handler: function (nVal) {
                if (nVal) {
                    this.timer = setTimeout(() => {
                        this.$nextTick(() => {
                            this.isShowLoader = nVal
                            this.initComp()
                        })
                    }, this.delay)
                } else {
                    clearTimeout(this.timer)
                    this.timer = null
                    this.isShowLoader = false
                }
            },
            deep: true,
            immediate: true
        },
        // 设置尺寸
        loaderSize(nVal){
            this.sizeLoader = nVal
        }

    },
    beforeDestroy() {
        window.onresize = null
    },
    methods: {
        /**
         * 将组件渲染到body下
         */
        appendEleToBody() {
            this.$nextTick(() => {
                const bodyElement = document.querySelector('body')
                const loading = document.getElementById(`be_load_${this._uid}`)
                if (bodyElement.append) {
                    bodyElement.append(loading)
                } else {
                    bodyElement.appendChild(loading)
                }
            })
        },
        /**
         * 计算loading位置居中
         * @param {Element} slotElem - 插槽元素对象
         */
        computePosition(slotElem) {
            this.$nextTick(() => {
                let slotElemstyle = this.getAbsolutePosition(slotElem)
                // 根据插槽元素数据，计算loading动画位置
                // this.left = (slotElemstyle.width / 2) + slotElemstyle.left + 'px'
                // this.top = (slotElemstyle.height / 2) + slotElemstyle.top + 'px'
                this.left = (slotElemstyle.width / 2)  + 'px'
                this.top = (slotElemstyle.height / 2) + 'px'
                // 根据插槽元素数据，计算loading遮罩位置、宽高
                this.loadWidth = slotElemstyle.width + 'px'
                this.laodHeight = slotElemstyle.height + 'px'
                // this.leftLoader = slotElemstyle.left + 'px'
                // this.topLoader = slotElemstyle.top + 'px'
                if (this.text) {
                    // 根据插槽元素数据，计算文字位置
                    this.$nextTick(() => {
                        let loaderElem = document.querySelector('.be-loader')
                        if(!loaderElem) return
                        let loaderElemHeight = Number(window.getComputedStyle(loaderElem).height.split('px')[0])
                        this.leftTxt = this.left
                        this.topTxt = Number(this.top.split('px')[0]) + (loaderElemHeight / 2) + 20 + 'px'
                    })
                }
            })
        },
        /**
         * 获取插槽元素相对浏览器的大小、位置
         * @param {Element} slotElem - 插槽元素对象
         * @return {Object} 位置、大小信息
         */
        getAbsolutePosition(slotElem) {
            //如果函数没有传入值的话返回对象为空的
            if (!slotElem) return null;
            let w = slotElem.offsetWidth, h = slotElem.offsetHeight;
            //从目标元素开始向外遍历，累加top和left值
            let t, l;
            for (t = slotElem.offsetTop, l = slotElem.offsetLeft; slotElem = slotElem.offsetParent;) {
                t += slotElem.offsetTop;
                l += slotElem.offsetLeft;
            }
            let r = document.body.offsetWidth - w - l;
            let b = document.body.offsetHeight - h - t;
            return {width: w, height: h, top: t, left: l, right: r, bottom: b};
        },
        /**
         * 初始化组件
         */
        initComp() {
            if (this.isFullScreen) {
                this.appendEleToBody()
                this.computePosition(document.querySelector('body'))
                window.onresize = () => {
                    this.computePosition(document.querySelector('body'))
                }
                return
            }
            this.computePosition(this.$slots.default[0].elm)
            window.onresize = () => {
                this.computePosition(this.$slots.default[0].elm)
            }
        }
    },

}
</script>

<style scoped lang="scss">
@import "loading";
</style>