import {App, defineComponent} from 'vue'
import SvgIcon from './src/be-icon.vue'
import {createCustom} from './src/be-custom-icon'
import {SFCWithInstall} from "../../utils/types";
import {SvgDom} from "../../utils/create-svg";


/**
 * 初始化图标，生成svgDom
 */
const initIcon = ():void =>{
    new SvgDom()
}
initIcon()

/**
 * 组件装载方法
 * @param app
 */
SvgIcon.install = (app: App): void => {
    app.component(SvgIcon.name, SvgIcon)
}
const BeIcon = SvgIcon as SFCWithInstall<typeof SvgIcon>

interface template {
    template?: string
}

/**
 * 自定义图标方法,该方法会直接根据参数name构造图名为 name-icon 的图标组件
 * @param name - 组件名称
 * @param option -组件渲染模板
 * @constructor
 */
BeIcon.BeIconComponets = (name: string, option: template): object | void => {
    const tempStr: string | undefined = option.template
    if (!tempStr) {
        console.error('The ‘template’ field in the parameter ‘option’ is required')
        return;
    }
    // 根据模板参数，创建组件对象
    const compInstance: object = defineComponent(createCustom(tempStr));
    (compInstance as any).install = (app: App): void => {
        app.component(name, compInstance)
    }
    return compInstance
}

/**
 * 远程调用iconfont方法
 * @param url - 路径地址
 */
const customCache = new Set();
BeIcon.createFromIconfontCN = (url: string): void => {
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
