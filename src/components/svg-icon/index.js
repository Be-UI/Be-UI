import Vue from 'vue'
import SvgIcon from './src/be-icon.vue'
// 获取创建svg上下文
const req = require.context('../../assets/icon', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
const customCache = new Set();
// 构造beIcon组件
const BeIcon = {
    install: function (Vue) {
        Vue.component('be-icon', SvgIcon)
    },
    service: SvgIcon,
    /**
     * 自定义图标方法,该方法会直接根据参数name构造图名为 name-icon 的图标组件
     * @param name - 组件名称
     * @param template 组件渲染模板
     * @constructor
     */
    BeIconComponets: (name, template) => {
        let render = {
            template: `
              <div class='be-icon-container' :class="spinClass">
              <svg class="be-icon"
                   :width="width"
                   :height="height"
                   aria-hidden="true"
                   v-on="$listeners">
                ${template.template}
              </svg>
              </div>
            `,
            props: SvgIcon.props,
            computed: SvgIcon.computed,
        }
       return Vue.component(`${name}-icon`, render)
    },
    createFromIconfontCN:(url,name) => {
        if (
            typeof document !== 'undefined' &&
            typeof window !== 'undefined' &&
            typeof document.createElement === 'function' &&
            typeof url === 'string' &&
            url.length &&
            !customCache.has(url)
        ) {
            const script = document.createElement('script');
            script.setAttribute('src', url);
            script.setAttribute('data-namespace', url);
            customCache.add(url);
            document.body.appendChild(script);
        }
    }
}
export default BeIcon;
export const BeIconComponets = BeIcon.BeIconComponets;
export const createFromIconfontCN = BeIcon.createFromIconfontCN;