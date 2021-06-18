import Vue from 'vue'
import SvgIcon from './src/be-icon.vue'
// 获取创建svg上下文
const req = require.context('../../assets/icon', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
// 构造beIcon组件
const BeIcon = {
    install:function(Vue) {
        Vue.component('be-icon', SvgIcon)
    },
    service:SvgIcon,
    /**
     * 自定义图标方法,该方法会直接根据参数name构造图名为 name-icon 的图标组件
     * @param name - 组件名称
     * @param template 组件渲染模板
     * @constructor
     */
    BeIconComponets:(name,template) => {
    let render  = {
        template:`<div :class="spinClass">
                    <svg :class="svgClass"
                         :width="width"
                         :height="height"
                         aria-hidden="true"
                         v-on="$listeners">
                        ${template.template}
                    </svg>
                 </div>`,
        props:SvgIcon.props,
        computed:SvgIcon.computed,
    }
    Vue.component(`${name}-icon`, render)
}
}
export default BeIcon;