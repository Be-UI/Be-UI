import path from "path"
// 项目根目录
export const projectRoot = path.resolve(__dirname,'../../')

// 打包输出目录
export const outDir = path.resolve(__dirname,'../../dist')

// be-ui 入口 index.ts
export const beUIRoot = path.resolve(__dirname,'../../packages/be-ui')

// 组件目录
export const compRoot = path.resolve(projectRoot,'packages/components')

// utils目录
export const utilsRoot = path.resolve(__dirname,'../../packages/utils')

// style目录
export const styleRoot = path.resolve(__dirname,'../../packages/style')
