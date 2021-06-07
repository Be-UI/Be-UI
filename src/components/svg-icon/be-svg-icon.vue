/*
* @be-svg-icon.vue
* @deprecated Svg图表组件
* @author czh
* @update (czh 2021/4/21)
*/
<template>
    <!--用v-if 而不用el-tooltip本身的禁用熟悉，是因为某些边界情况下会导致渲染错误-->
    <el-tooltip
        :content="content"
        v-if="!disabledToolTip"
        :placement="placement">
        <div
            v-if="isExternal"
            :style="styleExternalIcon"
            class="svg-external-icon svg-icon"
            v-on="$listeners"></div>
        <svg :class="svgClass" aria-hidden="true" v-else v-on="$listeners">
            <use :xlink:href="iconName"/>
        </svg>
    </el-tooltip>
    <div
        v-else-if="isExternal && disabledToolTip"
        :style="styleExternalIcon"
        class="svg-external-icon svg-icon"
        v-on="$listeners">
    </div>
    <svg :class="svgClass" aria-hidden="true" v-else-if="!isExternal && disabledToolTip" v-on="$listeners">
        <use :xlink:href="iconName"/>
    </svg>
</template>

<script>
/**
 * Svg图表组件
 */
export default {
    name: "BeSvgIcon",
    props: {
        /**
         * 指定的图标名
         */
        iconClass: {
            type: String,
            required: true
        },
        /**
         * 自定义样式类名
         */
        className: {
            type: String,
            default: ""
        },
        /**
         * 指定图标的tooltip的文字内容
         */
        content: {
            type: String,
            default: ""
        },
        /**
         * 指定图标的tooltip的主题
         */
        effect: {
            type: String,
            default: ""
        },
        /**
         * 指定图标的tooltip的的开启
         */
        disabledToolTip: {
            type: Boolean,
            default: false
        },
        placement: {
            type: String,
            default: "top"
        }
    },
    computed: {
        isExternal() {
            return this.isExternal_(this.iconClass);
        },
        iconName() {
            return `#icon${this.iconClass}`;
        },
        svgClass() {
            if (this.className) {
                return "svg-icon " + this.className;
            } else {
                return "svg-icon";
            }
        },
        styleExternalIcon() {
            return {
                mask: `url(${this.iconClass}) no-repeat 50% 50%`,
                "-webkit-mask": `url(${this.iconClass}) no-repeat 50% 50%`
            };
        }
    },
    methods: {
        isExternal_(path) {
            return /^(https?:|mailto:|tel:)/.test(path)
        }
    }
};
</script>

<style scoped>
.svg-icon {
    width: 1.2em;
    height: 1.2em;
    vertical-align: -0.3em;
    fill: currentColor;
    overflow: hidden;
    font-size: 1.2em;
}

.svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
}
</style>
<docs>
## 事例
```jsx
<svg-icon iconClass='Addresstracking_search' class="custom-class"></svg-icon>
```
</docs>