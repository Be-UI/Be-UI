import path from "path"
// 项目根目录
export const projectRoot = path.resolve(__dirname,'../../')

// 打包输出目录
export const outDir = path.resolve(__dirname,'../../dist')

export const outUtilsDirEsm =`${outDir}/es/utils`

export const outUtilsDirCjs = `${outDir}/lib/utils`

export const outStyleDir = `${outDir}/style`

export const outCompDir = `${outDir}/components`

// be-ui 入口 index.ts
export const beUIRoot = path.resolve(__dirname,'../../packages/be-ui')

// 组件目录
export const compRoot = path.resolve(__dirname,'../../packages/components')

// utils目录
export const utilsRoot = path.resolve(__dirname,'../../packages/utils')

// style目录
export const styleRoot = path.resolve(__dirname,'../../packages/style')

// tsconfig 目录
export const tsConfigRoot = path.resolve(__dirname,'../../tsconfig.json')