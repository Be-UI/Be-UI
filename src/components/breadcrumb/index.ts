/*
* @index.ts
* @deprecated 
* @author czh
* @update (czh 2021/11/22)
*/
import {App} from 'vue'
import beBreadcrumb from './src/be-breadcrumb'
import {IBreadcrumb} from "./src/be-breadcrumb-type";
import '../../assets/style/be-breadcrumb.scss'

const breadcrumbComp = beBreadcrumb as IBreadcrumb
/**
 * 组件装载方法
 * @param app
 */
breadcrumbComp.install = (app: App): void => {
    app.component(breadcrumbComp.name || '', breadcrumbComp)
}
const BeBreadcrumb: IBreadcrumb = breadcrumbComp
export default BeBreadcrumb;