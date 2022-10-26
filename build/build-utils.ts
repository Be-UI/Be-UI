import { parallel, series } from 'gulp'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'
import { build } from './utils/utils'
import { buildConfig } from './utils/base-config'
import {outUtilsDirCjs, outUtilsDirEsm, tsConfigRoot, utilsRoot} from "./utils/path-dict";
const config = {
  input: `${utilsRoot}/index.ts`,
  external: ['vue'],
  plugins: [
    // 引入的插件在这里配置
    resolve(),
    typescript({tsconfig: tsConfigRoot}),
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

const typeConfig = {
  input: `${utilsRoot}/index.ts`,
  plugins: [
    resolve(),
    typescript({tsconfig: tsConfigRoot}),
    dts(),
    cleanup({ comments: 'none' }),
  ],
}
const buildTypeConfig = [
  {
    file: `${outUtilsDirEsm}/index.d.ts`,
    format: 'es',
  },
  {
    file: `${outUtilsDirCjs}/index.d.ts`,
    format: 'es',
  },
]
// 打包处理
const buildPackages = () => {
  return parallel(
    () => build(config, buildConfig),
    () => build(typeConfig, buildTypeConfig),
  )
}
const taskList = [buildPackages()]
export default series(...taskList)
