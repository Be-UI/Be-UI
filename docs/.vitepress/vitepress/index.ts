/*
 * @index.ts
 * @deprecated
 * @author czh
 * @update (czh 2022/4/15)
 */

import index from './components/index.vue'
import VPMain from './components/vp-main.vue'
import VPHeader from './components/vp-header.vue'
import VPHome from './components/vp-home.vue'
import type { Component } from 'vue'
export default index
// 全局组件
export const globals: [string, Component][
  ] = [
  ['vp-main', VPMain],
  ['vp-header', VPHeader],
  ['vp-home', VPHome]
]
