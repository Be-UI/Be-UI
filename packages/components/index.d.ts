import type { App } from 'vue'
// 按需引用
// export * from './install-components'
// import * as components from './install-components'
// const componentList: object = components
// export type componentKeyType = keyof typeof componentList

export type install = <T>() => T
type BeUI = { version: string; install: install }
export default BeUI
