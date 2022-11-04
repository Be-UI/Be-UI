import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const config = [
  {
    external: ['@popperjs/core', id => /.test.js/.test(id), 'vue'],
    input: '../packages/components/select/index.ts', // 必须，入口文件
    output: [
      {
        file: '../dist/index.js',
        format: 'es',
        name: 'be-ui',
        globals: {
          vue: 'vue', // 告诉rollup全局变量Vue即是vue
        },
      },
      {
        file: '../dist/index.cjs.js',
        format: 'cjs',
        name: 'be-ui',
        globals: {
          vue: 'vue', // 告诉rollup全局变量Vue即是vue
        },
      },
    ],
    plugins: [
      // 引入的插件在这里配置
      typescript({
        tsconfig: '../tsconfig.json',
      }),
      vue(),
      vueJsx(),
      resolve(),
      commonjs(),
    ],
  },
]

export default config
