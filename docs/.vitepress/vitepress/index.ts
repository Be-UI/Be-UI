/*
 * @index.ts
 * @deprecated
 * @author czh
 * @update (czh 2022/4/15)
 */

import index from './components/index.vue'
import VPHeader from './components/vp-header.vue'
import VPDemo from './components/vp-demo.vue'
import VPHome from './components/vp-home.vue'
import type { Component } from 'vue'
export default index
// 全局组件
export const globals: [string, Component][] = [
  ['Demo', VPDemo],
  ['vp-header', VPHeader],
  ['vp-home', VPHome],
]
