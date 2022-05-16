/*
 * @index.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/11/22)
 */
import { App } from 'vue'
import beBreadcrumb from './src/be-breadcrumb'
import beBreadcrumbItem from './src/be-breadcrumb-item'
import { IBreadcrumb } from './src/be-breadcrumb-type'
import '../../style/src/be-breadcrumb.scss'

const breadcrumbComp = beBreadcrumb as IBreadcrumb
/**
 * 组件装载方法
 * @param app
 */
breadcrumbComp.install = (app: App): void => {
  app.component(breadcrumbComp.name || '', breadcrumbComp)
}

const breadcrumbItemComp = beBreadcrumbItem as IBreadcrumb
export const BeBreadcrumb: IBreadcrumb = breadcrumbComp
/**
 * 组件装载方法
 * @param app
 */
breadcrumbItemComp.install = (app: App): void => {
  app.component(breadcrumbItemComp.name || '', breadcrumbItemComp)
}
export const BeBreadcrumbItem: IBreadcrumb = breadcrumbItemComp
