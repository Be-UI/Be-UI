/*
 * @rollup.config.js
 * @deprecated
 * @author czh
 * @update (czh 2022/4/29)
 */
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import vueJsx from '@vitejs/plugin-vue-jsx'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'
import scss from 'rollup-plugin-scss'
// import dts from 'rollup-plugin-dts'
const config = [
  {
    external: ['@popperjs/core', id => /.test.js/.test(id), 'vue'],
    input: './packages/components/index.ts', // 必须，入口文件
    output: [
      {
        file: './dist/lib/be-ui-umd.js',
        format: 'umd',
        name: 'be-ui',
        globals: {
          vue: 'vue', // 告诉rollup全局变量Vue即是vue
        },
      },
      {
        file: './dist/lib/be-ui.es.js',
        format: 'es',
        name: 'be-ui',
        globals: {
          vue: 'vue', // 告诉rollup全局变量Vue即是vue
        },
      },
      {
        file: './dist/lib/be-ui-cjs.js',
        format: 'cjs',
        name: 'be-ui',
        globals: {
          vue: 'vue', // 告诉rollup全局变量Vue即是vue
        },
      },
    ],
    plugins: [
      // 引入的插件在这里配置
      vue({
        css: true,
        isProduction: true,
        compileTemplate: true,
      }),
      vueJsx(),
      resolve(),
      typescript(),
      scss({
        output: './dist/css/style.css',
        outputStyle: 'compressed',
        failOnError: true,
        sourceMap: true,
      }),
      babel({
        exclude: '**/node_modules/**',
      }),
      commonjs(),
      terser(),
      cleanup({ comments: 'none' }),
    ],
  },

  /*{

       // input: "./packages/utils/type/index.d.ts", // 必须，入口文件
        input: "./packages/components/index.d.ts",
        output: [
            {
                file: './dist/type/index.d.ts',
                format: 'esm',
                name: 'be-ui',
                globals: {
                    vue: "vue",// 告诉rollup全局变量Vue即是vue
                },

            },
        ],
        plugins: [ // 引入的插件在这里配置
            dts()
        ]
    },*/
]

export default config
