import { App ,defineComponent} from 'vue'
import SvgIcon from './src/be-icon.vue'
import {SFCWithInstall} from "../../utils/types";
import BeEllipsis from "../ellipsis/src/be-ellipsis.vue";
// 获取创建svg上下文
const customCache = new Set();
SvgIcon.install = (app:App): void => {
    app.component(SvgIcon.name,SvgIcon)
}
const BeIcon: SFCWithInstall<typeof SvgIcon> = SvgIcon
/**
 * 自定义图标方法,该方法会直接根据参数name构造图名为 name-icon 的图标组件
 * @param name - 组件名称
 * @param template 组件渲染模板
 * @constructor
 */
interface template {
    template?:string
}
BeIcon.BeIconComponets = (name:string,option:template) => {
    /*let render = {
        template: `
              <div class='be-icon-container' :class="spinClass">
                <svg class="be-icon"
                     :width="width"
                     :height="height"
                     aria-hidden="true"
                     v-on="$listeners">
                  ${option.template}
                </svg>
              </div>
            `,
        props: SvgIcon.props,
        computed: SvgIcon.computed,
        name:`${name}Icon`
    }*/

   /* icons.install = (app: App): void => {
        app.component(icons.name, icons)
    }*/
    return  defineComponent({
        render:(h)=>{
            return `<span>123</span>`
        }
    })
}
/**
 * 远程调用iconfont方法
 * @param url - 路径地址
 */
BeIcon.createFromIconfontCN = (url:string):void => {
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
export default BeIcon
export const BeIconComponets = BeIcon.BeIconComponets;
export const createFromIconfontCN = BeIcon.createFromIconfontCN;
