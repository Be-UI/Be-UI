/*
 * @index.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/10/27)
 */


import beSelect from './src/be-select'
import beSelectMultiple from './src/be-select-multiple'

import { withInstall } from "@be-ui/utils/with-install"

export const BeSelect = withInstall(beSelect)

export const BeSelectMultiple = withInstall(beSelectMultiple)
