import path from 'path'
import { outDir } from './paths'
export const buildConfig = {
  esm: {
    module: 'ESNext', // tsconfig输出的结果es6模块
    format: 'esm', // 需要配置格式化化后的模块规范
    output: {
      name: 'es', // 打包到dist目录下的那个目录
      path: path.resolve(outDir, 'es'),
    },
    bundle: {
      path: 'be-ui/es',
    },
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    output: {
      name: 'lib',
      path: path.resolve(outDir, 'lib'),
    },
    bundle: {
      path: 'be-ui/lib',
    },
  },
}
export type BuildConfig = typeof buildConfig
