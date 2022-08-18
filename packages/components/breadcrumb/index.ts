/*
 * @index.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/11/22)
 */
import beBreadcrumb from './src/be-breadcrumb'
import beBreadcrumbItem from './src/be-breadcrumb-item'
import { withInstall } from "@be-ui/utils/with-install"

export const BeBreadcrumb = withInstall(beBreadcrumb)

export const BeBreadcrumbItem = withInstall(beBreadcrumbItem)

