import { series ,parallel} from 'gulp'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'
import { build } from "./utils/utils";

const config = {
  input: '../packages/utils/index.ts', // 必须，入口文件
  external: ['vue'],
  plugins: [
    // 引入的插件在这里配置
    resolve(),
    typescript(),
    babel({
      presets: ['@babel/preset-env'],
      exclude: '**/node_modules/**',
      babelHelpers: 'runtime',
    }),
    commonjs(),
    cleanup({ comments: 'none' }),
    terser(),
  ],
}

const buildConfig = [
  {
    file: '../dist/utils/index.js',
    format: 'es',
    inlineDynamicImports: true,
    name: 'index',
  },
  {
    file: '../dist/utils/index.cjs',
    format: 'cjs',
    inlineDynamicImports: true,
    name: 'index',
  },
]

const typeConfig = {
  input: '../packages/utils/index.ts', // 必须，入口文件
  plugins: [
    resolve(),
    typescript(),
    dts(),
  ],
}
const buildTypeConfig = [
  {
    file: '../dist/utils/index.d.ts',
    format: 'es',
  },
]
// 打包处理
const buildPackages = () => {
  return parallel(() => build(config, buildConfig), () => build(typeConfig, buildTypeConfig) )
}
let taskList = [buildPackages()]
export default series(...taskList)