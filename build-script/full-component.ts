/**
 * 安装依赖 pnpm install rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-typescript2 rollup-plugin-vue -D -w
 */

import commonjs from '@rollup/plugin-commonjs' // 将 CommonJS 模块转换为 ES6
import vue from '@vitejs/plugin-vue'
import typescript from 'rollup-plugin-typescript2'
 import resolve from '@rollup/plugin-node-resolve'
import { parallel,series } from 'gulp'
import  path from 'path'
import {outDir, beUIRoot} from './utils/paths'
import { rollup, OutputOptions } from 'rollup'
import  fs from 'fs/promises'
import { buildConfig } from './utils/config'
import { pathRewriter } from './utils'
import cleanup from "rollup-plugin-cleanup";
import {terser} from "rollup-plugin-terser";
import vueJsx from '@vitejs/plugin-vue-jsx'
const buildFull = async () => {
  // rollup 打包的配置信息
  const config = {
    external: (id) => /^vue/.test(id),
    input: path.resolve(beUIRoot, 'index.ts'), // 打包入口
    plugins: [
      vue(
        {
          isProduction: true,
        }
      ),
      vueJsx(),
      resolve(),
      typescript({ check:false}),
      commonjs(),
      // 压缩代码
      terser(),
      cleanup({ comments: 'none' }),
    ],
  }
  // 组件库两种使用方式 import 导入组件库 在浏览器中使用script

  // esm umd

  const buildConfig = [
    {
      format: 'umd', // 打包的格式
      file: path.resolve(outDir, 'index.js'),
      name: 'be-ui', // 全局变量名字
      exports: 'named', // 导出的名字 用命名的方式导出 libaryTarget:"" name:""
      globals: {
        // 表示使用的vue是全局的
        vue: 'Vue',
      },

    },
    {
      format: 'esm', // 打包的格式
      file: path.resolve(outDir, 'index.esm.js'),
      name: 'be-ui', // 全局变量名字
      exports: 'named', // 导出的名字 用命名的方式导出 libaryTarget:"" name:""
      globals: {
        // 表示使用的vue是全局的
        vue: 'Vue',
      },
    },
  ]
  const bundle = await rollup(config)
  return Promise.all(
    buildConfig.map(option => {
      bundle.write(option as OutputOptions)
    })
  )
}

async function buildEntry() {
  // 读取be-ui目录下的所有内容，包括目录和文件
  const entryFiles = await fs.readdir(beUIRoot, { withFileTypes: true })

  // 过滤掉 不是文件的内容和package.json文件  index.ts 作为打包入口
  const entryPoints = entryFiles
    .filter(f => f.isFile())
    .filter(f => !['package.json'].includes(f.name))
    .filter(f => !['.test.js'].includes(f.name))
    .map(f => path.resolve(beUIRoot, f.name))
  console.log(entryPoints)
  const config = {
    input: entryPoints,
    plugins: [
      vue(
        {
          isProduction: true,
        }
      ),
      vueJsx(),
      resolve(),
      typescript({ check:false}),
      commonjs(),
      // 压缩代码
     terser(),
      cleanup({ comments: 'none' }),
    ],
    external: (id: string) => /^vue/.test(id) || /^@be-ui/.test(id) || /^.test.js/.test(id)|| /^.md/.test(id),
  }
  const bundle = await rollup(config)
  return Promise.all(
    Object.values(buildConfig)
      .map(config => ({
        format: config.format,
        dir: config.output.path,
        paths: pathRewriter(config.output.name),
      }))
      .map(option => bundle.write(option as OutputOptions))
  )
}

// gulp适合流程控制和代码的转义  没有打包的功能
export default series(parallel(buildFull,buildEntry));
